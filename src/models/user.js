/**
 * USER MODEL
 * Added refreshToken support for secure sessions
 */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // 🔐 STORE CURRENT REFRESH TOKEN
    refreshToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);