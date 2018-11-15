using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using gameplay_back.Models;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Net.Http;
namespace gameplay_back.hubs {
    /// <summary>
    /// This hub receives request from the front-end and responds to the specified client 
    /// </summary>
    public class ChatHub : Hub {
        // int i=0;
        HttpClient http= new HttpClient();
        
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
        public async Task StartClock(int i, int questionCounter) {
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
        // #region SendMessageToGroups
        // public Task SendMessageToGroups (string message) {
        //     List<string> groups = new List<string> () { "SignalR Users" };
        //     return Clients.Groups (groups).SendAsync ("ReceiveMessage", message);
        // }
        // #endregion
        #region sendQuestions
        public async Task SendQuestions() {
            HttpResponseMessage response = await this.http.GetAsync("http://172.23.238.164:8080/api/quizrt/question");
            HttpContent content = response.Content;
            string data = await content.ReadAsStringAsync();
            JArray json = JArray.Parse(data);
            Random random = new Random();
            await Clients.Caller.SendAsync("questions", json[random.Next(1,json.Count)]);
        }
        #endregion

        public async Task SendQuestionsToMulti(string groupname) {
            HttpResponseMessage response = await this.http.GetAsync("http://172.23.238.164:8080/api/quizrt/question");
            Console.WriteLine("came here");
             HttpContent content = response.Content;
            string data = await content.ReadAsStringAsync();
            JArray json = JArray.Parse(data);
            Random random = new Random();
            await Clients.Groups(groupname).SendAsync("questionsToMulti", json[random.Next(1,json.Count)]);
        }


        #region gameOver
        public async Task GameOver(bool game) {
            // Console.WriteLine("Reached game over");
            await Clients.All.SendAsync("game", game);
        }
        #endregion
        #region OnConnectedAsync
        public  async Task OnConnectedAsync (string username) {
            
            await Clients.All.SendAsync("users", username);
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

        public async Task AddToGroup(string userName, string groupName) {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            // Random group= new Random();
            // var groupName=group.Next(1,50).ToString();
            Console.WriteLine();
            await Clients.Group(groupName).SendAsync("Send", userName, groupName);
        }
    }
}