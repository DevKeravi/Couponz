import { Button, Col, Modal, Row, Form, Input, DatePicker, Upload } from "antd";
import Title from "antd/lib/typography/Title";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CouponCard from "../components/CouponCard";
import { UploadOutlined } from "@ant-design/icons";
import {
  ADD_COUPON_REQUEST,
  CouponProp,
  GET_COUPON_LIST_REQUEST,
  GET_COUPON_LIST_SUCCESS,
} from "../../reducers/coupon";

//추후 모달 분리
//모달 에러 관련부분 추가
//addCoupon 이미지 부분 추가
const CouponList = () => {
  const dispatch = useDispatch();
  const [addModalToogle, setAddModalToogle] = useState(false);
  const { couponList, getCouponListLoading, addCouponLoading } = useSelector(
    (state: any) => state.coupon
  );

  const handleRefresh = useCallback(() => {
    dispatch(GET_COUPON_LIST_REQUEST());
    //실제 API 요청
    setTimeout(() => {
      dispatch(GET_COUPON_LIST_SUCCESS());
    }, 1000);
  }, []);

  const handleAddToogle = useCallback((toogle: boolean) => {
    setAddModalToogle(toogle);
  }, []);

  const handleAddCouponSubmit = useCallback((e) => {
    dispatch(ADD_COUPON_REQUEST());
  }, []);

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col>
          <Title>내 쿠폰 목록</Title>
        </Col>
        <Col>
          <Button
            onClick={() => {
              handleAddToogle(true);
            }}
            loading={addModalToogle}
          >
            추가하기
          </Button>
          <Modal
            className="addModal"
            title="쿠폰 추가"
            visible={addModalToogle}
            onCancel={() => {
              setAddModalToogle(false);
            }}
            onOk={handleAddCouponSubmit}
            okText="추가"
            cancelText="취소"
            confirmLoading={addCouponLoading}
          >
            <Form>
              <Form.Item
                name="upload"
                label="쿠폰 이미지"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                extra="쿠폰 이미지가 있으면 추가해주세요"
              >
                <Upload name="logo" action="/upload.do" listType="picture">
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>
              <Form.Item label="쿠폰 이름">
                <Input required placeholder="구분 잘되는 이름을 지어주세요." />
              </Form.Item>
              <Form.Item label="쿠폰 설명">
                <Input placeholder="쿠폰의 설명을 적어주세요." />
              </Form.Item>
              <Form.Item label="쿠폰 번호">
                <Input placeholder="쿠폰 번호를 입력해주세요." />
              </Form.Item>
              <Form.Item label="유효기간 설정">
                <DatePicker />
              </Form.Item>
            </Form>
          </Modal>
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
