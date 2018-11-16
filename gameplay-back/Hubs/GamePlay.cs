using System;
using System.Collections.Generic;
using System.Linq;

namespace gameplay_back.hubs{

    public class GamePlay
    {
        public static List<GamePlay> gameplay { get; set;}
        
        string username;
        string group_id;
        bool game_started;
    } 

    public  class WaitingGamePlay
    {
            internal string username;
           internal int players_count;

    }
}
