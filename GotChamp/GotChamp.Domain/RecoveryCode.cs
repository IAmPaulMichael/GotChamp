using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GotChamp.Domain
{
    public class RecoveryCode
    {
        //public int code { get; set; }

        public RecoveryCode()
        {
            
        }

        public int generateCode() { 
            Random rand = new Random();

            return rand.Next(100000000, 1000000000);
        }
    }
}