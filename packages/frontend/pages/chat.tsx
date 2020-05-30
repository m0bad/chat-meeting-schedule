import React, { useEffect, useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Layout, Menu } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { withApollo } from "../lib/apollo";
import UsersList from "../components/UsersList";
import { ChatWindow } from "../components/ChatWindow";
import { useRouter } from "next/router";
import {USERS_QUERY} from "../graphql/chat/chat.query";

const { Sider } = Layout;
const { SubMenu } = Menu;

const ChatPage = () => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const { data } = useQuery(USERS_QUERY, {
    skip: !loggedInUser,
    variables: { user: loggedInUser },
  });

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) setLoggedInUser(loggedInUser._id);
    else router.replace("/auth/login");
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
        theme="light"
        width="20vw"
      >
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
        </Menu>
      </Sider>
      {selectedUser && (
        <ChatWindow selectedUser={selectedUser} loggedInUser={loggedInUser} />
      )}
    </Layout>
  );
};

export default withApollo()(ChatPage);
