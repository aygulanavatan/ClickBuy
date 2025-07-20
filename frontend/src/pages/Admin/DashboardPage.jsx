import { Row, Col, Card, Statistic, message } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    monthlySales: [],
    monthlyCustomers: [],
  });
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // Hedef aylar: Mayıs, Haziran, Temmuz
  const targetMonths = ["Mayıs", "Haziran", "Temmuz"];

  // Verileri Mayıs-Haziran-Temmuz formatına uydur
  const mapToTargetMonths = (data, key) => {
    return targetMonths.map((month) => {
      const found = data?.find((item) => item.name === month);
      return {
        name: month,
        [key]: found ? found[key] : 0,
      };
    });
  };

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/dashboard/stats`);
      if (!res.ok) throw new Error("Dashboard verisi alınamadı");

      const data = await res.json();
      console.log("Dashboard verisi:", data);

      setStats({
        totalProducts: data.totalProducts || 0,
        totalCustomers: data.totalCustomers || 0,
        totalRevenue: data.totalRevenue || 0,
        monthlySales: mapToTargetMonths(data.monthlySales, "satilanUrunSayisi"),
        monthlyCustomers: mapToTargetMonths(data.monthlyCustomers, "musteriSayisi"),
      });
    } catch (err) {
      console.error("Fetch hatası:", err);
      message.error("Dashboard verileri alınamadı.");
      // API hatası durumunda boş değerlerle Mayıs-Haziran-Temmuz
      setStats({
        totalProducts: 0,
        totalCustomers: 0,
        totalRevenue: 0,
        monthlySales: mapToTargetMonths([], "satilanUrunSayisi"),
        monthlyCustomers: mapToTargetMonths([], "musteriSayisi"),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [apiUrl]);

  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card loading={loading}>
            <Statistic title="Toplam Ürün Sayısı" value={stats.totalProducts} />
          </Card>
        </Col>
        <Col span={8}>
          <Card loading={loading}>
            <Statistic title="Toplam Müşteri Sayısı" value={stats.totalCustomers} />
          </Card>
        </Col>
        <Col span={8}>
          <Card loading={loading}>
            <Statistic title="Toplam Gelir" value={stats.totalRevenue} prefix="$" />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: "20px" }}>
        <h2>Son Aydaki Ürün Satış Artışı</h2>
        <LineChart
          width={600}
          height={300}
          data={stats.monthlySales}
          margin={{ top: 5, right: 30, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="satilanUrunSayisi"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </Card>

      <Card style={{ marginTop: "20px" }}>
        <h2>Son Aydaki Müşteri Artışı</h2>
        <LineChart
          width={600}
          height={300}
          data={stats.monthlyCustomers}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="musteriSayisi"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </Card>
    </div>
  );
};

export default DashboardPage;
