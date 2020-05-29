import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Layout, Menu, Typography, Avatar, Divider } from "antd";
import { UserOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { withApollo } from "../lib/apollo";

const { Title } = Typography;
const { Sider } = Layout;
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
    </Layout>
  );
};

export default withApollo()(ChatPage);
