import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";
import AuthPage from "./pages/AuthPage";
import Auth from "./components/Auth/Auth"; // 🔹 Burada ekledik
import Success from "./pages/Success";



import "./App.css";
import UserPage from "./pages/Admin/UserPage";
import CategoryPage from "./pages/Admin/Categories/CategoryPage";
import UpdateCategoryPage from "./pages/Admin/Categories/UpdateCategoryPage";
import CreateCategoryPage from "./pages/Admin/Categories/CreateCategoryPage";
import CreateProductPage from "./pages/Admin/Products/CreateProductPage";
import ProductPage from "./pages/Admin/Products/ProductPage";
import UpdateProductPage from "./pages/Admin/Products/UpdateProductPage";
import CouponPage from "./pages/Admin/Coupons/CouponPage";
import CreateCouponPage from "./pages/Admin/Coupons/CreateCouponPage";
import UpdateCouponPage from "./pages/Admin/Coupons/UpdateCouponPage";
import OrderPage from "./pages/Admin/OrderPage";
import DashboardPage from "./pages/Admin/DashboardPage";

// Seller Pages
import SellerLayout from "./layouts/SellerLayout";
import SellerDashboardPage from "./pages/Seller/SellerDashboardPage";
import SellerOrdersPage from "./pages/Seller/SellerOrdersPage";
import ProductDetailsPage from "./pages/Seller/SellerProductsPage";
import CreateSellerProductPage from "./pages/Seller/CreateSellerProductPage";
import MessagesPage from "./pages/Seller/MessagesPage";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/success" element={<Success />} />
      <Route path="/account" element={<Auth />} /> {/* 🔹 Bunu ekle */}

      <Route path="/admin/*">
        <Route index element={<DashboardPage />} />
        <Route path="users" element={<UserPage />} />
        <Route path="categories" element={<CategoryPage />} />
        <Route path="categories/create" element={<CreateCategoryPage />} />
        <Route path="categories/update/:id" element={<UpdateCategoryPage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="products/create" element={<CreateProductPage />} />
        <Route path="products/update/:id" element={<UpdateProductPage />} />
        <Route path="coupons" element={<CouponPage />} />
        <Route path="coupons/create" element={<CreateCouponPage />} />
        <Route path="coupons/update/:id" element={<UpdateCouponPage />} />
        <Route path="orders" element={<OrderPage />} />
      </Route>

      <Route path="/seller/*" element={<SellerLayout />}>
        <Route index element={<SellerDashboardPage />} />
        <Route path="orders" element={<SellerOrdersPage />} />
        <Route path="products" element={<ProductDetailsPage />} /> {/* 🔹 Eklendi */}
        <Route path="products/create" element={<CreateSellerProductPage />} /> {/* Ekledik */}
        <Route path="messages" element={<MessagesPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default App;
