import { Button, Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import CouponCard from "../components/CouponCard";
import {
  CouponProp,
  GET_COUPON_LIST_REQUEST,
  GET_COUPON_LIST_SUCCESS,
} from "../../reducers/coupon";

const CouponList = () => {
  const dispatch = useDispatch();
  const { couponList, getCouponListLoading } = useSelector(
    (state: any) => state.coupon
  );

  const handleRefresh = useCallback(() => {
    dispatch(GET_COUPON_LIST_REQUEST());
    //실제 API 요청
    setTimeout(() => {
      dispatch(GET_COUPON_LIST_SUCCESS());
    }, 1000);
  }, []);

  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col>
          <Title>내 쿠폰 목록</Title>
        </Col>
        <Col>
          <Button>추가하기</Button>
          <Button>선물하기</Button>
          <Button onClick={handleRefresh} loading={getCouponListLoading}>
            갱신하기
          </Button>
        </Col>
      </Row>
      <Row gutter={16}>
        {couponList[0].qty !== 0 ? (
          couponList.map((v: CouponProp) => (
            <Col key={v.id} xl={8} lg={12} xs={24}>
              <CouponCard {...v} />
            </Col>
          ))
        ) : (
          <Col>보유하신 쿠폰이 없습니다</Col>
        )}
      </Row>
    </div>
  );
};
export default CouponList;
