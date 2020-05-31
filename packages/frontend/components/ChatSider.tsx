import UserAvatar from "./UserAvatar";
import {Button, Divider, Layout, Menu} from "antd";
import UsersList from "./UsersList";
import {MeetingsList} from "./MeetingsList";
import React, {useState} from "react";

const { Sider } = Layout;

export const ChatSider = ({
  loggedInUser,
  data,
  loading,
  setSelectedUser,
  userMeetings,
  onLogOut,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
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
  );
};
