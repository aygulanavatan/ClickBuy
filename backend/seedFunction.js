const Customer = require("./models/Customer");
const Order = require("./models/Order");
const Product = require("./models/Product");

const insertDummyData = async () => {
  try {
    console.log("Dummy data ekleniyor...");

    // Verileri temizle
    await Customer.deleteMany();
    await Order.deleteMany();

    // Dummy customer ekle
    const customers = await Customer.insertMany([
      {
        name: "Ali Veli",
        email: "ali@example.com",
        phone: "5551112233",
        address: "İstanbul",
      },
      {
        name: "Ayşe Fatma",
        email: "ayse@example.com",
        phone: "5554445566",
        address: "Ankara",
      },
    ]);

    // Productları çek
    const products = await Product.find();

    if (products.length === 0) {
      console.log("Product bulunamadı, önce product ekleyin.");
      return;
    }

    // Dummy order ekle
    await Order.insertMany([
      {
        user: customers[0]._id,
        products: [{ product: products[0]._id, quantity: 2 }],
        amount: 240,
        status: "delivered",
        address: "İstanbul",
        paymentStatus: "paid",
        createdAt: new Date(2025, 0, 15),
      },
      {
        user: customers[1]._id,
        products: [{ product: products[1]._id, quantity: 1 }],
        amount: 120,
        status: "delivered",
        address: "Ankara",
        paymentStatus: "paid",
        createdAt: new Date(2025, 1, 10),
      },
    ]);

    console.log("Dummy data başarıyla eklendi!");
  } catch (error) {
    console.error("Dummy data ekleme hatası:", error);
  }
};

module.exports = insertDummyData;
