using GotChamp.Domain;
using GotChamp.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GotChamp.Controllers
{
    public class HomeController : Controller
    {
        private AdvertisementRepository repo;
        public HomeController()
        {
            repo = new AdvertisementRepository();
        }
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        [HttpPost]
        public ActionResult Index(HttpPostedFileBase file, string id, string Title)
        {

            var advertisement = repo.FindById(id);

            advertisement.Title = Title;
            advertisement.Path = "/Data/" + file.FileName;

            repo.Update(id, advertisement);

            string filePath = Server.MapPath("/Data/" + file.FileName);

      
            file.SaveAs(filePath);

           
            return Redirect("/ads/detail/" +id+ "");
        }
    }
}
