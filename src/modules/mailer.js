const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const { host, port, user, pass } = require("../configs/mail");

const transport = nodemailer.createTransport({
  host,
  port,
  auth: {
    user,
    pass
  },
  tls: {
    servername: "smtp.mailtrap.io"
  }
});

transport.use(
  "compile",
  hbs({
    // viewEngine: "handlebars",
    // // viewPath: path.resolve(__dirname, "..", "resources", "mail"),
    // viewPath: path.resolve("./src/resources/mail/"),
    // extName: ".html"
    viewEngine: {
      extName: ".html",
      partialsDir: path.resolve("./src/resources/mail/"),
      layoutsDir: path.resolve("./src/resources/mail/")
    },
    viewPath: path.resolve("./src/resources/mail/"),
    extName: ".html"
  })
);

module.exports = transport;
