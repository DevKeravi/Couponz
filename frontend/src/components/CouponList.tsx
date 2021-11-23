import { Button, Col, Modal, Row, Form, Input, DatePicker, Upload } from "antd";
import Title from "antd/lib/typography/Title";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CouponCard from "../components/CouponCard";
import { UploadOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import {
  ADD_COUPON_FAILURE,
  ADD_COUPON_REQUEST,
  ADD_COUPON_SUCCESS,
  CouponProp,
  GET_COUPON_LIST_REQUEST,
  GET_COUPON_LIST_SUCCESS,
} from "../../reducers/coupon";
import { placeholdUrl } from "../../define";
import moment from "moment";

//추후 모달 분리
//모달 에러 관련부분 추가
//addCoupon 이미지 부분 추가
const CouponList = () => {
  const dispatch = useDispatch();

  // 추가용 변수
  const [couponName, setCouponName] = useState("");
  const [couponDesc, setCouponDesc] = useState("");
  const [couponSerial, setCouponSerial] = useState("");
  const [couponLimit, setCouponLimit] = useState("");

  const [addModalToogle, setAddModalToogle] = useState(false);
  const { couponList, getCouponListLoading, addCouponLoading } = useSelector(
    (state: any) => state.coupon
  );
  const today = moment();
  const useableCoupon = couponList.filter((coupon: CouponProp) => {
    const limitDay = moment(coupon.limit);
    if (limitDay.diff(today, "day") > 0 && !coupon.expired && !coupon.isUsed) {
      return true;
    }
    return false;
  });

  const expiredCoupon = couponList.filter((coupon: CouponProp) => {
    return coupon.expired && !coupon.isUsed;
  });
  const usedCoupon = couponList.filter((coupon: CouponProp) => {
    return coupon.isUsed;
  });

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

  const handleAddCouponSubmit = useCallback(
    (e) => {
      const tempCoupon: CouponProp = {
        id: uuidv4(),
        name: couponName,
        desc: couponDesc,
        serial: couponSerial,
        image_link: placeholdUrl + "1920x1080",
        limit: couponLimit,
        qty: 1,
        expired: false,
        isUsed: false,
        isPresent: false,
      };
      dispatch(ADD_COUPON_REQUEST());
      try {
        //서버로 전송
        setTimeout(() => {
          dispatch({ type: ADD_COUPON_SUCCESS.type, payload: tempCoupon });
          setAddModalToogle(false);
          setCouponName("");
          setCouponDesc("");
          setCouponSerial("");
          setCouponLimit("");
        }, 1000);
      } catch (error) {
        dispatch({ type: ADD_COUPON_FAILURE.type, payload: error });
      }
    },
    [couponName, couponDesc, couponSerial, couponLimit, dispatch]
  );

  // 이미지 파일 업로드
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
                <Input
                  onChange={(e: any) => {
                    setCouponName(e.target.value);
                  }}
                  required
                  placeholder="구분 잘되는 이름을 지어주세요."
                />
              </Form.Item>
              <Form.Item label="쿠폰 설명">
                <Input
                  onChange={(e: any) => {
                    setCouponDesc(e.target.value);
                  }}
                  placeholder="쿠폰의 설명을 적어주세요."
                />
              </Form.Item>
              <Form.Item label="쿠폰 번호">
                <Input
                  onChange={(e: any) => {
                    setCouponSerial(e.target.value);
                  }}
                  placeholder="쿠폰 번호를 입력해주세요."
                />
              </Form.Item>
              <Form.Item label="유효기간 설정">
                <DatePicker
                  onChange={(date: any) => {
                    setCouponLimit(date.format("YYYY-MM-DD"));
                  }}
                />
              </Form.Item>
            </Form>
          </Modal>
          <Button onClick={handleRefresh} loading={getCouponListLoading}>
            갱신하기
          </Button>
        </Col>
      </Row>
      {couponList.length === 0 ? (
        <Row gutter={16}>
          <Col>보유하신 쿠폰이 없습니다.</Col>
        </Row>
      ) : (
        <>
          <Row gutter={16}>
            <Col>사용 가능 쿠폰</Col>
          </Row>
          <Row gutter={16}>
            {useableCoupon.length !== 0 ? (
              useableCoupon.map((v: CouponProp) => (
                <Col key={v.id} xl={8} lg={12} xs={24}>
                  <CouponCard {...v} />
                </Col>
              ))
            ) : (
              <Col>사용 가능 한 쿠폰이 없습니다</Col>
            )}
          </Row>
          <Row gutter={16}>
            <Col>사용한 쿠폰</Col>
          </Row>
          <Row gutter={16}>
            {usedCoupon.length !== 0 ? (
              usedCoupon.map((v: CouponProp) => (
                <Col key={v.id} xl={8} lg={12} xs={24}>
                  <CouponCard {...v} />
                </Col>
              ))
            ) : (
              <Col>사용한 쿠폰이 없습니다.</Col>
            )}
          </Row>
          <Row gutter={16}>
            <Col>파기된 쿠폰</Col>
          </Row>
          <Row gutter={16}>
            {expiredCoupon.length !== 0 ? (
              expiredCoupon.map((v: CouponProp) => (
                <Col key={v.id} xl={8} lg={12} xs={24}>
                  <CouponCard {...v} />
                </Col>
              ))
            ) : (
              <Col>파기된 쿠폰이 없습니다.</Col>
            )}
          </Row>
        </>
      )}
    </div>
  );
};
export default CouponList;
