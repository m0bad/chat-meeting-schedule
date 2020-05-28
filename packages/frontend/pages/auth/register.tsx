import React, {useCallback} from "react";
import {Button, Col, Layout, Row} from "antd";
import AuthForm from "../../components/AuthForm";
import {withApollo} from "../../lib/apollo";
import Link from "next/link";
import gql from "graphql-tag";
import {RegisterData, RegisterVars} from "../../types/auth.type";
import {useMutation} from "@apollo/react-hooks";
import {useRouter} from "next/router";

const { Content } = Layout;

const REGISTER_MUTATION = gql`
  mutation REGISTER($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      _id
      email
      token
    }
  }
`;

const RegisterPage = () => {
  const router = useRouter();
  const [register, { loading, error, data }] = useMutation<
    RegisterData,
    RegisterVars
  >(REGISTER_MUTATION);

  if (data && data.register) {
    localStorage.setItem("token", data.register.token);
    console.log("Registered");
    // router.replace("/");
  }

  const onRegister = useCallback(
    (variables: RegisterVars) => register({ variables }).catch(e => e),
    [register],
  );

  return (
    <Layout style={{ height: "100vh" }}>
      <Content>
        <Row justify="center" align="middle" style={{ height: "100%" }}>
          <Col span={8}>
            <AuthForm
              type="Register"
              loading={loading}
              error={error}
              name="register"
              buttonText="REGISTER"
              onSubmit={onRegister}
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
