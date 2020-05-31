import React, { useCallback, useEffect, useState } from "react";
import { useQuery, useSubscription } from "@apollo/react-hooks";
import { Button, Divider, Layout, Menu } from "antd";
import { withApollo } from "../lib/apollo";
import UsersList from "../components/UsersList";
import { ChatWindow } from "../components/ChatWindow";
import { useRouter } from "next/router";
import { USERS_QUERY } from "../graphql/chat/chat.query";
import UserAvatar from "../components/UserAvatar";
import { MeetingsList } from "../components/MeetingsList";
import { MEETINGS_QUERY } from "../graphql/meeting/meeting.query";
import gql from "graphql-tag";

const { Sider } = Layout;

export const MEETINGS_SUBSCRIPTION = gql`
  subscription newMeeting($user: String!) {
    newMeeting(user: $user) {
      _id
      type
      location
      users
      startDate
      endDate
    }
  }
`;

const ChatPage = () => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const { data, loading } = useQuery(USERS_QUERY, {
    skip: !loggedInUser,
    variables: { user: loggedInUser?._id },
  });

  const { data: userMeetings } = useQuery(MEETINGS_QUERY, {
    skip: !loggedInUser,
    variables: { user: loggedInUser?._id },
  });

  const onLogOut = useCallback(() => {
    localStorage.clear();
    router.replace("/auth/login");
  }, []);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) setLoggedInUser(loggedInUser);
    else router.replace("/auth/login");
  }, []);

  useSubscription(MEETINGS_SUBSCRIPTION, {
    variables: { user: loggedInUser?._id },
    onSubscriptionData({ subscriptionData }) {
      if (!subscriptionData) return;
      console.log({ subscriptionData });
    },
  });
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
        theme="light"
        width="20vw"
        style={{ position: "relative" }}
      >
        <UserAvatar
          username={loggedInUser?.username}
          textColor="#4FC3F7"
          size="large"
        />
        <Divider />
        <Menu mode="inline">
          <UsersList
            data={data?.users}
            loading={loading}
            onClick={setSelectedUser}
            key="users"
            title="Users"
          />
          <MeetingsList
            meetings={userMeetings?.meetings}
            loggedInUser={loggedInUser}
          />
          <Menu.Item style={{ position: "absolute", bottom: "3rem" }}>
            <Button type="primary" danger block onClick={onLogOut}>
              LOGOUT
            </Button>
          </Menu.Item>
        </Menu>
      </Sider>
      {selectedUser && (
        <ChatWindow
          selectedUser={selectedUser}
          loggedInUser={loggedInUser._id}
        />
      )}
    </Layout>
  );
};

export default withApollo()(ChatPage);
