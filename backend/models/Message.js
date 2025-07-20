const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    from: { type: String, required: true }, // Kimden (UserID, SellerID, AdminID)
    fromRole: { type: String, enum: ["user", "seller", "admin"], required: true },
    to: { type: String, required: true },   // Kime (UserID, SellerID, AdminID)
    toRole: { type: String, enum: ["user", "seller", "admin"], required: true },
    content: { type: String, required: true }, // Mesaj içeriği
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
