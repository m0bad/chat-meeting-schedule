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
          {/*<Avatar*/}
          {/*  size="large"*/}
          {/*  style={{*/}
          {/*    backgroundColor: "#87d068",*/}
          {/*    margin: "5px",*/}
          {/*  }}*/}
          {/*  icon={<UserOutlined style={{ fontSize: "22px" }} />}*/}
          {/*/>*/}
          {/*<Text strong style={{ fontSize: "16px", paddingLeft: "10px" }}>*/}
          {/*  {selectedUser.username}*/}
          {/*</Text>*/}
          <UserAvatar username={selectedUser.username} />
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
