import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-single-player',
  templateUrl: './single-player.component.html',
  styleUrls: ['./single-player.component.css']
})
export class SinglePlayerComponent implements OnInit {
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
  option =[];
  option_object:any;
//  quesCount=0;

  gameOver = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {}


  showQuestions()
  {
    this.start=true;
    console.log('called showQuestions');
    this.http.get('http://172.23.238.164:8080/api/quizrt/question').subscribe((res: any) => {
    this.questions = res;

    this.shouldDisplayQuestions = true;
    this.currentQuestion = this.questions[Math.floor((Math.random() * 100) + 1)];
    this.gameClock();
    // console.log(this.questions[0].options);

    });
  }

  gameClock() {
    const intervalMain = setInterval(() => {
      // this.currentQuestion = this.questions[Math.floor((Math.random() * 100) + 1)];
    this.counter--;
    if (this.counter <= 0) {
      this.nextQuestion();}
      //this.resetTimer();
      if(this.questionCounter>=7)
      {
        clearInterval(intervalMain);
        this.gameOver=true;
      }

  }, 1000);
}

nextQuestion(){
  this.resetTimer();
  this.questionCounter++;
  this.currentQuestion = this.questions[Math.floor((Math.random() * 100) + 1)];
}

resetTimer(){
  this.i++;
  //this.quesCount++;
  // this.score+=this.counter*2;

  this.counter=10;
}

scoreCalculator(optionsobject: any){
    if(optionsobject.isCorrect==true)
  {
    console.log("correct answer");
    this.score+=this.counter*2;
  }
  else{
    this.score+=0;
  }
 //console.log(option.isCorrect);
 this.nextQuestion();
 }
}
