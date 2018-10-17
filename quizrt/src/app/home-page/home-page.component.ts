import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {

  name: string;
  country:string;
  password:string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
//   counter:number = 10;
//   message:any[]=["djshfsj","ddfd","fsdfdsfds","dsfdfdfd","dffdsfdsfdsf","fdfdsfsd","hdgccjsdgh","hfgshdgfhjds","jdhgfdhgfj"];
//   i:number=0;
//   score:number=0;
name: string;
country:string;
password: string;
  constructor(private dialog: MatDialog) { }

//   ngOnInit() {
//     console.log(this.counter);
//     this.gameClock();
//   }

//   gameClock() {
//     const intervalMain = setInterval(() => {
//     // this.mainClock=counter;
//     this.counter--;
//     if (this.counter <= 0) {
//      // this.mainClock="Time Up :p"
//       // clearInterval(intervalMain);
//       this.resetTimer();

//     }
//   }, 1000);
// }

// resetTimer(){
//   // code here

//   this.i++;
//   this.score+=this.counter*2;
//   this.counter=10;
// }
openDialog(): void {
  const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
    width: '250px',
    data: {name: this.name, animal: this.country,password: this.password}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
