using GotChamp.Models;
using GotChamp.Models.Email;
using GotChamp.Models.Email.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GotChamp.Models.Email
{
    public class EmailMessage
    {
        private PlayerModel account;

        public string Message { get; private set; }
        public string Name { get; private set; }

        public EmailMessage(PlayerModel account)
        {
            if(account == null) {
                throw new NullAccountException();
            }
            this.account = account;
            this.Name = account.FirstName + " " + account.LastName;
            this.Message = "";
        }

      

        //public string ParseMessage(MessageType message) {
        //    if(message.Equals(MessageType.Confirmation)) {
        //        return this.ParseNotify();
        //    }
        //    if(message.Equals(MessageType.Recovery)) {
        //        return this.ParseRecover();
        //    }
        //    if(message.Equals(MessageType.Combination)) {
        //        return this.ParseCombination();
        //    }

        //    return "";
        //}

        public string ParseCombination(String combination) {
            // Parse Message here
            this.Message += MessageTemplate.MessageOpen.ToString() + "";
            this.Message += MessageTemplate.MessageHeaderOpen.ToString() + "";
            this.Message += this.Name + "";
            this.Message += MessageTemplate.MessageHeaderClose.ToString() + "";
            this.Message += MessageTemplate.MessageCombination + "";
            this.Message += combination;
            this.Message += MessageTemplate.MessageClose.ToString() + "";

            return this.Message;
        }

        public string ParseNotify() {
            this.Message += MessageTemplate.MessageOpen.ToString() + "";
            this.Message += MessageTemplate.MessageHeaderOpen.ToString() + "";
            this.Message += this.Name + "";
            this.Message += MessageTemplate.MessageHeaderClose.ToString() + "";
            this.Message += MessageTemplate.MessageNotify + "";
            this.Message += MessageTemplate.MessageClose.ToString() + "";
            
            return this.Message;
        }

        public string ParseRecover(int confirmationCode) {
            // Parse Message here
            this.Message += MessageTemplate.MessageOpen.ToString() + "";
            this.Message += MessageTemplate.MessageHeaderOpen.ToString() + "";
            this.Message += this.Name + "";
            this.Message += MessageTemplate.MessageHeaderClose.ToString() + "";
            this.Message += MessageTemplate.MessageRecover + "";
            this.Message += Convert.ToString(confirmationCode);
            this.Message += MessageTemplate.MessageClose.ToString() + "";

            return this.Message;
        }

    }
}
