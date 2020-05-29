import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Avatar, Input, Layout, Menu } from "antd";
import { UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
import { withApollo } from "../lib/apollo";
import { Message } from "../components/Message";
import { MessageInput } from "../components/MessageInput";

const { Sider, Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

const USERS_QUERY = gql`
  query users {
    users {
      _id
      email
      username
    }
  }
`;

const ChatPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { loading, error, data } = useQuery(USERS_QUERY);

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
          <SubMenu key="users" icon={<UserOutlined />} title="Users">
            {data &&
              data.users.map(user => (
                <Menu.Item
                  key={user._id}
                  icon={
                    <Avatar
                      style={{ backgroundColor: "#87d068", margin: "5px" }}
                      icon={<UserOutlined />}
                    />
                  }
                  onClick={() => setSelectedUser(user)}
                >
                  {user.username}
                </Menu.Item>
              ))}
          </SubMenu>
          <SubMenu
            key="meetings"
            icon={<UsergroupAddOutlined />}
            title="Approved Meetings"
          ></SubMenu>
        </Menu>
      </Sider>
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
            <Message isMe={false} body="Hi" />
            <Message isMe={true} body="How are you" />
          </ul>
        </Content>
        <Footer style={{ background: "#EEF7FE", padding: 4 }}>
          <MessageInput />
        </Footer>
      </Layout>
    </Layout>
  );
};

export default withApollo()(ChatPage);
