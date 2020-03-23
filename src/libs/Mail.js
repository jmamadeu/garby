const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const mailConfig = require('../configs/mail');

const transport = nodemailer.createTransport(mailConfig);

transport.use(
  'compile',
  hbs({
    // viewEngine: "handlebars",
    // // viewPath: path.resolve(__dirname, "..", "resources", "mail"),
    // viewPath: path.resolve("./src/resources/mail/"),
    // extName: ".html"
    viewEngine: {
      extName: '.html',
      partialsDir: path.resolve('./src/resources/mail/'),
      layoutsDir: path.resolve('./src/resources/mail/')
    },
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html'
  })
);

module.exports = transport;
