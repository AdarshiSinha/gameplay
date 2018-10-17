import { Component, OnInit } from '@angular/core';

export interface Country {
  value: string;
  viewValue: string;
 }
@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  // countries:string[]=["India", "Pakistan", "Afghanistan"];
  constructor() { }
  country: Country[] = [
    {value: '0', viewValue: 'India'},
    {value: '1', viewValue: 'Pak'},
    {value: '2', viewValue: 'Nepal'}
  ];

  ngOnInit() {
  }
}
