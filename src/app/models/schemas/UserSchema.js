const mongoose = require("mongoose");

const bcrip = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    passwordResetToken: {
      type: String,
      select: false
    },
    passwordResetExpires: {
      type: Date,
      select: false
    }
  },
  { timestamps: true }
);

UserSchema.pre("save", async function(next) {
  this.password = await bcrip.hash(this.password, 10);
});

module.exports = mongoose.model("User", UserSchema);
