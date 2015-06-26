using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace GotChamp.Models.Email.DTOs
{
    public class RecoverDto
    {
        [Required]
        public string userEmail { get; set; }

        [Required]
        public string MessageType { get; set; }
    }
}