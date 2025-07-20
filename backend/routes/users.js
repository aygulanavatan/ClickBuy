const express = require("express");
const router = express.Router();
const User = require("../models/User.js");

// Tüm kullanıcıları getirme (Read - All)
router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});


// **Yeni kullanıcı ekleme (POST /api/users)**
router.post("/", async (req, res) => {
  try {
    const { username, role, email } = req.body;

    if (!username || !role || !email) {
      return res.status(400).json({ error: "Tüm alanlar zorunludur." });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Bu kullanıcı adı zaten mevcut." });
    }

    const newUser = new User({ username, role, email });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Kullanıcı ekleme hatası:", error);
    res.status(500).json({ error: "Kullanıcı eklenemedi." });
  }
});

// Kullanıcı silme (Delete)
router.delete("/:email", async (req, res) => {
  try {
    const email = req.params.email;

    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(deletedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
