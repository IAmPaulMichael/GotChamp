﻿using GotChamp.Domain;
using GotChamp.Models;
using GotChamp.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GotChamp.Interfaces
{
   public interface IPaymentRepository : IRepository<Payment>
    {
       void UpdatePaymentRepo(int id, Payment payment);
    }
}
