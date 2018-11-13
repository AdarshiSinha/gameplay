using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace asp_back.Models
{
    public class User
    {
        [Key]
        public string user_id { get; set; }
        public string user_name { get; set; }
        public string user_image{get; set; }
        public string email { get; set; }
        public string idToken { get; set; }
        public int no_of_games_played {  get; set; }
        public int score{ get; set; }        
    }
}

