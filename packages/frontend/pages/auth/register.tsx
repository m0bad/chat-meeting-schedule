import React from "react";
import { Col, Layout, Row, Button } from "antd";
import AuthForm from "../../components/AuthForm";
import { withApollo } from "../../lib/apollo";
import Link from "next/link";

const { Content } = Layout;

const RegisterPage = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Content>
        <Row justify="center" align="middle" style={{ height: "100%" }}>
          <Col span={8}>
            <AuthForm
              type="Register"
              loading={false}
              error={null}
              name="register"
              buttonText="REGISTER"
            />
            <Button type="link" block>
              <Link href="/auth/login">
                <a>Already got an account? Login</a>
              </Link>
            </Button>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default withApollo()(RegisterPage);
