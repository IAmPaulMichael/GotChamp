using GotChamp.Domain;
using GotChamp.Infra;
using GotChamp.Interfaces;
using GotChamp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GotChamp.Repository
{
    public class AdvertisementRepository : IAdvertisementRepository
    {
        private GotChampContext _context;

        public AdvertisementRepository()
        {
            _context = new GotChampContext();
        }

        public void Create(Advertisement entity)
        {
            entity.AdvertisementId = Guid.NewGuid().ToString();
            _context.Advertisements.Add(entity);
            _context.SaveChanges();
            
        }

        public void Update(string id, Advertisement entity)
        {

            _context.Entry(entity);

            var original = _context.Advertisements.Find(id);

            if (original != null)
            {
                original.CompanyName = entity.CompanyName;
                original.Path = entity.Path;
                original.IsActive = entity.IsActive;
                original.ContactNumber = entity.ContactNumber;
                original.ContactPerson = entity.ContactPerson;
                original.CurrentDonation = entity.CurrentDonation;
                
            }
            _context.SaveChanges();
        }

        public Advertisement FindById(string id)
        {
            var advertisement = _context.Advertisements.Find(id);
            return advertisement;
        }

        public List<Advertisement> FindAll()
        {
            var advertisements = _context.Advertisements.ToList();
            return advertisements;
        }

        public string GetId(string AdvertisementName)
        {
            var id = _context.Advertisements.Where(u => u.CompanyName == AdvertisementName).ToList();

            return id[0].AdvertisementId.ToString();

        }

        public void Delete(string id)
        {
            var ad = FindById(id);
            _context.Advertisements.Remove(ad);
            _context.SaveChanges();
        }


        public void AddClick(string id)
        {
            var original = _context.Advertisements.Find(id);

            if (original != null)
            {
                original.Clicks = original.Clicks + 1;
            }
            _context.SaveChanges();

        }
    }
}