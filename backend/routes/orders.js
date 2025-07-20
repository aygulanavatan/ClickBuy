const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// **Yeni sipariş oluştur (POST /api/orders)**
router.post("/", async (req, res) => {
  try {
    const { user, products, amount, address, paymentStatus } = req.body;

    // Gönderilen veriyi kontrol et
    if (!user || !products || products.length === 0) {
      return res
        .status(400)
        .json({ error: "Kullanıcı veya ürün bilgisi eksik." });
    }

    // Yeni siparişi oluştur
    const newOrder = new Order({
      user,
      products,
      amount,
      address: address || "Belirtilmedi",
      paymentStatus: paymentStatus || "pending",
      trackingNumber: "", // Varsayılan olarak boş
      status: "Hazırlanıyor", // Varsayılan durum
    });

    // Siparişi kaydet
    const savedOrder = await newOrder.save();
    console.log("Yeni sipariş eklendi:", savedOrder);

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Order create error:", error);
    res.status(500).json({ error: "Sipariş oluşturulamadı." });
  }
});

// **Tüm siparişleri getir (GET /api/orders)**
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "username email")
      .populate("products.product", "name price");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Order fetch error:", error);
    res.status(500).json({ error: "Siparişler alınamadı." });
  }
});

// **Kargo takip numarası ekle/güncelle (PATCH /api/orders/:id/tracking)**
router.patch("/:id/tracking", async (req, res) => {
  try {
    const { trackingNumber } = req.body;
    if (!trackingNumber) {
      return res.status(400).json({ error: "Takip numarası zorunludur." });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { trackingNumber },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Sipariş bulunamadı." });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Tracking update error:", error);
    res.status(500).json({ error: "Kargo takip numarası güncellenemedi." });
  }
});

// **Sipariş durumunu güncelle (PATCH /api/orders/:id/status)**
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["Hazırlanıyor", "Dağıtımda", "Teslim Edildi"];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ error: "Geçersiz sipariş durumu." });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Sipariş bulunamadı." });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Status update error:", error);
    res.status(500).json({ error: "Sipariş durumu güncellenemedi." });
  }
});

module.exports = router;
