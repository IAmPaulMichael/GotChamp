using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace GotChamp.Domain
{
    public class PaymentDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public DateTime PaymentDate { get; set; }
        [Required]
        public decimal Amount { get; set; }

    }
}