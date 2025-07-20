import { Form, Input, InputNumber, Button, message } from "antd";
import { useState } from "react";

const SellerProductCreate = () => {
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Backend alan adları ile aynı olduğuna dikkat et!
      const productData = {
        title: values.title,
        price: values.price,
        stock: values.stock,
      };

      console.log("Gönderilen Veri:", productData);

      const response = await fetch(`${apiUrl}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Ürün eklenemedi.");
      }

      const result = await response.json();
      message.success(`Ürün eklendi: ${result.title}`);
    } catch (error) {
      console.error("Ürün ekleme hatası:", error);
      message.error(error.message || "Ürün eklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Yeni Ürün Oluştur</h1>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ price: 0, stock: 0 }}
        style={{ maxWidth: 400 }}
      >
        <Form.Item
          name="title"
          label="Ürün Adı"
          rules={[{ required: true, message: "Ürün adı zorunludur!" }]}
        >
          <Input placeholder="Ürün adını girin" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Fiyat"
          rules={[{ required: true, message: "Fiyat zorunludur!" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={1}
            placeholder="Fiyat girin"
          />
        </Form.Item>

        <Form.Item
          name="stock"
          label="Stok"
          rules={[{ required: true, message: "Stok miktarı zorunludur!" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            placeholder="Stok miktarı girin"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Ürün Ekle
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SellerProductCreate;
