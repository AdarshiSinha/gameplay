import { Component, OnInit } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { HttpClient } from '@angular/common/http';
import { delay } from 'q';
@Component({
  selector: 'app-three-players',
  templateUrl: './three-players.component.html',
  styleUrls: ['./three-players.component.css']
})
export class ThreePlayersComponent implements OnInit {
  arr : any = [] ;
  connection1:any;
  no_of_players:number=1;
  username: any= new Date().getTime();
  users_found:boolean=false;
  counter:number=10;
  questionCounter:number=0;
  currentQuestion:any;
  questions:any=[];
  score:number=0;
  gameOver:boolean=false;
  start:boolean=false;
  shouldDisplayQuestions:boolean=false;

  constructor(private http: HttpClient ) { }

  ngOnInit() {

    const connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/chathub')
      .build();

      connection.start().then(() => console.log('connection established')).catch((err) => console.log("Error::: ", err));
      this.connection1=connection;

      connection.on('users',(username1:string)=>{
        // console.log(username1 +" connected");
        this.arr.push(username1);
        if(this.username!=username1)
        {
          this.no_of_players++;
          if(this.arr.length>0) alert('Player 2 wants to play');
        }
      })

      connection.on('receive', (username:string, score:number) => {

            console.log(username, score, "this is the message form the server")

      });

      connection.on('counter',(counter1:number)=> {
        this.counter=counter1;
        if (this.counter <= 1) {
          if (this.users_found==true)
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
      }
      );


  }

  sleep(){
    if(this.no_of_players==3 ) {

      alert('3 players joined');
      this.users_found=true;
    }
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

    this.connection1.send("StartClock",this.counter);
  }

  nextQuestion(){
    this.resetTimer();

    this.questionCounter++;
    this.currentQuestion = this.questions[this.questionCounter];
    var cq=JSON.stringify(this.currentQuestion);
    // if(this.arr.length>1 && this.letsplay===0)
      this.connection1.send("sendQuestions",cq);

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
