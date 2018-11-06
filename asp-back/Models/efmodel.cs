using Microsoft.EntityFrameworkCore;
using System;
namespace asp_back.Models
{
    public class efmodel: DbContext
    {
        public DbSet<User> Users {get; set;}

        public efmodel(DbContextOptions<efmodel> options): base(options){}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"SqlServer=localhost\SQLEXPRESS;Database=Users;Trusted_Connection=True;");
        }
    }
}