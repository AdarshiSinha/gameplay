using Microsoft.EntityFrameworkCore;
using System;
namespace asp_back.Models
{
    public class efmodel: DbContext
    {
        public DbSet<User> Users {get; set;}

        public efmodel(DbContextOptions<efmodel> options): base(options){
            this.Database.EnsureCreated(); // Kuldeep
        }

        // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        // {
        //     optionsBuilder.UseSqlServer(@"SqlServer=localhost\SQLEXPRESS;Database=Users;Trusted_Connection=True;");
        // }    // Not Needed Anymore, Relevant Changes Done In Startup.cs
    }
}