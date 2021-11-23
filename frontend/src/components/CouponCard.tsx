import {
  Input,
  Upload,
  Button,
  Col,
  Row,
  Card,
  Avatar,
  Modal,
  Image,
  Form,
  DatePicker,
  Tooltip,
} from "antd";
import { v4 as uuidv4 } from "uuid";
import {
  CouponProp,
  EDIT_COUPON_REQUEST,
  EDIT_COUPON_FAILURE,
  EDIT_COUPON_SUCCESS,
  DELETE_COUPON_REQUEST,
  DELETE_COUPON_SUCCESS,
  DELETE_COUPON_FAILURE,
} from "../../reducers/coupon";
import { placeholdUrl } from "../../define";
import {
  CloseOutlined,
  ExpandOutlined,
  CheckOutlined,
  UploadOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import { useCallback, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
const { Meta } = Card;

const RowWrapper = styled(Row)`
  margin-top: 0.5rem;
`;

const CouponCard = (coupon: CouponProp) => {
  const [showmore, setShowmore] = useState(false);
  const [toogleEdit, setToogleEdit] = useState(false);
  const [couponName, setCouponName] = useState(coupon.name);
  const [couponDesc, setCouponDesc] = useState(coupon.desc);
  const [couponSerial, setCouponSerial] = useState(coupon.serial);
  const [couponLimit, setCouponLimit] = useState(coupon.limit);
  const dispatch = useDispatch();
  const { editCouponLoading } = useSelector((state: any) => state.coupon);
  const today = moment();
  const limitDay = moment(coupon.limit);
  const dayLeft = limitDay.diff(today, "day");

  const handleShowmore = useCallback(() => {
    setShowmore(true);
    setToogleEdit(false);
  }, []);
  const handleToogleEdit = useCallback(() => {
    setToogleEdit(!toogleEdit);
  }, [toogleEdit]);
  const handleEditComplete = useCallback(() => {
    //API Call
    const tempCoupon: CouponProp = {
      id: coupon.id,
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
    dispatch(EDIT_COUPON_REQUEST());
    try {
      //서버로 전송
      setTimeout(() => {
        dispatch({ type: EDIT_COUPON_SUCCESS.type, payload: tempCoupon });
        setCouponName(couponName);
        setCouponDesc(couponDesc);
        setCouponSerial(couponSerial);
        setCouponLimit(couponLimit);
        setToogleEdit(!toogleEdit);
      }, 1000);
    } catch (error) {
      dispatch({ type: EDIT_COUPON_FAILURE.type, payload: error });
    }
  }, [
    toogleEdit,
    dispatch,
    couponName,
    couponDesc,
    couponLimit,
    couponSerial,
    coupon.id,
  ]);

  const handleModalOk = useCallback(() => {
    if (toogleEdit) {
      alert("수정을 완료해주세요 !");
      return;
    }
    setShowmore(false);
    setToogleEdit(false);
  }, [toogleEdit]);

  //이미지처리
  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const deleteFunction = useCallback(() => {
    dispatch(DELETE_COUPON_REQUEST());
    // API call
    try {
      setTimeout(() => {
        dispatch({ type: DELETE_COUPON_SUCCESS.type, payload: coupon });
      }, 1000);
    } catch (error) {
      dispatch({ type: DELETE_COUPON_FAILURE.type, payload: error });
    }
  }, [dispatch, coupon]);

  const deleteConfirm = () => {
    Modal.confirm({
      title: "쿠폰 삭제",
      icon: <CloseOutlined />,
      content: "정말 삭제하시겠습니까?",
      okText: "삭제",
      cancelText: "취소",
      onOk: deleteFunction,
    });
  };

  const useFunction = useCallback(() => {
    dispatch(EDIT_COUPON_REQUEST());
    try {
      //API CALL
      setTimeout(() => {
        const tempCoupon: CouponProp = {
          ...coupon,
          isUsed: true,
        };
        dispatch({ type: EDIT_COUPON_SUCCESS.type, payload: tempCoupon });
      }, 1000);
    } catch (error) {
      dispatch({ type: EDIT_COUPON_FAILURE.type, payload: error });
    }
  }, [dispatch, coupon]);

  const useConfirm = () => {
    Modal.confirm({
      title: "쿠폰 사용",
      icon: <CheckOutlined />,
      content: "사용 하시겠습니까?",
      okText: "사용",
      cancelText: "취소",
      onOk: useFunction,
    });
  };
  return (
    <>
      <Card
        style={{ backgroundColor: "#ffe5a9", marginBottom: "1rem" }}
        actions={
          coupon.isUsed || coupon.expired
            ? [
                <ExpandOutlined key="showmore" onClick={handleShowmore} />,
                <CloseOutlined key="delete" onClick={deleteConfirm} />,
              ]
            : [
                <ExpandOutlined key="showmore" onClick={handleShowmore} />,
                <CheckOutlined key="use" onClick={useConfirm} />,
                <CloseOutlined key="delete" onClick={deleteConfirm} />,
              ]
        }
      >
        {dayLeft < 0 || coupon.expired || coupon.isUsed ? (
          <div
            style={{ float: "right", color: "#423f3b", marginLeft: "0.5rem" }}
          >
            사용 불가
          </div>
        ) : (
          <div
            style={{ float: "right", color: "#423f3b", marginLeft: "0.5rem" }}
          >
            {dayLeft === 0 ? "기한 없음" : `${dayLeft}일 남음`}
          </div>
        )}
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={coupon.name}
          description={coupon.desc ? coupon.desc : "설명이 없습니다."}
          style={{ textAlign: "center" }}
        />
      </Card>
      <Modal
        visible={showmore}
        onCancel={() => {
          setToogleEdit(false);
          setShowmore(false);
        }}
        onOk={handleModalOk}
      >
        {toogleEdit ? (
          <Form>
            <Form.Item
              name="upload"
              label="쿠폰 이미지"
              valuePropName="fileList"
              getValueFromEvent={normFile}
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
                placeholder={coupon.name}
                value={couponName}
              />
            </Form.Item>
            <Form.Item label="쿠폰 설명">
              <Input
                onChange={(e: any) => {
                  setCouponDesc(e.target.value);
                }}
                placeholder={coupon.desc}
                value={couponDesc}
              />
            </Form.Item>
            <Form.Item label="쿠폰 번호">
              <Input
                onChange={(e: any) => {
                  setCouponSerial(e.target.value);
                }}
                placeholder={coupon.serial}
                value={couponSerial}
              />
            </Form.Item>
            <Form.Item label="유효기간 설정">
              <DatePicker
                disabledDate={(current) => {
                  return current && current < moment().endOf("day");
                }}
                value={moment(couponLimit)}
                onChange={(date: any) => {
                  if (date !== null) {
                    setCouponLimit(date.format("YYYY-MM-DD"));
                  }
                }}
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleEditComplete}
              loading={editCouponLoading}
            >
              수정 완료
            </Button>
            <Button onClick={handleToogleEdit}>수정 취소</Button>
          </Form>
        ) : (
          <>
            <Row style={{ marginBottom: "1rem" }}>
              <Col>
                <Image
                  src={
                    coupon.image_link === undefined
                      ? placeholdUrl + "1920x1080"
                      : coupon.image_link
                  }
                  alt={coupon.name}
                />
              </Col>
            </Row>
            <RowWrapper justify="center">
              <Col>{coupon.name}</Col>
            </RowWrapper>
            <RowWrapper justify="center">
              <Col>{coupon.desc}</Col>
            </RowWrapper>
            <RowWrapper justify="center">
              <Col>{coupon.serial}</Col>
            </RowWrapper>
            <RowWrapper justify="center">
              {coupon.expired || coupon.isUsed ? (
                <Col>파기되거나 사용 된 쿠폰입니다.</Col>
              ) : (
                <Col>
                  {dayLeft === 0
                    ? "기한 없음"
                    : `${coupon.limit} 까지 사용 가능`}
                </Col>
              )}
            </RowWrapper>
            {coupon.isPresent ? (
              <RowWrapper justify="center">
                <Col>
                  <Tooltip title="선물 받은 쿠폰입니다 !" color="purple">
                    <GiftOutlined />
                  </Tooltip>
                </Col>
              </RowWrapper>
            ) : (
              <Row style={{ marginTop: "1rem" }} justify="center">
                <Col>
                  <Button onClick={handleToogleEdit}>수정</Button>
                </Col>
              </Row>
            )}
          </>
        )}
      </Modal>
    </>
  );
};
export default CouponCard;
