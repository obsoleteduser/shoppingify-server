const { EMAIL_USER, EMAIL_PASSWORD } = require("../config/env");

class Service{

     #transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASSWORD,
        },
      });
    

      sendMail = async (email, subject, html) =>{
        await this.transporter({
            to: email,
            subject,
            html: `<h2>${html}</h2>`
        })
      }

}


module.exports = new Service()