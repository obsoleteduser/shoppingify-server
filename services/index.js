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
        try{
          await this.transporter.sendMail({
            to: email,
            subject,
            html: `
            <h1>Hi from Tahir's Shoppingify!</h1>
            <h2>This is your verification number:</h2>
            <h2>${code}</h2>`
        })
        }catch(err){
          console.log("Failed", err)
        }
      }

}


module.exports = new Service()