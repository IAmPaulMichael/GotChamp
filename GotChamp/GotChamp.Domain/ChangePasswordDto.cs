using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GotChamp.Domain
{
    public class ChangePasswordDto
    {
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string Email { get; set; }
    }
}