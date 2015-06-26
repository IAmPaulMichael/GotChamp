using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace GotChamp.Domain
{
    public class Advertisement
    {

        public string AdvertisementId { get; set; }
       // [Required]
        public string Status { get; set; }

        public string Address { get; set; }

        public string CompanyName { get; set; }
        //[Required]
        public string Path { get; set; }
       // [Required]

        public bool IsPublish { get; set; }

        public string Title { get; set; }

        public int Clicks { get; set; }
        //[Required]
        public bool IsActive { get; set; }
       // [Required]
        public string ContactPerson { get; set; }
       // [Required]
        public string ContactNumber { get; set; }
        //[Required]
        public decimal CurrentDonation { get; set; }

        public virtual List<Payment> Payments { get; set; }

    }
}