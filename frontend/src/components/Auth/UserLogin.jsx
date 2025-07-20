import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import "./login.css";

const UserLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/auth/user-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        message.success("Kullanıcı girişi başarılı.");
        navigate("/");
      } else {
        message.error("Giriş başarısız.");
      }
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Kullanıcı Girişi</h2>
      <form id="login-form" className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="text" name="email" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Şifre</label>
          <input type="password" name="password" onChange={handleChange} required />
        </div>
        <button className="login-button" type="submit">Giriş Yap</button>
      </form>
    </div>
  );
};

export default UserLogin;
