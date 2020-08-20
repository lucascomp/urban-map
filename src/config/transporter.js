const nodemailer = require('nodemailer');

const { EMAIL_HOST, EMAIL_PASS, EMAIL_USER } = process.env;

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

module.exports = transporter;
