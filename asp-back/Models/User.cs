using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace asp_back.Models
{
    public class User
    {        
        public string id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string idToken { get; set; }
        public int no_of_games_played {  get; set; }
        public int score{ get; set; }        
    }
}

