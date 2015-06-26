using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using GotChamp.Models;
using GotChamp.Infra;

namespace GotChamp
{
    // Configure the application user manager used in this application. UserManager is defined in ASP.NET Identity and is used by the application.

    public class PlayerUserManager : UserManager<Player>
    {
        public PlayerUserManager(IUserStore<Player> store)
            : base(store)
        {
        }

        public static PlayerUserManager Create(IdentityFactoryOptions<PlayerUserManager> options, IOwinContext context)
        {
            var manager = new PlayerUserManager(new UserStore<Player>(context.Get<GotChampContext>()));
            // Configure validation logic for usernames
            manager.UserValidator = new UserValidator<Player>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };
            // Configure validation logic for passwords
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = false,
                RequireDigit = false,
                RequireLowercase = false,
                RequireUppercase = false,
            };
            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider = new DataProtectorTokenProvider<Player>(dataProtectionProvider.Create("ASP.NET Identity"));
            }
            return manager;
        }
    }
}
