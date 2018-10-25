import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as signalR from '@aspnet/signalr';
@Component({
  selector: 'app-two-players',
  templateUrl: './two-players.component.html',
  styleUrls: ['./two-players.component.css']
})
export class TwoPlayersComponent implements OnInit {

  counter:number = 10;
  res: any = [ ];
  questions = [ ];
  players = [];
  playRes: any[];
  i:number=0;
  name: string;
  score:number=0;
  questionCounter = 0;
  shouldDisplayQuestions = false;
  currentQuestion : any;
  start:boolean=false;
  gameOver = false;
  username = new Date().getTime();
  connection1:any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    const divMessages1: HTMLDivElement = document.querySelector('#divMessages1');
    const divMessages2: HTMLDivElement = document.querySelector('#divMessages2');


    const connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/chathub')
      .build();
      connection.start().then(() => console.log('connection established')).catch((err) => console.log("Error::: ", err));
      this.connection1=connection;
      // connection.on('send',(username:string, score: number)=>{
      //   let m1 = document.createElement('div');

      //   m1.innerHTML =
      //     `<div class='message__author'>${username}</div><div>${score}</div>`;

      //   divMessages1.appendChild(m1);
      // divMessages1.scrollTop = divMessages1.scrollHeight;
    // });

    connection.on('receive', (username:string, score:number) => {
      // let m2 = document.createElement('div');

      // m2.innerHTML =
      //   `<div class='message__author'>${username}</div><div>${score}</div>`;

      // divMessages2.appendChild(m2);
      // divMessages2.scrollTop = divMessages2.scrollHeight;
     score=this.score;
      // if(this.username.toString()=== username1)
          console.log(username, score, "this is the message form the server")

    });

    connection.on('receive', (username1:string, score1:number) => {
      // let m2 = document.createElement('div');

      // m2.innerHTML =
      //   `<div class='message__author'>${username}</div><div>${score}</div>`;

      // divMessages2.appendChild(m2);
      // divMessages2.scrollTop = divMessages2.scrollHeight;
     score1=this.score;
      // if(this.username.toString()=== username1)
          console.log(username1, score1, "this is the message form the server")

    });

  }

  showQuestions()
  {
    this.start=true;
    console.log('called showQuestions');
    this.http.get('http://localhost:3000/questions').subscribe((res: any) => {
    this.questions = res;
    this.currentQuestion = this.questions[this.questionCounter];
    this.shouldDisplayQuestions = true;
    this.gameClock();
    console.log(this.questions[0].options);

    });
  }

  gameClock() {
    const intervalMain = setInterval(() => {
    this.counter--;
    if (this.counter <= 0) {
      this.nextQuestion();
      //this.resetTimer();
      if(this.questionCounter>=7)
      {
        clearInterval(intervalMain);
        this.gameOver=true;
      }
    }
  }, 1000);
}

nextQuestion(){
  this.resetTimer();
  this.connection1.send("sendScore", this.username, this.score);
  this.questionCounter++;
  this.currentQuestion = this.questions[this.questionCounter];
}

resetTimer(){
  this.i++;
  //this.quesCount++;
  this.score+=this.counter*2;

        // .then(() => tbMessage1.value = "");
  this.counter=10;
}

}
