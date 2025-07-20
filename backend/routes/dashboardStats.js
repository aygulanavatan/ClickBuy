const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

router.get("/stats", async (req, res) => {
  try {
    // Ürün sayısı
    const totalProducts = await Product.countDocuments();

    // Kullanıcı sayısı (role: user)
    const totalCustomers = await User.countDocuments({ role: "user" });

    // Siparişlerden toplam gelir
    const orders = await Order.find();

    console.log("=== [DEBUG] Orders Found ===");
    orders.forEach((order) => {
      console.log(
        `Order ID: ${order._id}, Amount: ${order.amount}, Created At: ${order.createdAt}`
      );
    });

    const totalRevenue = orders.reduce(
      (sum, order) => sum + (order.amount || 0),
      0
    );

    console.log("=== [DEBUG] Calculated Total Revenue ===");
    console.log(totalRevenue);

    res.json({
      totalProducts,
      totalCustomers,
      totalRevenue,
      monthlySales: [],
      monthlyCustomers: [],
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ error: "Dashboard verileri alınamadı." });
  }
});

module.exports = router;
