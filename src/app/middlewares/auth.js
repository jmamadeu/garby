const jwt = require("jsonwebtoken");
const authConfigs = require("../../configs/auth");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: ["Nenhum token informádo"],
      success: true
    });
  }

  const parts = authHeader.split(" ");

  if (!parts.length === 2) {
    return res.status(401).json({
      errors: ["Erro no Token"],
      success: false
    });
  }

  const [scheme, token] = parts;

  if (scheme !== "Bearer") {
    return res.status(401).json({
      errors: ["Token mal formado"],
      success: false
    });
  }

  jwt.verify(token, authConfigs.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        errors: ["Token inválido"]
      });
    }

    req.userId = decoded.id;
    return next();
  });
};
