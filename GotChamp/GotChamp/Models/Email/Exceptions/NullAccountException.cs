using GotChamp.Models.Email.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GotChamp.Models.Email.Exceptions
{
    class NullAccountException : ApplicationException
    {
        public NullAccountException() : base(Convert.ToString(ExceptionMessages.NullAccount))
        {
            
        }
    }
}
