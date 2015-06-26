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
    public class PaymentRepository : IPaymentRepository
    {
        private GotChampContext _context;
        public PaymentRepository()
        {
            _context = new GotChampContext(); 
        }

        public void Create(Payment entity)
        {
            
            _context.Payments.Add(entity);
            _context.SaveChanges();

        }

        public void Update(string id, Payment payment)
        {
            var original = _context.Payments.Find(id);

            if (original != null)
            {
                original.PaymentDate = payment.PaymentDate;
                original.Amount = payment.Amount;
            }
            _context.SaveChanges();
        }

        public Payment FindById(string id)
        {
            var payment = _context.Payments.Find(id);
            return payment;

        }

        public List<Payment> FindAll()
        {
            var payments = _context.Payments.ToList();
            return payments;
        }

        public void Delete(string id)
        {
            var payment = _context.Payments.Find(id);
            _context.Payments.Remove(payment);
        }

        public void UpdatePaymentRepo(int id, Payment payment)
        {
            var original = _context.Payments.Find(id);

            if (original != null)
            {
                original.PaymentDate = payment.PaymentDate;
                original.Amount = payment.Amount;
            }
            _context.SaveChanges();
        }

       

    }
}