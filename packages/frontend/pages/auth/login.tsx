import React from "react";
import { Col, Layout, Row, Button } from "antd";
import AuthForm from "../../components/AuthForm";
import { withApollo } from "../../lib/apollo";
import Link from "next/link";

const { Content } = Layout;

const LoginPage = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Content>
        <Row justify="center" align="middle" style={{ height: "100%" }}>
          <Col span={8}>
            <AuthForm
              type="Login"
              loading={false}
              error={null}
              name="login"
              buttonText="LOGIN"
            />
            <Button type="link" block>
              <Link href="/auth/register">
                <a>Don't have an account? Register</a>
              </Link>
            </Button>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default withApollo()(LoginPage);
