using GotChamp.Domain;
using GotChamp.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace GotChamp.Infra
{
    public class GotChampContext : IdentityDbContext<Player>
    {
        public GotChampContext()
            :base("GotChampDbConnection")
        {

        }
        public DbSet<Advertisement> Advertisements { get; set; }
        public DbSet<Payment> Payments { get; set; }

        public static GotChampContext Create()
        {
            return new GotChampContext();
        }
    }

  
}