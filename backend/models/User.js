const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    role: { type: String, default: "user", enum: ["user","seller","admin"] },
    avatar: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
