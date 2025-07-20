import { Layout, Menu } from "antd";
import PropTypes from "prop-types";
import {
  LaptopOutlined,
  RollbackOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useNavigate, Outlet } from "react-router-dom";

const { Sider, Header, Content } = Layout;

const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.role : null;
};

const SellerLayout = () => {
  const navigate = useNavigate();
  const userRole = getUserRole();

  const menuItems = [
    {
      key: "1",
      icon: <LaptopOutlined />,
      label: "Ürünler",
      children: [
        {
          key: "2",
          label: "Ürün Listesi",
          path: "/seller/products",
          onClick: () => navigate("/seller/products"),
        },
        {
          key: "3",
          label: "Yeni Ürün Oluştur",
          path: "/seller/products/create",
          onClick: () => navigate("/seller/products/create"),
        },
      ],
    },
    {
      key: "4",
      icon: <ShoppingCartOutlined />,
      label: "Siparişler",
      path: "/seller/orders",
      onClick: () => navigate("/seller/orders"),
    },
    {
      key: "5",
      icon: <DashboardOutlined />,
      label: "Mesajlar",
      path: "/seller/messages", // Path düzeltildi
      onClick: () => navigate("/seller/messages"),
    },
    {
      key: "6",
      icon: <RollbackOutlined />,
      label: "Ana Sayfaya Git",
      onClick: () => (window.location.href = "/"),
    },
  ];

  const getActiveKey = () => {
    for (const item of menuItems) {
      if (item.children) {
        for (const child of item.children) {
          if (child.path === window.location.pathname) {
            return child.key;
          }
        }
      } else if (item.path === window.location.pathname) {
        return item.key;
      }
    }
    return null;
  };

  const getPageTitle = () => {
    for (const item of menuItems) {
      if (item.children) {
        for (const child of item.children) {
          if (child.path === window.location.pathname) {
            return child.label;
          }
        }
      } else if (item.path === window.location.pathname) {
        return item.label;
      }
    }
    return "Seller Paneli";
  };

  if (userRole === "seller") {
    return (
      <div className="seller-layout">
        <Layout style={{ minHeight: "100vh" }}>
          <Sider width={200} theme="dark">
            <Menu
              mode="vertical"
              style={{ height: "100%" }}
              items={menuItems}
              defaultSelectedKeys={[getActiveKey()]}
            />
          </Sider>
          <Layout>
            <Header style={{ background: "#001529", padding: "0 20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "white",
                }}
              >
                <h2>{getPageTitle()}</h2>
                <h2>Seller Paneli</h2>
              </div>
            </Header>
            <Content style={{ padding: "24px 50px", minHeight: 360 }}>
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  } else {
    window.location.href = "/";
    return null;
  }
};

SellerLayout.propTypes = {
  children: PropTypes.node,
};

export default SellerLayout;
