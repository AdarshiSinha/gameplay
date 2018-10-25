import { Component, OnInit } from '@angular/core';
import * as signalR from '@aspnet/signalr';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    const divMessages1: HTMLDivElement = document.querySelector('#divMessages1');
    const divMessages2: HTMLDivElement = document.querySelector('#divMessages2');
    const divMessages3: HTMLDivElement = document.querySelector('#divMessages3');
    const divMessages4: HTMLDivElement = document.querySelector('#divMessages4');
    const tbMessage1: HTMLInputElement = document.querySelector('#tbMessage1');
    const tbMessage2: HTMLInputElement = document.querySelector('#tbMessage2');
    const tbMessage3: HTMLInputElement = document.querySelector('#tbMessage3');
    const tbMessage4: HTMLInputElement = document.querySelector('#tbMessage4');
    const btnSend1: HTMLButtonElement = document.querySelector('#btnSend1');
    const btnSend2: HTMLButtonElement = document.querySelector('#btnSend2');
    const btnSend3: HTMLButtonElement = document.querySelector('#btnSend3');
    const btnSend4: HTMLButtonElement = document.querySelector('#btnSend4');
    let username = new Date().getTime();




    // let message:string;


    const connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/chathub')
      .build();
      connection.start().then(() => console.log('connection established')).catch((err) => console.log("Error::: ", err));


      connection.on('messageReceived',(username:string, score:string)=>{
        let m1 = document.createElement('div');

        m1.innerHTML =
          `<div class='message__author'>${username}</div><div>${score}</div>`;

        divMessages1.appendChild(m1);
      divMessages1.scrollTop = divMessages1.scrollHeight;
    });


    // connection.invoke('NewMessage');

    connection.on('messageReceived', (username:string,message1: string) => {
      let m2 = document.createElement('div');

      m2.innerHTML =
        `<div class='message__author'>${username}</div><div>${message1}</div>`;

      divMessages2.appendChild(m2);
      divMessages2.scrollTop = divMessages2.scrollHeight;
    });



    connection.on('messageReceived', (username: string, message: string) => {
      let m3 = document.createElement('div');

      m3.innerHTML =
        `<div class='message__author'>${username}</div><div>${message}</div>`;

      divMessages3.appendChild(m3);
      divMessages3.scrollTop = divMessages3.scrollHeight;
    });


    connection.on('messageReceived', (username: string, message: string) => {
      let m = document.createElement('div');

      m.innerHTML =
        `<div class='message__author'>${username}</div><div>${message}</div>`;

      divMessages4.appendChild(m);
      divMessages4.scrollTop = divMessages4.scrollHeight;
    });


    tbMessage1.addEventListener('keyup', (e: KeyboardEvent) => {
      if (e.keyCode === 13) {
        send1();
      }
    });

    tbMessage2.addEventListener('keyup', (e: KeyboardEvent) => {
      if (e.keyCode === 13) {
        send2();
      }
    });

    tbMessage3.addEventListener('keyup', (e: KeyboardEvent) => {
      if (e.keyCode === 13) {
        send3();
      }
    });

    tbMessage4.addEventListener('keyup', (e: KeyboardEvent) => {
      if (e.keyCode === 13) {
        send4();
      }
    });

    btnSend1.addEventListener('click', send1);
    btnSend2.addEventListener('click', send2);
    btnSend3.addEventListener('click', send3);
    btnSend4.addEventListener('click', send4);
    function send1(){
        connection.send("newMessage", username, tbMessage1.value)
        .then(() => tbMessage1.value="");
    }

    function send2(){
        connection.send("newMessage", username, tbMessage2.value)
        .then(() => tbMessage2.value = "");
    }
    function send3(){
        connection.send("newMessage", username, tbMessage3.value)
        .then(() => tbMessage3.value = "");
    }

    function send4(){
        connection.send("newMessage", username, tbMessage4.value)
        .then(() => tbMessage4.value = "");
    }
  }

}
