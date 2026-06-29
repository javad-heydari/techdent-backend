const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // 👤 patient name
    patientName: {
      type: String,
      required: true,
    },

    // 👨‍⚕️ doctor name
    doctorName: {
      type: String,
      required: true,
    },

    // 🦷 type of dental case
    caseType: {
      type: String,
      required: true,
    },

    // 🎨 shade color
    shade: {
      type: String,
    },

    // 🔢 quantity
    quantity: {
      type: Number,
      default: 1,
    },

    // 📊 status workflow
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed", "delivered"],
      default: "pending",
    },

    // 📅 due date
    dueDate: {
      type: Date,
    },

    // 📝 notes
    notes: {
      type: String,
    },

    // 👤 OWNER (important for ownership system)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);