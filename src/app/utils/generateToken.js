const jwt = require("jsonwebtoken");

const authConfig = require("../../configs/auth");

module.exports = {
  generate(params = {}) {
    const token = jwt.sign({ id: params.id }, authConfig.secret, {
      expiresIn: 864000
    });

    return token;
  }
};
