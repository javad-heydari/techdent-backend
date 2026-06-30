/**
 * AUTH CONTROLLER (PRODUCTION READY - CLEAN & SAFE)
 */

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

/**
 * Generate JWT Tokens
 * - accessToken: کوتاه مدت
 * - refreshToken: بلند مدت
 */
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "30m",
    }
  );

  const refreshToken = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES || "7d",
    }
  );

  return { accessToken, refreshToken };
};

/**
 * REGISTER USER
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 🔍 check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // 🔐 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 👤 create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    // 🔑 generate tokens
    const tokens = generateTokens(user);

    // 💾 save refresh token
    user.refreshToken = tokens.refreshToken;
    await user.save();

    return res.status(201).json({
      success: true,
      message: "User created",
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * LOGIN USER
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 🔐 compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 🔑 generate tokens
    const tokens = generateTokens(user);

    // 💾 update refresh token
    user.refreshToken = tokens.refreshToken;
    await user.save();

    return res.status(200).json({
      success: true,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * REFRESH TOKEN
 */
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token required",
      });
    }

    // 🔐 verify refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    // 🔑 generate new tokens
    const tokens = generateTokens(user);

    user.refreshToken = tokens.refreshToken;
    await user.save();

    return res.status(200).json({
      success: true,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
};

/**
 * LOGOUT USER
 */
exports.logout = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};