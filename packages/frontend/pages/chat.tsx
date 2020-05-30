import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Divider, Layout, Menu, Button } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { withApollo } from "../lib/apollo";
import UsersList from "../components/UsersList";
import { ChatWindow } from "../components/ChatWindow";
import { useRouter } from "next/router";
import { USERS_QUERY } from "../graphql/chat/chat.query";
import UserAvatar from "../components/UserAvatar";

const { Sider, Footer } = Layout;
const { SubMenu } = Menu;

const ChatPage = () => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const { data } = useQuery(USERS_QUERY, {
    skip: !loggedInUser,
    variables: { user: loggedInUser?._id },
  });

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) setLoggedInUser(loggedInUser);
    else router.replace("/auth/login");
  }, []);

  const onLogOut = useCallback(() => {
    localStorage.clear();
    router.replace("/auth/login");
  }, []);

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
        <UserAvatar username={loggedInUser?.username} textColor="#4FC3F7" />
        <Divider />
        <Menu mode="inline">
          <UsersList
            data={data?.users}
            onClick={setSelectedUser}
            key="users"
            title="Users"
          />
          <SubMenu
            key="meetings"
            icon={<UsergroupAddOutlined />}
            title="Approved Meetings"
          ></SubMenu>
          <Menu.Item style={{ position: "absolute", bottom: "3rem" }}>
            <Button danger block onClick={onLogOut}>
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
