import { Card, Avatar } from "antd";
import { ExpandAltOutlined } from "@ant-design/icons";
import { CouponProp } from "../../reducers/coupon";
import Link from "next/link";
import { defaultUrl } from "../../define";
const { Meta } = Card;
const CouponCard = (coupon: CouponProp) => {
  return (
    <Link href={defaultUrl + `coupon/${coupon.id}`}>
      <a>
        <Card style={{ backgroundColor: "#ffe5a9" }}>
          <div style={{ float: "right", color: "#423f3b" }}>2일 남음</div>
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={coupon.name}
            description={coupon.desc ? coupon.desc : "설명이 없습니다."}
          />
        </Card>
      </a>
    </Link>
  );
};
export default CouponCard;
