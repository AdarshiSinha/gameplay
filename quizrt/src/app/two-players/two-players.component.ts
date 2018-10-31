import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as signalR from '@aspnet/signalr';
import { ControlContainer } from '@angular/forms';
import { throwToolbarMixedModesError } from '@angular/material';
import { delay } from 'q';
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
  letsplay : number = 0 ;
  arr : any = [] ;
  score:number=0;
  questionCounter = 0;
  shouldDisplayQuestions = false;
  currentQuestion : any;
  start:boolean=false;
  gameOver = false;
  username = new Date().getTime();
  connection1:any;
  client_found: boolean=false;
  currentUser: any;
  forignuser: any;
  currentUserScore: any;
  forignUserScore: any;
  op: any;
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

    connection.on('users',(username1:number)=>{
      // console.log(username1 +" connected");
      this.arr.push(username1);
      if(this.username!=username1)
      {
        this.client_found=true;
        if(this.arr.length>0) alert('Player 2 wants to play');
        // this.showQuestions();
      }
    })
    connection.on('receive', (username:string, score:number) => {
      
      this.forignUserScore = score;
     this.forignuser = username;

      // if(this.username.toString()=== username1)
          console.log(username, score, "this is the message form the server")

    });

    connection.on('counter',(counter1:number)=> {
      this.counter=counter1;
      if (this.counter <= 1) {
        if (this.arr.length>1 && this.letsplay === 0)
       { this.nextQuestion();
        if(this.questionCounter>=7)
        {
          // console.log("Game Over");
          this.gameOver=true;
        }
      }
      }
    });

    connection.on('questions',(question:string)=>{
    this.currentQuestion=JSON.parse(question);
    // this.op=JSON.parse(this.currentQuestion.options);
    // console.log(this.currentQuestion.problemStatement +" after it came from server");
    // console.log(this.currentQuestion.options.content+" after it came from the server");
    }
    );




  }
  sleep(){
    if(this.client_found == true ) {
      this.letsplay++ ;
      alert('sending request to player1')
    }
    delay(10000);
    this.connection1.send("OnConnectedAsync",this.username);

  }

  showQuestions()
  {

    this.start=true;
    // console.log('called showQuestions');
    this.http.get('http://localhost:3000/questions').subscribe((res: any) => {
    this.questions = res;
    this.currentQuestion = this.questions[this.questionCounter];
    var cq=JSON.stringify(this.currentQuestion);
    // console.log(JSON.stringify(this.currentQuestion));
    // if(this.arr.length>1 && this.letsplay===0)
    this.connection1.send("sendQuestions",cq);
    this.shouldDisplayQuestions = true;
    this.gameClock();
    // console.log(this.questions[0].options);

    });
  }

  gameClock() {
  //   const intervalMain = setInterval(() => {
  //   this.counter--;
  //   if (this.counter <= 0) {
  //     this.nextQuestion();
  //     //this.resetTimer();
  //     if(this.questionCounter>=7)
  //     {
  //       clearInterval(intervalMain);
  //       this.gameOver=true;
  //     }
  //   }
  // }, 1000);
  this.connection1.send("StartClock",this.counter);
}

nextQuestion(){
  this.resetTimer();
  // console.log(this.username, this.score, "before its sent to another client");
  // this.connection1.send("sendScore", this.username, this.score);
  this.questionCounter++;
  this.currentQuestion = this.questions[this.questionCounter];
  var cq=JSON.stringify(this.currentQuestion);
  // if(this.arr.length>1 && this.letsplay===0)
    this.connection1.send("sendQuestions",cq);

}

resetTimer(){
  this.i++;
  //this.quesCount++;
  // this.score+=this.counter*2;
  // this.scoreCalculator();
        // .then(() => tbMessage1.value = "");
  this.counter=10;
  this.connection1.send("StartClock",this.counter);
}

scoreCalculator(){
  this.score+=this.counter*2;
  this.connection1.send("sendScore", this.username, this.score);
}

}

