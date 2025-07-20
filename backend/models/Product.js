const mongoose = require("mongoose");

// Ürün değerlendirme (Review) alt şeması
const ReviewSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    rating: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true } // Her yorum için createdAt ve updatedAt eklenir
);

// Ürün ana şeması
const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    img: [{ type: String, required: true }],
    reviews: [ReviewSchema],
    colors: [{ type: String, required: true }],
    sizes: [{ type: String, required: true }],
    price: {
      current: { type: Number, required: true },
      discount: { type: Number },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: { type: String, required: true },
  },
  { timestamps: true } // Ürünler için createdAt ve updatedAt eklenir
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
