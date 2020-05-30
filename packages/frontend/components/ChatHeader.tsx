import React from "react";
import { Avatar, Layout, Row, Col, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import UserAvatar from "./UserAvatar";

const { Text } = Typography;

const ChatHeader = ({ selectedUser, loggedInUser }) => {
  return (
    <>
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <UserAvatar username={selectedUser.username} />
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
