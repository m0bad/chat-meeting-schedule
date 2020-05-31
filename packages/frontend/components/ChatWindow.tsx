import {Layout} from "antd";
import {MessageInput} from "./MessageInput";
import React, {useCallback, useEffect} from "react";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {MessagesList} from "./MessagesList";
import {CHAT_ID_QUERY, MESSAGES_QUERY} from "../graphql/chat/chat.query";
import {SEND_MESSAGE_MUTATION} from "../graphql/chat/chat.mutation";
import {MESSAGES_SUBSCRIPTION} from "../graphql/chat/chat.subscription";
import ChatHeader from "./ChatHeader";

const { Header, Footer, Content } = Layout;

export const ChatWindow = ({ selectedUser, loggedInUser }) => {
  const { data: chatID } = useQuery(CHAT_ID_QUERY, {
    variables: { users: [selectedUser._id, loggedInUser] },
  });

  const { subscribeToMore, data, loading } = useQuery(MESSAGES_QUERY, {
    skip: !chatID,
    variables: { chat: chatID?.chatForUsers },
  });

  const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION);

  useEffect(() => {
    if (subscribeToMore && chatID) {
      const subscription = subscribeToMore({
        document: MESSAGES_SUBSCRIPTION,
        variables: { chat: chatID.chatForUsers },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newMessage = subscriptionData.data.newMessage;
          return { ...prev, messages: [...prev.messages, newMessage] };
        },
      });
      return subscription;
    }
  }, [subscribeToMore, chatID]);

  const handleSubmit = useCallback(
    body => {
      const messageData = {
        body,
        sender: loggedInUser,
        chat: chatID?.chatForUsers,
      };
      sendMessage({
        variables: messageData,
      });
    },
    [chatID],
  );

  return (
    <Layout style={{ maxHeight: "100vh" }}>
      <Header
        style={{ paddingLeft: 10, textAlign: "center", background: "white" }}
      >
        <ChatHeader selectedUser={selectedUser} loggedInUser={loggedInUser} />
      </Header>
      <Content
        style={{
          background: "#e7e7e7",
          padding: 24,
          minHeight: 240,
          flex: 1,
          overflowY: "scroll",
        }}
      >
        <MessagesList
          data={data}
          loggedInUser={loggedInUser}
          loading={loading}
        />
      </Content>
      <Footer style={{ background: "#EEF7FE", padding: 4 }}>
        <MessageInput onSubmit={handleSubmit} />
      </Footer>
    </Layout>
  );
};
