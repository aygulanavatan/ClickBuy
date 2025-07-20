const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const User = require("../models/User"); // Kullanıcı doğrulaması için

// **Yeni mesaj oluştur (POST /api/messages)**
router.post("/", async (req, res) => {
  try {
    const { from, fromRole, to, toRole, content } = req.body;

    if (!from || !to || !content) {
      return res.status(400).json({ error: "Kimden, Kime ve Mesaj alanları zorunludur." });
    }

    // Gönderen ve alıcı kontrolü (username üzerinden)
    const sender = await User.findOne({ username: from });
    const receiver = await User.findOne({ username: to });

    if (!sender) return res.status(404).json({ error: "Gönderen kullanıcı bulunamadı." });
    if (!receiver) return res.status(404).json({ error: "Alıcı kullanıcı bulunamadı." });

    const newMessage = new Message({
      from,
      fromRole: fromRole || sender.role, // Gönderenin rolü
      to,
      toRole: toRole || receiver.role,   // Alıcının rolü
      content,
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error("Mesaj gönderme hatası:", error);
    res.status(500).json({ error: "Mesaj gönderilemedi." });
  }
});

// **Gelen mesajlar (GET /api/messages/inbox/:username)**
router.get("/inbox/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const messages = await Message.find({ to: username }).sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Inbox fetch error:", error);
    res.status(500).json({ error: "Gelen mesajlar alınamadı." });
  }
});

// **Giden mesajlar (GET /api/messages/outbox/:username)**
router.get("/outbox/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const messages = await Message.find({ from: username }).sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Outbox fetch error:", error);
    res.status(500).json({ error: "Giden mesajlar alınamadı." });
  }
});

module.exports = router;
