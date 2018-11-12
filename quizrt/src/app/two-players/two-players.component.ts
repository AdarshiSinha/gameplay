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
  questions = [ ];
  i:number=0;
  name: string;
  score:number=0;
  questionCounter = 1;
  shouldDisplayQuestions = false;
  currentQuestion : any;
  users_found:boolean=false;
  start:boolean=false;
  gameOver = false;
  username = new Date().getTime();
  connection1:any;
  client_found: number=1;
  currentUser: any;
  forignuser: any;
  currentUserScore: any;
  forignUserScore: number=0;
  op: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {


    const connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/chathub')
      .build();

      connection.start().then(() => console.log('connection established')).catch((err) => console.log("Error::: ", err));
      this.connection1=connection;


    connection.on('users',(username1:number)=>{
      // console.log(username1 +" connected");
      if(this.username!=username1)
      {
        this.client_found++;
       alert('Player 2 wants to play');
       this.forignuser=username1;
      //  this.client_found--;
        // this.showQuestions();
      }
    })
    connection.on('receive', (username:string, score:number) => {

      this.forignUserScore = score;
     this.forignuser = username;
      // console.log(this.forignuser+" "+this.forignUserScore+" sent from another client")



    });

    connection.on('game',(gameOver:boolean)=>{
    this.gameOver=gameOver;
      // console.log(this.gameOver+ " returned to all");
  });

  connection.on("usersDisconnect",(username1:string)=> {

    alert(username1+" decides to quit.Finishing game...");
    this.gameOver=true;

  });

    connection.on('counter',(counter1:number, question:number)=> {
      // console.log(this.username+" is triggereing "+counter1);
      this.counter=counter1;
      if (this.counter <= 0) {

        if(this.users_found===true){
          this.nextQuestion();
        if(this.questionCounter>7)
        {
          // console.log("Game Over");
          this.gameOver=true;

          // console.log("Game Stopped");
          connection.send("gameOver",this.gameOver);
        }
      }
      }
    });

    connection.on('questions',(question:string,qc:number)=>{
      // console.log(this.username+" gets question "+ qc);
    this.currentQuestion=JSON.parse(question);

    }
    );




  }
  sleep(){
    if(this.client_found==2 ) {

      alert('2 players joined');
      this.users_found=true;
    }
    this.connection1.send("OnConnectedAsync",this.username);

  }

  endGame(){
    this.connection1.send("OnDisconnectedAsync",this.username);
    // this.gameOver=true;
  }
  showQuestions()
  {

    this.start=true;
    // console.log('called showQuestions');


   this.http.get('http://172.23.238.164:8080/api/quizrt/question').subscribe((res: any) => {
    this.questions = res;
    this.currentQuestion = this.questions[Math.floor((Math.random() * 100) + 1)];
    // console.log(this.username +" called question "+ this.questionCounter);


    var cq=JSON.stringify(this.currentQuestion);

    this.connection1.send("sendQuestions",cq,this.questionCounter);
    this.shouldDisplayQuestions = true;
    this.gameClock();



    });


  }

  gameClock() {
  this.connection1.send("StartClock",this.counter,this.questionCounter);
}

nextQuestion(){

  this.questionCounter++;

 this.currentQuestion = this.questions[Math.floor((Math.random() * 100) + 1)];
//  console.log(this.username + " called question "+ this.questionCounter);
  var cq=JSON.stringify(this.currentQuestion);
  // if(this.arr.length>1 && this.letsplay===0)
    this.connection1.send("sendQuestions",cq,this.questionCounter);
    this.resetTimer();
 }




resetTimer(){

  this.counter=10;
  this.connection1.send("StartClock",this.counter,this.questionCounter);
}

scoreCalculator(optionsobject:any){
  if(optionsobject.isCorrect==true)
  {
    // console.log("correct answer");
    this.score+=this.counter*2;
  }
  else{
    this.score+=0;
  }
  this.connection1.send("sendScore", this.username, this.score);
}

}

