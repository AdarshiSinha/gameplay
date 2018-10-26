using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;

namespace asp_back.Models
{
    [DataContract]
    public class Player
    {
        [DataMember]
        public User User { get; set; }
        [DataMember]
        public int PlayerNumber { get; set; }
        [DataMember]
        public int Score { get; set; }
    }
}