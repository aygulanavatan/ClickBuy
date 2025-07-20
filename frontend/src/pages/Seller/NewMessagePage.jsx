import { useEffect, useState } from "react";
import { Form, Input, Button, Select, message as antdMessage, Card } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const NewMessagePage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // Kullanıcı listesini çek
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/users`);
        if (!res.ok) throw new Error("Kullanıcılar alınamadı.");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
        antdMessage.error("Kullanıcı listesi yüklenemedi.");
      }
    };

    fetchUsers();
  }, [apiUrl]);

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        antdMessage.error("Lütfen giriş yapın.");
        return;
      }

      const res = await fetch(`${apiUrl}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiver: values.receiver,
          message: values.message,
        }),
      });

      if (!res.ok) throw new Error("Mesaj gönderilemedi.");
      antdMessage.success("Mesaj başarıyla gönderildi!");
      navigate("/seller/messages");
    } catch (err) {
      console.error(err);
      antdMessage.error("Mesaj gönderilemedi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Yeni Mesaj Gönder" style={{ maxWidth: 600, margin: "0 auto" }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="receiver"
          label="Kime Gönderilecek?"
          rules={[{ required: true, message: "Alıcı seçin." }]}
        >
          <Select placeholder="Kullanıcı seçin">
            {users.map((user) => (
              <Option key={user._id} value={user._id}>
                {user.username} ({user.email})
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="message"
          label="Mesaj"
          rules={[{ required: true, message: "Mesajınızı yazın." }]}
        >
          <Input.TextArea rows={4} placeholder="Mesajınızı yazın..." />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Gönder
          </Button>
          <Button style={{ marginLeft: 10 }} onClick={() => navigate("/seller/messages")}>
            İptal
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default NewMessagePage;
