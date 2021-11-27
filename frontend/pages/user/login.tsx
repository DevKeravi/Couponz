import {
  Row,
  Col,
  Form,
  Button,
  Checkbox,
  Input,
  Tooltip,
  Typography,
} from "antd";
import axios from "axios";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { defaultAPIUrl } from "../../define";
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "../../reducers/user";

const UserLogin = () => {
  const dispatch = useDispatch();
  const { userLoginLoading, userLoginError } = useSelector(
    (state: any) => state.user
  );
  const handleFinish = useCallback(
    async (e: any) => {
      const userData = {
        id: e.username,
        password: e.password,
      };

      dispatch(USER_LOGIN_REQUEST());
      try {
        const resp = await axios.post(defaultAPIUrl + "login", userData);

        setTimeout(() => {
          dispatch({ type: USER_LOGIN_SUCCESS.type, payload: resp.data });
        }, 1000);
      } catch (error) {
        dispatch({ type: USER_LOGIN_FAILURE.type, payload: error });
        alert(error);
      }
    },
    [dispatch]
  );
  const handleFinishFailed = useCallback(() => {
    console.log("finish Failed");
  }, []);
  return (
    <>
      <Row justify="center">로그인</Row>
      <Row justify="center">
        <Col>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={handleFinish}
            onFinishFailed={handleFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "이메일을 입력해 주세요." }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "패스워드를 입력해 주세요" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={userLoginLoading}
              >
                로그인
              </Button>
            </Form.Item>
            <Form.Item>
              <Tooltip title="resgister info">
                <Typography.Link href="/user/register">
                  계정이 없으십니까?
                </Typography.Link>
              </Tooltip>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default UserLogin;
