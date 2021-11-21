import { Row, Col, Image, Typography, Button } from "antd";
import { useSelector } from "react-redux";
import { placeholdUrl } from "../../define";
import {
  GET_COUPON_DETAIL_REQUEST,
  GET_COUPON_DETAIL_SUCCESS,
  GET_COUPON_LIST_FAILURE,
} from "../../reducers/coupon";
import wrapper from "../../store/configureStore";
const { Text, Title } = Typography;

const CouponDetail = () => {
  const { couponDetail } = useSelector((state: any) => state.coupon);
  return (
    <>
      <Row justify="end">
        <Button>목록으로</Button>
      </Row>
      <Row justify="center">
        <Col>
          <Image
            src={
              couponDetail.image_link !== undefined
                ? couponDetail.image_link
                : placeholdUrl + "500x500"
            }
            alt={couponDetail.name}
            width={240}
          />
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Text>{couponDetail.name}</Text>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Text>{couponDetail.desc}</Text>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Text>{couponDetail.serial}</Text>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Text>{couponDetail.qty}</Text>
        </Col>
      </Row>

      <Row justify="center">
        {couponDetail.isUsed || couponDetail.expired ? (
          <Col>
            <Row justify="center">
              <Text type="danger">사용 됬거나 만료된 쿠폰 입니다.</Text>
            </Row>
            <Row justify="center">
              <Button>삭제 하기</Button>
            </Row>
          </Col>
        ) : (
          <Col>
            <Button>사용</Button>
            <Button>수정</Button>
            <Button>삭제</Button>
          </Col>
        )}
      </Row>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, params }) => {
      try {
        store.dispatch({
          type: GET_COUPON_DETAIL_REQUEST.type,
        });
        store.dispatch({
          type: GET_COUPON_DETAIL_SUCCESS.type,
          payload: params?.id,
        });
      } catch (error) {
        store.dispatch({
          type: GET_COUPON_LIST_FAILURE.type,
          payload: error,
        });
      }
      return { props: {} };
    }
);
export default CouponDetail;
