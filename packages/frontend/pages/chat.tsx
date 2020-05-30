import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Layout, Menu } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { withApollo } from "../lib/apollo";
import UsersList from "../components/UsersList";
import { ChatWindow } from "../components/ChatWindow";

const currentUser = "5ed1d30203354c2dafa3bccc";
const { Sider } = Layout;
const { SubMenu } = Menu;

const USERS_QUERY = gql`
  query users($user: String!) {
    users(user: $user) {
      _id
      email
      username
    }
  }
`;

// const FRIENDS_QUERY = gql`
//   query friends($user: String!) {
//     friends(user: $user) {
//       _id
//       email
//       username
//     }
//   }
// `;

const ChatPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // const { data } = useQuery(FRIENDS_QUERY, {
  //   variables: { user: currentUser },
  // });
  const { data } = useQuery(USERS_QUERY, {
    variables: { user: currentUser },
  });

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
        <ChatWindow selectedUser={selectedUser} currentUser={currentUser} />
      )}
    </Layout>
  );
};

export default withApollo()(ChatPage);
