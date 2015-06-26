using GotChamp.Domain;
using GotChamp.Models;
using GotChamp.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GotChamp.Controllers
{
    public class PaymentController : ApiController
    {
        private PaymentRepository repo;

        public PaymentController()
        {
            repo = new PaymentRepository();
        }

       
        [HttpPost]
        public IHttpActionResult Post(PaymentDto paymentDto)
        {
             AdvertisementRepository adRepo = new AdvertisementRepository();
             var Id = adRepo.GetId(paymentDto.Name);
             Payment payment = new Payment
             {
                 AdvertisementId = Id,
                 Amount = paymentDto.Amount,
                 PaymentDate = paymentDto.PaymentDate

             };

            try
            {
                repo.Create(payment);
                return Ok();
            }
            catch (Exception)
            {

                return InternalServerError();
            }

        }

        [HttpGet]
        public IHttpActionResult Get()
        {
            try
            {
                AdvertisementRepository adRepo = new AdvertisementRepository();
                var Ads = adRepo.FindAll();

                return Ok(Ads);

            }
            catch (Exception)
            {

                return InternalServerError();
            }
           
        }

        public IHttpActionResult Put(Payment payment)
        {
            try
            {
                repo.UpdatePaymentRepo(payment.PaymentId, payment);
                return Ok();

            }
            catch (Exception)
            {

                return InternalServerError();
            }

        }

        

        
    }
}
