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
import { CouponProp } from "../../reducers/coupon";
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
const { Meta } = Card;

const RowWrapper = styled(Row)`
  margin-top: 0.5rem;
`;

const CouponCard = (coupon: CouponProp) => {
  const [showmore, setShowmore] = useState(false);
  const [toogleEdit, setToogleEdit] = useState(false);

  const handleShowmore = useCallback(() => {
    setShowmore(true);
    setToogleEdit(false);
  }, []);
  const handleToogleEdit = useCallback(() => {
    setToogleEdit(!toogleEdit);
  }, [toogleEdit]);
  const handleEditComplete = useCallback(() => {
    //API Call
    setToogleEdit(!toogleEdit);
  }, [toogleEdit]);

  const handleModalOk = useCallback(() => {
    if (toogleEdit) {
      alert("수정을 완료해주세요 !");
      return;
    }
    setShowmore(false);
    setToogleEdit(false);
  }, [toogleEdit]);

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  return (
    <>
      <Card
        style={{ backgroundColor: "#ffe5a9", marginBottom: "1rem" }}
        actions={[
          <ExpandOutlined key="showmore" onClick={handleShowmore} />,
          <CheckOutlined key="use" />,
          <CloseOutlined key="delete" />,
        ]}
      >
        <div style={{ float: "right", color: "#423f3b", marginLeft: "0.5rem" }}>
          2일 남음
        </div>
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
              <Input required placeholder={coupon.name} />
            </Form.Item>
            <Form.Item label="쿠폰 설명">
              <Input placeholder={coupon.desc} />
            </Form.Item>
            <Form.Item label="쿠폰 번호">
              <Input placeholder={coupon.serial} />
            </Form.Item>
            <Form.Item label="유효기간 설정">
              <DatePicker />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleEditComplete}
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
                <Col>2일 남음</Col>
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
