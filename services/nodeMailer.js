const { EMAIL_USER, EMAIL_PASSWORD } = require("../config/env");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  });

module.exports = transporter