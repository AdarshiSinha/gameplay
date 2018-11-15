using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace gameplay_back.Models
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

    public class QuizRTTemplate{
        [Key]
        public int TempId { get; set; }
        public string Text { get; set; }
        public string SparQL { get; set; }
        public string Categ { get; set; }
        public string CategName { get; set; }
        public string Topic { get; set; }
        public string TopicName { get; set; }
    }
    public class Questions{
        [Key]
        public int QuestionsId { get; set; }
        public string Categ { get; set; }
        public string Topic { get; set; }
        public string QuestionGiven { get; set; }
        public List<Options> QuestionOptions { get; set; }
    }
    public class Options{
        [Key]
        public int OptionsId { get; set; }
        public string OptionGiven { get; set; }
        public bool IsCorrect { get; set; }
        public int QuestionsId { get; set; }
    }
}




