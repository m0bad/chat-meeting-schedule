import React, {useCallback, useEffect, useState} from "react";
import {useQuery, useSubscription} from "@apollo/react-hooks";
import {Layout} from "antd";
import {withApollo} from "../lib/apollo";
import {ChatWindow} from "../components/ChatWindow";
import {useRouter} from "next/router";
import {USERS_QUERY} from "../graphql/chat/chat.query";
import {MEETINGS_QUERY} from "../graphql/meeting/meeting.query";
import gql from "graphql-tag";
import {ChatSider} from "../components/ChatSider";
import {openNotification} from "../utils/notifications";

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
      const {
        startDate,
        endDate,
        location,
        type,
      } = subscriptionData.data.newMeeting;
      openNotification({
        message: "Success!",
        description: `${type} Meeting Scheduled Successfully on day ${new Date(
          startDate,
        ).toDateString()} from ${new Date(startDate).getHours()} to ${new Date(
          endDate,
        ).getHours()} at ${location}`,
      });
    },
  });
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <ChatSider
        loggedInUser={loggedInUser}
        data={data}
        loading={loading}
        setSelectedUser={setSelectedUser}
        userMeetings={userMeetings}
        onLogOut={onLogOut}
      />
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
