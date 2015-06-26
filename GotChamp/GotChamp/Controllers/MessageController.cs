using GotChamp.Domain;
using GotChamp.Models;
using GotChamp.Models.Email;
using GotChamp.Models.Email.DTOs;
using GotChamp.Models.Email.Exceptions;
using GotChamp.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Web.Http;

namespace GotChamp.Controllers
{
    [RoutePrefix("api/Message")]
    public class MessageController : ApiController
    {
        [AllowAnonymous]
        [HttpPost]
        [Route("Recover")]
        public IHttpActionResult post(RecoverDto dto) {
            // recovery procedures here
            if(dto == null) {
                //throw new NullDtoException();
                return InternalServerError();
            }

            AuthRepository repo = new AuthRepository();

            try { 
                int confirmationNumber = new RecoveryCode().generateCode();
                var data = repo.FindUser(dto.userEmail);

                if(data == null) {
                    return InternalServerError();
                }

                PlayerModel account = new PlayerModel()
                {
                    FirstName = data.FirstName,
                    LastName = data.LastName,
                    Email = data.Email
                };

                String Message = new EmailMessage(account).ParseRecover(confirmationNumber);
                String Header = MessageTemplate.MessageTitle;


                Email mail = new Email(Header, Message, account);
                mail.SendEmail();

                return Ok(confirmationNumber);
            } catch(Exception) {
                return InternalServerError();
            }
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("Combination")]
        public IHttpActionResult post(CombinationDto dto) { 
            if(dto == null) {
                return InternalServerError();
            }

            try {
                AuthRepository repo = new AuthRepository();
                var data = repo.FindUserByUserName(dto.UserName);

                if (data == null)
                {
                     data = repo.FindUser(dto.UserName);
                     dto.UserName = data.UserName;
                    if (dto.UserName == null)
                    {
                         return InternalServerError();
                    }
                }

                PlayerModel account = new PlayerModel()
                {
                    FirstName = data.FirstName,
                    LastName = data.LastName,
                    Email = data.Email
                };

                String Message = new EmailMessage(account).ParseCombination(dto.Combination);
                String Header = MessageTemplate.MessageTitle;


                Email mail = new Email(Header, Message, account);
                mail.SendEmail();

                return Ok();
            }
            catch (Exception) {
                return InternalServerError();
            }

        }

        private bool isEmail(string email) {
            Regex regex = new Regex("/^[0-9a-zA-Z]+([0-9a-zA-Z]*[-._+])*[0-9a-zA-Z]+@[0-9a-zA-Z]+([-.][0-9a-zA-Z]+)*([0-9a-zA-Z]*[.])[a-zA-Z]{2,6}$/");


            return regex.Match(email).Success;
        }
    }
}
