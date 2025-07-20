import { useEffect, useState } from "react";
import { Card, List, Input, Button, Tabs, message, Select, Tag, Spin } from "antd";

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

const MessagesPage = () => {
  const [inbox, setInbox] = useState([]);
  const [outbox, setOutbox] = useState([]);
  const [userList, setUserList] = useState([]);
  const [newMessage, setNewMessage] = useState({ to: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Test amaçlı kullanıcı (backend'deki gerçek ObjectId ile değiştir)
  const currentUser = { id: "SELLER_123", role: "seller" };
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/users`);
      if (!res.ok) throw new Error("Kullanıcı listesi alınamadı.");
      const data = await res.json();
      console.log("UserList:", data);
      setUserList(data);
    } catch (err) {
      console.error(err);
      message.error("Kullanıcı listesi alınamadı.");
      setError(true);
    }
  };

  const fetchMessages = async () => {
    setLoading(true);
    try {
      console.log("Inbox API:", `${apiUrl}/api/messages/inbox/${currentUser.id}`);
      const inboxRes = await fetch(`${apiUrl}/api/messages/inbox/${currentUser.id}`);
      console.log("Inbox Status:", inboxRes.status);
      const outboxRes = await fetch(`${apiUrl}/api/messages/outbox/${currentUser.id}`);
      console.log("Outbox Status:", outboxRes.status);

      const inboxData = await inboxRes.json();
      const outboxData = await outboxRes.json();
      console.log("Inbox Data:", inboxData);
      console.log("Outbox Data:", outboxData);

      setInbox(inboxData);
      setOutbox(outboxData);
    } catch (err) {
      console.error("Mesaj çekme hatası:", err);
      message.error("Mesajlar alınamadı.");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.to || !newMessage.content) {
      message.warning("Kime ve mesaj alanları boş bırakılamaz.");
      return;
    }
    try {
      const res = await fetch(`${apiUrl}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: currentUser.id,
          fromRole: currentUser.role,
          to: newMessage.to,
          content: newMessage.content,
        }),
      });
      console.log("POST Status:", res.status);
      if (!res.ok) throw new Error("Mesaj gönderilemedi.");
      message.success("Mesaj gönderildi!");
      setNewMessage({ to: "", content: "" });
      fetchMessages();
    } catch (err) {
      console.error(err);
      message.error("Mesaj gönderilemedi.");
    }
  };

  const getRoleTagColor = (role) => {
    switch (role) {
      case "admin": return "red";
      case "seller": return "blue";
      case "user": return "green";
      default: return "default";
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchMessages();
  }, []);

  if (loading) return <Spin tip="Yükleniyor..." style={{ marginTop: 50 }} />;
  if (error) return <div style={{ padding: "20px", color: "red" }}>Veri yüklenemedi. Konsolu kontrol et.</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mesajlar</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab={`Gelen Mesajlar (${inbox.length})`} key="1">
          <List
            dataSource={inbox}
            renderItem={(msg) => (
              <List.Item>
                <Card title={`Kimden: ${msg.from} (${msg.fromRole || ""})`}>{msg.content}</Card>
              </List.Item>
            )}
          />
        </TabPane>

        <TabPane tab={`Giden Mesajlar (${outbox.length})`} key="2">
          <List
            dataSource={outbox}
            renderItem={(msg) => (
              <List.Item>
                <Card title={`Kime: ${msg.to}`}>{msg.content}</Card>
              </List.Item>
            )}
          />
        </TabPane>

        <TabPane tab="Yeni Mesaj" key="3">
          <Select
            placeholder="Kime Seç"
            style={{ width: "100%", marginBottom: 10 }}
            value={newMessage.to || undefined}
            onChange={(val) => setNewMessage({ ...newMessage, to: val })}
            showSearch
            optionFilterProp="children"
          >
            {userList.map((user) => (
              <Option key={user._id} value={user.username}>
                {user.username} <Tag color={getRoleTagColor(user.role)}>{user.role}</Tag>
              </Option>
            ))}
          </Select>

          <TextArea
            rows={4}
            placeholder="Mesajınızı yazın"
            value={newMessage.content}
            onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
            style={{ marginBottom: 10 }}
          />
          <Button type="primary" onClick={sendMessage} block>
            Gönder
          </Button>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default MessagesPage;
