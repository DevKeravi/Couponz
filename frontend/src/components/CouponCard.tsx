import { Card, Avatar } from "antd";
import { ExpandAltOutlined } from "@ant-design/icons";
const { Meta } = Card;
const CouponCard = () => {
  return (
    <Card style={{ backgroundColor: "#ffe5a9" }}>
      <div style={{ float: "right", color: "#423f3b" }}>2일 남음</div>
      <Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title="Vips 쿠폰"
        description="빕스 스테이크 5000원 할인"
      />
    </Card>
  );
};
export default CouponCard;
