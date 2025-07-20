const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");

router.get("/stats", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalCustomers = await User.countDocuments();
    const totalRevenueResult = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalRevenue =
      totalRevenueResult.length > 0 ? totalRevenueResult[0].total : 0;

    const months = [
      "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
      "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
    ];

    // **Aylık satışlar**
    const monthlySalesAgg = await Order.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          satilanUrunSayisi: { $sum: "$products.quantity" },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    const monthlySales = monthlySalesAgg.map((item) => ({
      name: months[item._id.month - 1],
      satilanUrunSayisi: item.satilanUrunSayisi || 0,
    }));

    // **Aylık müşteriler**
    const monthlyCustomersAgg = await User.aggregate([
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          musteriSayisi: { $sum: 1 },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    const monthlyCustomers = monthlyCustomersAgg.map((item) => ({
      name: months[item._id.month - 1],
      musteriSayisi: item.musteriSayisi || 0,
    }));

    res.status(200).json({
      totalProducts,
      totalCustomers,
      totalRevenue,
      monthlySales,
      monthlyCustomers,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ error: "Dashboard verileri alınamadı." });
  }
});

module.exports = router;
