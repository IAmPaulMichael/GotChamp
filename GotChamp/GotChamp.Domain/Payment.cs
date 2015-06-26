using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GotChamp.Domain
{
    public class Payment
    {
        public int PaymentId { get; set; }
        public string AdvertisementId { get; set; }
        public DateTime PaymentDate { get; set; }
        public decimal Amount { get; set; }

    }
}