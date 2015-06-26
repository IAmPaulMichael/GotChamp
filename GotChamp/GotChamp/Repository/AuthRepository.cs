using GotChamp.Infra;
using GotChamp.Models;
using GotChamp.Repository;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security.DataProtection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace GotChamp.Repository
{
    public class AuthRepository :IDisposable
    {
        private GotChampContext _context;
        private UserManager<Player> _userManager;

        public AuthRepository()
        {
            _context = new GotChampContext();
            _userManager = new UserManager<Player>(new UserStore<Player>(_context));

            
        }

        public async Task<IdentityResult> RegisterUser(PlayerModel userModel)
        {
            Player user = new Player
            {
                 UserName = userModel.UserName,
                 FirstName = userModel.FirstName,
                 LastName = userModel.LastName,
                 ContactNumber = userModel.ContactNumber,
                 Address1 = userModel.Address1,
                 Address2 = userModel.Address2,
                 Location = userModel.Location,
                 BirthDate = userModel.BirthDate,
                 Gender = userModel.Gender,
                 Email = userModel.Email
                 
            };
         
            IdentityUser identityUser = new IdentityUser
            {
                UserName = userModel.UserName
            };
            var result = await _userManager.CreateAsync(user,userModel.Password);

            return result;
        }

        public async Task<Player> FindUser(string userName, string password)
        {
            Player user = await _userManager.FindAsync(userName, password);


            return user;
        }

        public Player FindUserByUserName(string userName)
        {
            Player user = _userManager.FindByName(userName);
            
            return user;
        }

        public bool FindUserByEmailAndPass(string email,string password)
        {
            bool loginIsValid = false;
            Player user = _userManager.FindByEmail(email);

            if (user!= null)
            {
                var player = _userManager.Find(user.UserName, password);
                if (player != null)
                {
                    loginIsValid = true;
                }
            }

            return loginIsValid;
        }

        public void SetPlayerStatus(string id,string adId)
        {
            var user = _userManager.FindByName(id);

            if (!user.IsPlayed)
            {
                user.IsPlayed = true;
                AdvertisementRepository repo = new AdvertisementRepository();
                repo.AddClick(adId);
                _userManager.UpdateAsync(user);
            }
        }


        public Player FindUser(string email)
        {

            Player user = _userManager.FindByEmail(email);
            
            return user;
        }

        public bool ChangePassword(string email, string UpdatedPassword) {


           /* var provider = new DpapiDataProtectionProvider("GotChamp");
            _userManager.UserTokenProvider = new DataProtectorTokenProvider<Player>(provider.Create("TokenConfirmation"));
            */
            var provider = new MachineKeyProtectionProvider();

            _userManager.UserTokenProvider = new DataProtectorTokenProvider<Player>(provider.Create("ResetPasswordPurposes"));
           
            Player user = FindUser(email);

             var userToken = _userManager.GeneratePasswordResetToken(user.Id);
       
            var result = _userManager.ResetPassword(user.Id, userToken, UpdatedPassword);

            return result.Succeeded;

        }

        public void Dispose()
        {
            _context.Dispose();
            _userManager.Dispose();
        }
    }
}