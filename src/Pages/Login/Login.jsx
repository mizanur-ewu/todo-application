import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import useLocalStorage from "../../utils/useLocalStorage";

const Login = () => {
  const localStorage = useLocalStorage();
  const { getAuthToken, setAuthToken } = localStorage;

  const onFinish = (values) => {
    const data =
      values?.username === "mizanurewu@gmail.com" &&
      Number(values?.password) === 1234
        ? "successfullyLoggedIn"
        : "loginFailed";
    console.log(import.meta.env.VITE_AUTH_TOKEN);
    setAuthToken(data);
  };
  return (
    <>
      <div className="w-1/3 mx-auto">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              ghost
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Login;
