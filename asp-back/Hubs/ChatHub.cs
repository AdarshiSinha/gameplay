using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using asp_back.Models;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
namespace asp_back.hubs {
    /// <summary>
    /// This hub receives request from the front-end and responds to the specified client 
    /// </summary>
    public class ChatHub : Hub {
        int i=0;
        
        #region Newmessage 
        public async Task NewMessage(string username, string message)
        {
            await Clients.All.SendAsync("messageReceived", username, message);
            // ("Reached here");
        }
        #endregion
        #region SendMessage
        public async Task SendMessage (string user, string message) {
            await Clients.All.SendAsync ("ReceiveMessage", user, message);
        }
        #endregion 
        #region StartClock
        public async Task StartClock(int i, int questionCounter){
            while(i>=0)
        {
            await Clients.All.SendAsync("counter",i);
            Thread.Sleep(1000);
            i--;
            if(questionCounter>7)
            {
                break;
            }
        }
    
        }
        #endregion
        #region SendScore
        public async Task SendScore (string user, int score){
            // Console.WriteLine(user + "this is User" + score + "this is score");
            await Clients.Others.SendAsync("receive",user, score);
        }
        #endregion
        #region SendMessageToCaller
        public Task SendMessageToCaller (string message) {
            return Clients.Caller.SendAsync ("ReceiveMessage", message);
        }
        #endregion
        #region SendMessageToGroups
        public Task SendMessageToGroups (string message) {
            List<string> groups = new List<string> () { "SignalR Users" };
            return Clients.Groups (groups).SendAsync ("ReceiveMessage", message);
        }
        #endregion
        #region sendQuestions
        public async Task sendQuestions(string ques, int qc) {
            await Clients.Others.SendAsync("questions", ques,qc);
        //    await base.OnConnectedAsync ();
        }
        #endregion
        #region gameOver
        public async Task gameOver(bool game ){
            // Console.WriteLine("Reached game over");
            await Clients.All.SendAsync("game",game);
        }
        #endregion
        #region OnConnectedAsync
        public  async Task OnConnectedAsync (string username) {
            
            // Console.WriteLine("Client Connected"+ (this.i++));
            // await Groups.AddToGroupAsync (Context.ConnectionId, "SignalR Users");
            await Clients.All.SendAsync("users",username);
            await base.OnConnectedAsync ();
        }
        #endregion
        #region OnDisconnectedAsync
        public async Task OnDisconnectedAsync (string username) {
            // await Groups.RemoveFromGroupAsync (Context.ConnectionId, "SignalR Users");
            await Clients.All.SendAsync("usersDisconnect",username); 
            // await base.OnDisconnectedAsync (exception);
        }
        #endregion
    }
}