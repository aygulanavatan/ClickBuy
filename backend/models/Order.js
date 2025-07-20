const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
    amount: { type: Number, default: 0 },
    status: { type: String, default: "pending" },
    address: { type: String },
    paymentStatus: { type: String, default: "pending" },
    trackingNumber: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Hazırlanıyor", "Dağıtımda", "Teslim Edildi"],
      default: "Hazırlanıyor",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
