import type { AppProps } from "next/app";
import "antd/dist/antd.css";
import { Button, Col, Image, Layout, Menu, Row, Typography } from "antd";
import Link from "next/link";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import "../styles/index.scss";
import { SSRProvider } from "@react-aria/ssr";
import wrapper from "../store/configureStore";
import Text from "antd/lib/typography/Text";
import { useSelector } from "react-redux";
import {
  GET_USER_DATA_FAILURE,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
} from "../reducers/user";
import axios from "axios";
import { defaultAPIUrl } from "../define";

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
const { SubMenu } = Menu;

function MyApp({ Component, pageProps }: AppProps) {
  const { userData } = useSelector((state: any) => state.user);
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
          <Menu theme="light" mode="inline">
            {userData.name !== "" ? (
              <Menu.Item key="userName" icon={<UserOutlined />}>
                {userData.name}
              </Menu.Item>
            ) : (
              <Menu.Item key="signIn" icon={<UserOutlined />}>
                <Link href="/user/login" passHref>
                  <a>계정 연결</a>
                </Link>
              </Menu.Item>
            )}
            <SubMenu title="쿠폰" icon={<UserOutlined />}>
              <Menu.Item key="couponList">
                <Link href="/coupon/list" passHref>
                  <a>내 쿠폰 목록</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="couponPresent">
                <Link href="/coupon/present" passHref>
                  <a>선물 하기</a>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu title="쿠폰 마켓" icon={<VideoCameraOutlined />}>
              <Menu.Item key="buyCoupon">
                <Link href="/market/buy">
                  <a>구매 하기</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="sellCoupon">
                <Link href="/market/sell">
                  <a>판매 하기</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="shareCoupon">
                <Link href="/market/share">
                  <a>나눔 하기</a>
                </Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="friends" icon={<UploadOutlined />}>
              친구
            </Menu.Item>
            <Menu.Item key="myProfile" icon={<UserOutlined />}>
              내 정보
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className="site-layout-sub-header-background">
            <Row justify="center">
              <Col>
                <Text>CouponZ</Text>
              </Col>
            </Row>
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
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ res, req }) => {
      store.dispatch(GET_USER_DATA_REQUEST());

      try {
        const resp = await axios.get(defaultAPIUrl + "user");
        store.dispatch({
          type: GET_USER_DATA_SUCCESS.type,
          payload: resp.data,
        });
      } catch (error) {
        store.dispatch({ type: GET_USER_DATA_FAILURE.type, payload: error });
      }

      return { props: {} };
    }
);
export default wrapper.withRedux(MyApp);
