const bcrip = require("bcryptjs");
const crypto = require("crypto");

const User = require("../models/User");

const generateToken = require("../utils/generateToken");
const mailer = require("../../modules/mailer");

module.exports = {
  async resetPassword(req, res) {
    const { email, token, password } = req.body;

    try {
      let user = await User.findOne({ email }).select(
        "+passwordResetToken passwordResetExpires"
      );

      if (!user) {
        return res.status(400).json({
          success: false,
          errors: ["Usuário não encontrado"]
        });
      }

      if (token !== user.passwordResetToken) {
        return res.status(400).json({
          success: false,
          errors: ["Token inválido"]
        });
      }

      const now = new Date();

      if (now > user.passwordResetExpires) {
        return res.status(400).json({
          success: false,
          errors: ["Token expirado, gere um novo"]
        });
      }

      user.password = password;

      await user.save();

      return res.json({});
    } catch (err) {
      return res.status(400).json({
        errors: ["Erro na recuperação da password"]
      });
    }
  },

  async show(req, res) {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          success: false,
          errors: ["Usuário não encontrado"]
        });
      }

      let token = crypto.randomBytes(20).toString("hex");

      const now = new Date();
      now.setHours(now.getHours() + 1);

      await User.findByIdAndUpdate(user.id, {
        passwordResetToken: token,
        passwordResetExpires: now
      });

      mailer.sendMail(
        {
          to: email,
          from: "jmamadeu@gmail.com",
          template: "auth/forgot_password",
          context: { token }
        },
        err => {
          if (err) {
            return res.status(400).json({
              errors: ["Erro, tenta novamente "]
            });
          }

          return res.status(200).json({});
        }
      );
    } catch (err) {
      return res.status(400).json({
        success: false,
        errors: ["Erro no processo, tente novamente"]
      });
    }
  },

  async store(req, res) {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        errors: ["Usuário não encontrado"]
      });
    }

    const invalidPassword = await bcrip.compare(password, user.password);

    if (!invalidPassword) {
      return res.status(400).json({
        success: false,
        errors: ["Palavra passe inválida"]
      });
    }

    user.password = undefined;

    const token = generateToken.generate({ id: user.id });

    return res.json({ data: user, token, success: true });
  }
};
