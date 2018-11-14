import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Howl} from 'howler';
@Component({
  selector: 'app-single-player',
  templateUrl: './single-player.component.html',
  styleUrls: ['./single-player.component.css']
})
export class SinglePlayerComponent implements OnInit {
  counter:number = 10;
  questions = [ ];
  score:number=0;
  questionCounter = 0;
  currentQuestion : any;
  start:boolean=false;
  isClickedOnce:boolean=false;
  gameOver = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {}


  showQuestions()
  {
    this.start=true;
    this.http.get('http://172.23.238.164:8080/api/quizrt/question').subscribe((res:any) => {
    this.questions = res;
    this.currentQuestion = this.questions[Math.floor((Math.random() * 800) + 1)];
    this.gameClock();

    });
  }

  gameClock() {
    const intervalMain = setInterval(() => {
    this.counter--;
    if (this.counter <= 0) {
      this.nextQuestion();}
      if(this.questionCounter>6)
      {
        clearInterval(intervalMain);
        this.gameOver=true;
      }

  }, 1000);
}

nextQuestion(){

  this.questionCounter++;
  this.currentQuestion = this.questions[Math.floor((Math.random() * 800) + 1)];
  this.resetTimer();
}

resetTimer(){
this.counter=10;
}

scoreCalculator(optionsobject: any){
    if(optionsobject.isCorrect==true)
  {
    this.score+=this.counter*2;
  }
  else{
    this.score+=0;
  }
 this.nextQuestion();
 }
}
