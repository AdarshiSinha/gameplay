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


    connection.on('users',(username1:number)=>{
      // console.log(username1 +" connected");
      this.arr.push(username1);
      if(this.username!=username1)
      {
        this.client_found=true;
       if(this.arr.length>0)alert('Player 2 wants to play');
        // this.showQuestions();
      }
    })
    connection.on('receive', (username:string, score:number) => {

      this.forignUserScore = score;
     this.forignuser = username;




    });

    connection.on('counter',(counter1:number)=> {
      this.counter=counter1;
      if (this.counter <= 0) {
        if (this.arr.length>1 && this.letsplay === 0)
       { this.nextQuestion();}}
        if(this.questionCounter>=7)
        {
          // console.log("Game Over");
          this.gameOver=true;
        }


    });

    connection.on('questions',(question:string)=>{
    this.currentQuestion=JSON.parse(question);

    }
    );




  }
  sleep(){
    if(this.client_found == true ) {
      this.letsplay++ ;
      alert('sending request to player1')
    }
    // delay(10000);
    this.connection1.send("OnConnectedAsync",this.username);

  }

  showQuestions()
  {

    this.start=true;
    // console.log('called showQuestions');
    if(this.arr.length>1 && this.letsplay===0)
   { this.http.get('http://localhost:3000/questions').subscribe((res: any) => {
    this.questions = res;
    this.currentQuestion = this.questions[this.questionCounter];
    var cq=JSON.stringify(this.currentQuestion);

    this.connection1.send("sendQuestions",cq);
    this.shouldDisplayQuestions = true;
    this.gameClock();



    });
  }
  }

  gameClock() {
  this.connection1.send("StartClock",this.counter);
}

nextQuestion(){
  if(this.arr.length>1 && this.letsplay===0)
  {this.resetTimer();
  this.questionCounter++;

 this.currentQuestion = this.questions[this.questionCounter];
  var cq=JSON.stringify(this.currentQuestion);
  // if(this.arr.length>1 && this.letsplay===0)
    this.connection1.send("sendQuestions",cq);

  }


}

resetTimer(){

  this.counter=10;
  this.connection1.send("StartClock",this.counter);
}

scoreCalculator(){
  this.score+=this.counter*2;
  this.connection1.send("sendScore", this.username, this.score);
}

}

