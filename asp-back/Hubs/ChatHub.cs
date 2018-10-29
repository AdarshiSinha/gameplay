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
        
    public class ChatHub : Hub {
        int i=0;
        private IUserRepository _userRepository;
        
        public ChatHub(){
            _userRepository = IUserRepository.GetInstance();
        }
        #region IDisconnect event handler
                public Task Disconnect(){

                    User user = _userRepository.ConnectedUsers.Where(u => u.Id.Equals(Context.ConnectionId)).FirstOrDefault();
                    if (user != null)
                    {
                        _userRepository.RemoveUser(user);
                        _userRepository.RemoveFromWaitingList(user);
                    }
                    return null;
                }

        #endregion

        #region PongR event handlers
                public void Joined()
                {
                   
                    
                }
        #endregion
        public async Task NewMessage(string username, string message)
        {
            await Clients.All.SendAsync("messageReceived", username, message);
            // ("Reached here");
        }
        public async Task SendMessage (string user, string message) {
            await Clients.All.SendAsync ("ReceiveMessage", user, message);
        }

        public async Task StartClock(int i){
            while(i>=0)
        {
            await Clients.All.SendAsync("counter",i);
            Thread.Sleep(1000);
            i--;
        }
        }
        public async Task SendScore (string user, int score){
            // Console.WriteLine(user + "this is User" + score + "this is score");
            await Clients.Caller.SendAsync("receive",user, score);
        }
        

        public Task SendMessageToCaller (string message) {
            return Clients.Caller.SendAsync ("ReceiveMessage", message);
        }

        public Task SendMessageToGroups (string message) {
            List<string> groups = new List<string> () { "SignalR Users" };
            return Clients.Groups (groups).SendAsync ("ReceiveMessage", message);
        }

        public async Task sendQuestions(string ques) {
            await Clients.All.SendAsync("questions", ques);
        }

        public  async Task OnConnectedAsync (string username) {
            
            Console.WriteLine("Client Connected"+ (this.i++));
            await Groups.AddToGroupAsync (Context.ConnectionId, "SignalR Users");
            await Clients.All.SendAsync("users",username);
            await base.OnConnectedAsync ();
        }

        public override async Task OnDisconnectedAsync (Exception exception) {
            await Groups.RemoveFromGroupAsync (Context.ConnectionId, "SignalR Users");
            await base.OnDisconnectedAsync (exception);
        }
    }
}