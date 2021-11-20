import { Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import CouponCard from "../components/CouponCard";
const CouponList = () => {
  return (
    <div className="site-card-wrapper">
      <Row>
        <Title>내 쿠폰 목록</Title>
      </Row>
      <Row gutter={16}>
        <Col md={8} xs={24}>
          <CouponCard />
        </Col>
        <Col md={8} xs={24}>
          <CouponCard />
        </Col>
        <Col md={8} xs={24}>
          <CouponCard />
        </Col>
      </Row>
    </div>
  );
};
export default CouponList;
