using GotChamp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace GotChamp.Models.Email
{
    public class Email
    {
        public string smtpCLient { get; private set; }
        public string EmailTo { get; private set; }
        public string EMailFrom { get; private set; }
        public string Header { get; private set; }
        public string Message { get; private set; }
        private SmtpClient emailSender = new SmtpClient();
        private MailMessage messageContent = new MailMessage();
        public PlayerModel account { get; private set; }
        //private string userName = "";
        //private string passWord = "";

        public Email(string header, string message, PlayerModel account)
        {
            this.account = account;

            this.EMailFrom = Convert.ToString(EmailServiceCred.Username);
            this.EmailTo = this.account.Email;
            this.Header = header;
            this.Message = message;
        }

        public bool SendEmail() {

            try
            {
                messageContent.To.Add(this.EmailTo);
                messageContent.From = new MailAddress(this.EMailFrom);
                messageContent.IsBodyHtml = true;
                messageContent.Body = this.Message;
                messageContent.Subject = this.Header;

                emailSender.Host = Convert.ToString(EmailServiceCred.OutgoingServer);
                emailSender.Port = Convert.ToInt32(EmailServiceCred.AnonymousPort);
                emailSender.UseDefaultCredentials = false;
                //emailSender.EnableSsl = true;
                emailSender.Credentials = new System.Net.NetworkCredential(Convert.ToString(EmailServiceCred.Username), Convert.ToString(EmailServiceCred.Password));
                emailSender.Send(messageContent);
                return true;
            } 
            catch(Exception) {
                return false;
            }
        }
    }
}
