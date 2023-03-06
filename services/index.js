require('dotenv').config()

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
    

      sendMail = async (email, subject, html) =>{
        await this.transporter.sendMail({
            to: email,
            subject,
            html: `<h2>${html}</h2>`
        })
      }

}


module.exports = new Service()