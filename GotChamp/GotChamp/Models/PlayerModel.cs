using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace GotChamp.Models
{
    public class PlayerModel
    {
        [Required]
        [Display(Name = "User name")]
        public string UserName { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
        
        [Required]
        public string Address1 { get; set; }

        [Required]
        public string Email { get; set; }

        public string Address2 { get; set; }

        [Required]
        public string BirthDate { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string Location { get; set; }

        [Required]
        public string ContactNumber { get; set; }
    }
}