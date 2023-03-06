const { EMAIL_USER, EMAIL_PASSWORD } = require("../config/env");
const nodemailer = require('nodemailer')

class Service{

     transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASSWORD,
        },
      });
    

      sendMail = async (email, subject, code) =>{
        await this.transporter.sendMail({
            to: email,
            subject,
            html: `
            <h1>This is your verification number:</h1>
            <h2>${code}</h2>`
        })
      }

}


module.exports = new Service()