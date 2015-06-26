using GotChamp.Models;
using GotChamp.Repository;
using System;
using System.Security.Claims;
using System.Security.Cryptography;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Threading.Tasks;
using GotChamp.Domain;

using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;

namespace GotChamp.Controllers
{

    [RoutePrefix("api/advertisement")]
    public class AdvertisementController : ApiController
    {
        private AdvertisementRepository repo;

        Advertisement currentAccount;
        public AdvertisementController()
        {
            repo = new AdvertisementRepository();
          
        }

        [HttpPost]
        public IHttpActionResult Create(Advertisement advertisement)
        {
            if (advertisement == null)
            {
                return NotFound();
            }
            
            if (!ModelState.IsValid)
            {
                return NotFound();
            }
            try
            {
                advertisement.AdvertisementId = Guid.NewGuid().ToString();
                repo.Create(advertisement);
                return Ok();
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }
        [HttpGet]
        public IHttpActionResult AdvertisementList()
        {
            try
            {
                var list = repo.FindAll();
                return Ok<List<Advertisement>>(list);
            }
            catch (Exception)
            {

                return InternalServerError();
            }
        }
        [HttpGet]
        public IHttpActionResult AdvertisementList(string status)
        {
            try
            {
                var list = repo.FindAll().Where(u=>u.Status==status);
                return Ok(list);
            }
            catch (Exception)
            {

                return InternalServerError();
            }
        }

        [HttpGet]
        [Route("{id}")]
        public IHttpActionResult AdvertisementDetail(string id)
        {
            try
            {
                var advertiser = repo.FindById(id);
                currentAccount = advertiser;

                return Ok<Advertisement>(advertiser);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }
        [HttpPost]
        [Route("publish")]
        public IHttpActionResult Publish(Advertisement image)
        {
            try
            {
                var advertisement = repo.FindById(image.AdvertisementId);

                if (advertisement.IsPublish)
                {
                    advertisement.IsPublish = false;
                }
                else
                {
                    advertisement.IsPublish = true;
                }

                repo.Update(advertisement.AdvertisementId, advertisement);

                return Ok<Advertisement>(advertisement);
            }
            catch (Exception)
            {

                return InternalServerError();
            }
        }

        [HttpGet]
        [Route("gallery")]
        public IHttpActionResult GetGallery()
        {
            try
            {

                var list = repo.FindAll();
                var published = list.Where(u => u.IsPublish == true).ToList();
                
                return Ok<List<Advertisement>>(published);
            }
            catch (Exception)
            {

                return InternalServerError();
            }
        }

        //api/Advertisement/Click
        [HttpPut]
        [Route("Click/{id}")]
        public IHttpActionResult AddClicks(string id,string adId)
        {
            try
            {

                AuthRepository auth = new AuthRepository();
                
                auth.SetPlayerStatus(id,adId);


                return Ok();
            }
            catch (Exception)
            {

                return InternalServerError();
            }
        }
        public IHttpActionResult Delete(string id)
        {
            if (id == null)
            {
                return NotFound();
            }
            try
            {

                repo.Delete(id);
                var advertisement = repo.FindById(id);
                if (advertisement != null)
                    return NotFound();
                else
                    return Ok();
            }
            catch (Exception)
            {

                return InternalServerError();
            }

        }


    }
}
