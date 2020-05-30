import { Avatar, Layout } from "antd";
import { Message } from "./Message";
import { MessageInput } from "./MessageInput";
import React, { useCallback } from "react";
import { UserOutlined } from "@ant-design/icons";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";

const { Header, Content, Footer } = Layout;

const MESSAGES_QUERY = gql`
  query messages($users: [String!]!) {
    messages(users: $users) {
      _id
      body
      sender
      createdAt
    }
  }
`;

const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($body: String!, $sender: String!, $chat: String!) {
    sendMessage(body: $body, sender: $sender, chat: $chat) {
      _id
      body
      sender
      chat
    }
  }
`;

export const ChatWindow = ({ selectedUser, currentUser }) => {
  const { data } = useQuery(MESSAGES_QUERY, {
    variables: {
      users: [selectedUser._id, currentUser],
    },
  });

  const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION);

  const handleSubmit = useCallback(body => {
    const messageData = {
      body,
      sender: currentUser,
      chat: "5ed1d36303354c2dafa3bccf",
    };
    data.messages.push(messageData);
    sendMessage({
      variables: messageData,
    });
  }, []);

  return (
    <Layout>
      <Header
        style={{ paddingLeft: 10, textAlign: "center", background: "white" }}
      >
        <Avatar
          style={{ backgroundColor: "#87d068", margin: "5px" }}
          icon={<UserOutlined />}
        />
        {selectedUser?.username || "Chat Demo"}
      </Header>
      <Content
        style={{
          background: "#e7e7e7",
          padding: 24,
          minHeight: 240,
        }}
      >
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            margin: 0,
            padding: 0,
          }}
        >
          {data &&
            data?.messages.map(message => (
              <Message
                isMe={message.sender === currentUser}
                body={message.body}
                id={message._id}
              />
            ))}
        </ul>
      </Content>
      <Footer style={{ background: "#EEF7FE", padding: 4 }}>
        <MessageInput onSubmit={handleSubmit} />
      </Footer>
    </Layout>
  );
};
