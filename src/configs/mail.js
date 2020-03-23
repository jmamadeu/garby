// module.exports = {
//   host: 'smtp.mailtrap.io',
//   port: 2525,
//   auth: {
//     user: 'f077847305ea9d',
//     pass: '25df5507cf48cb'
//   }
// };

module.exports = {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
};
