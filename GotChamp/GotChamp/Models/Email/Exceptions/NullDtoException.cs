using GotChamp.Models.Email.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GotChamp.Models.Email.Exceptions
{
    public class NullDtoException : ApplicationException
    {
        public NullDtoException() : base(ExceptionMessages.NullDto)
        {
            
        }
    }
}
