import gql from "graphql-tag";

export const USERS_QUERY = gql`
  query users($user: String!) {
    users(user: $user) {
      _id
      email
      username
    }
  }
`;

export const MESSAGES_QUERY = gql`
  query messages($chat: String!) {
    messages(chat: $chat) {
      _id
      body
      sender
      createdAt
    }
  }
`;

export const CHAT_ID_QUERY = gql`
  query chatForUsers($users: [String!]!) {
    chatForUsers(users: $users)
  }
`;

