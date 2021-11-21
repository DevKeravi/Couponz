import type { AppProps } from "next/app";
import "antd/dist/antd.css";
import { Image, Layout, Menu, Typography } from "antd";
import Link from "next/link";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import "../styles/index.scss";
import { SSRProvider } from "@react-aria/ssr";
import wrapper from "../store/configureStore";

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <Layout>
        <Sider theme="light" breakpoint="lg" collapsedWidth="0">
          <Link href="/" passHref>
            <a>
              <div
                style={{
                  height: "32px",
                  margin: "16px",
                  backgroundColor: "#e5e5e5",
                }}
              ></div>
            </a>
          </Link>
          <Menu theme="light" mode="inline" defaultSelectedKeys={["4"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link href="/coupon/list" passHref>
                <a>내 쿠폰</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              쿠폰 마켓
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              친구
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>
              내 정보
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            className="site-layout-sub-header-background"
            style={{ padding: 0, textAlign: "center" }}
          >
            <Title>CouponZ</Title>
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Component {...pageProps} />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            CouponZ ©2021 Created by Keravi
          </Footer>
        </Layout>
      </Layout>
    </SSRProvider>
  );
}

export default wrapper.withRedux(MyApp);
