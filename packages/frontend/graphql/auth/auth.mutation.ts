import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      email
      username
      token
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation REGISTER($email: String!, $username: String!, $password: String!) {
    register(email: $email, username: $username, password: $password) {
      _id
      email
      username
      token
    }
  }
`;
