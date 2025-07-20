import { useEffect, useState } from "react";
import { Table, Input, Select, Button, message, Tag, Space, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { Option } = Select;

const SellerOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingNumber, setTrackingNumber] = useState("");
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // Siparişleri backend'den çek
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/orders`);
      if (!res.ok) throw new Error("Siparişler alınamadı.");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
      message.error("Sipariş verileri alınırken hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  // Kargo takip numarasını güncelle
  const updateTrackingNumber = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/orders/${selectedOrder._id}/tracking`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackingNumber }),
      });
      if (!res.ok) throw new Error("Kargo takip numarası güncellenemedi.");
      message.success("Kargo takip numarası güncellendi.");
      setIsTrackingModalOpen(false);
      setTrackingNumber("");
      fetchOrders();
    } catch (err) {
      console.error(err);
      message.error("Kargo takip numarası güncellenemedi.");
    }
  };

  // Sipariş durumunu güncelle
  const updateOrderStatus = async (orderId, status) => {
    try {
      const res = await fetch(`${apiUrl}/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Sipariş durumu güncellenemedi.");
      message.success("Sipariş durumu güncellendi.");
      fetchOrders();
    } catch (err) {
      console.error(err);
      message.error("Sipariş durumu güncellenemedi.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Sipariş durumuna göre renk belirleme
  const getStatusColor = (status) => {
    switch (status) {
      case "Hazırlanıyor":
        return "orange";
      case "Dağıtımda":
        return "blue";
      case "Teslim Edildi":
        return "green";
      default:
        return "default";
    }
  };

  const columns = [
    {
      title: "Sipariş ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Müşteri",
      dataIndex: "user",
      key: "user",
      render: (user) => user?.username || "Bilinmiyor",
    },
    {
      title: "Ürünler",
      dataIndex: "products",
      key: "products",
      render: (products) =>
        products.map((p) => `${p.product?.name} (x${p.quantity})`).join(", "),
    },
    {
      title: "Kargo Takip No",
      key: "trackingNumber",
      render: (_, record) => (
        <Space>
          {record.trackingNumber ? (
            <span>{record.trackingNumber}</span>
          ) : (
            <Tag color="red">Yok</Tag>
          )}
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedOrder(record);
              setTrackingNumber(record.trackingNumber || "");
              setIsTrackingModalOpen(true);
            }}
          >
            Güncelle
          </Button>
        </Space>
      ),
    },
    {
      title: "Durum",
      key: "status",
      render: (_, record) => (
        <Select
          value={record.status || "Hazırlanıyor"}
          style={{ width: 150 }}
          onChange={(value) => updateOrderStatus(record._id, value)}
        >
          <Option value="Hazırlanıyor">Hazırlanıyor</Option>
          <Option value="Dağıtımda">Dağıtımda</Option>
          <Option value="Teslim Edildi">Teslim Edildi</Option>
        </Select>
      ),
    },
    {
      title: "Durum Etiketi",
      dataIndex: "status",
      key: "statusTag",
      render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
    },
  ];

  return (
    <div>
      <h1>Siparişlerim</h1>
      <Table
        dataSource={orders}
        columns={columns}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      {/* Kargo Takip Numarası Güncelleme Modalı */}
      <Modal
        title="Kargo Takip Numarası Güncelle"
        open={isTrackingModalOpen}
        onCancel={() => setIsTrackingModalOpen(false)}
        onOk={updateTrackingNumber}
        okText="Kaydet"
        cancelText="İptal"
      >
        <Input
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          placeholder="Kargo takip numarası girin"
        />
      </Modal>
    </div>
  );
};

export default SellerOrdersPage;
