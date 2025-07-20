import { useEffect, useState } from "react";
import { Table, Button, Card, message as antdMessage } from "antd";
import { useNavigate } from "react-router-dom";

const SellerMessagePanel = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  // Mesajları çek
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          antdMessage.error("Lütfen giriş yapın.");
          return;
        }

        const res = await fetch(`${apiUrl}/api/messages`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Mesajlar yüklenemedi.");
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error(err);
        antdMessage.error("Mesajlar yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [apiUrl]);

  // Tablo sütunları
  const columns = [
    {
      title: "Gönderen",
      dataIndex: "sender",
      key: "sender",
      render: (sender) => (sender ? `${sender.username} (${sender.email})` : "Bilinmiyor"),
    },
    {
      title: "Mesaj",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Tarih",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleString(),
    },
  ];

  return (
    <Card title="Mesaj Paneli">
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => navigate("/seller/messages/new")}
      >
        Yeni Mesaj Gönder
      </Button>

      <Table
        dataSource={messages}
        columns={columns}
        rowKey="_id"
        loading={loading}
        locale={{ emptyText: "Mesaj bulunamadı" }}
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
};

export default SellerMessagePanel;
