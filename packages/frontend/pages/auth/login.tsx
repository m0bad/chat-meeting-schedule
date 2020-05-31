import React, {useCallback} from "react";
import {Button, Col, Layout, Row} from "antd";
import AuthForm from "../../components/AuthForm";
import {withApollo} from "../../lib/apollo";
import Link from "next/link";
import {useRouter} from "next/router";
import {useMutation} from "@apollo/react-hooks";
import {LoginData, LoginVars} from "../../types/auth.type";
import {LOGIN_MUTATION} from "../../graphql/auth/auth.mutation";

const { Content } = Layout;


const LoginPage = () => {
  const router = useRouter();
  const [login, { loading, error, data }] = useMutation<LoginData, LoginVars>(
    LOGIN_MUTATION,
  );

  if (data && data.login) {
    localStorage.setItem("user", JSON.stringify(data.login));
    router.replace("/chat");
  }

  const onLogin = useCallback(
    (variables: LoginVars) => login({ variables }).catch(e => e),
    [login],
  );

  return (
    <Layout style={{ height: "100vh" }}>
      <Content>
        <Row justify="center" align="middle" style={{ height: "100%" }}>
          <Col span={8}>
            <AuthForm
              type="Login"
              loading={loading}
              error={error}
              name="login"
              buttonText="LOGIN"
              onSubmit={onLogin}
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
