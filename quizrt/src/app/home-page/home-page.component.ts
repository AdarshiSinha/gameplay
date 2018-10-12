import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  counter:number = 10;
  message:any[]=["djshfsj","ddfd","fsdfdsfds","dsfdfdfd","dffdsfdsfdsf","fdfdsfsd","hdgccjsdgh","hfgshdgfhjds","jdhgfdhgfj"];
  i:number=0;
  score:number=0;
  constructor() { }

  ngOnInit() {
    console.log(this.counter);
    this.gameClock();
  }

  gameClock() {
    const intervalMain = setInterval(() => {
    // this.mainClock=counter;
    this.counter--;
    if (this.counter <= 0) {
     // this.mainClock="Time Up :p"
      // clearInterval(intervalMain);
      this.resetTimer();

    }
  }, 1000);
}

resetTimer(){
  // code here

  this.i++;
  this.score+=this.counter*2;
  this.counter=10;
}




}
