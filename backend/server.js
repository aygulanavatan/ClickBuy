const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const logger = require("morgan");

const mainRoute = require("./routes/index.js");
const dashboardRoute = require("./routes/dashboard");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const messageRoutes = require("./routes/messages");

const app = express();
dotenv.config();

const port = process.env.PORT || 5000;

// Middleware'ler
app.use(logger("dev"));
app.use(express.json());
app.use(cors());

// MongoDB bağlantısı
const connect = async () => {
  try {
    console.log("MongoDB'ye bağlanılıyor...");
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB bağlantı hatası:", error.message);
    process.exit(1); // Bağlantı hatası durumunda uygulamayı kapat
  }
};

// **Health Check Route**
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server çalışıyor!" });
});

// Routes
app.use("/api", mainRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/messages", messageRoutes);

// Sunucuyu başlat
app.listen(port, () => {
  connect();
  console.log(`Sunucu ${port} portunda çalışıyor.`);
});
