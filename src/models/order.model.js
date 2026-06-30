const mongoose = require("mongoose");

/**
 * ORDER MODEL
 * - Handles dental orders
 * - Includes ownership system
 */

const orderSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
      trim: true,
    },

    doctorName: {
      type: String,
      required: true,
      trim: true,
    },

    caseType: {
      type: String,
      required: true,
      trim: true,
    },

    shade: {
      type: String,
      default: null,
    },

    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },

    status: {
      type: String,
      enum: ["pending", "in_progress", "completed", "delivered"],
      default: "pending",
    },

    dueDate: {
      type: Date,
      default: null,
    },

    notes: {
      type: String,
      default: "",
    },

    // 🔥 ownership (CRITICAL)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);