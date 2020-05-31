import React from "react";
import {Alert, Button, Card, Form, Input, Typography} from "antd";
import {MailOutlined, UnlockOutlined, UserOutlined} from "@ant-design/icons";

const { Title } = Typography;

const AuthForm = ({ name, loading, error, type, buttonText, onSubmit }) => {
  return (
    <Card bordered={false}>
      {error &&
        error.graphQLErrors.map(({ message }, i) => (
          <div key={i}>
            <Alert message={message} type="error" />
            <br />
          </div>
        ))}
      <Form
        name={name}
        initialValues={{ email: "", username: "", password: "" }}
        onFinish={onSubmit}
      >
        <Title level={4}>{type}</Title>

        <Form.Item
          name="email"
          rules={[{ required: true, message: "Email is required." }]}
        >
          <Input
            type="email"
            placeholder="Email"
            prefix={<MailOutlined />}
            disabled={loading}
          />
        </Form.Item>
        {type === "Register" && (
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Username is required." }]}
          >
            <Input
              type="username"
              placeholder="Username"
              prefix={<UserOutlined />}
              disabled={loading}
            />
          </Form.Item>
        )}
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Password is required." }]}
        >
          <Input
            type="password"
            placeholder="Password"
            prefix={<UnlockOutlined />}
            disabled={loading}
          />
        </Form.Item>

        <Form.Item noStyle>
          <Button loading={loading} type="primary" block htmlType="submit">
            {buttonText}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AuthForm;
