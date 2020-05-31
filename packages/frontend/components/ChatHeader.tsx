import React from "react";
import { Button } from "antd";
import UserAvatar from "./UserAvatar";
import { ScheduleOutlined } from "@ant-design/icons";

const ChatHeader = ({ selectedUser }) => {
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
          <UserAvatar username={selectedUser.username} size="default" />
        </div>
        <Button
          style={{ position: "absolute", right: 0, top: "1rem" }}
          type="primary"
          icon={<ScheduleOutlined />}
        >
          Schedule Meeting
        </Button>
      </div>
    </>
  );
};

export default ChatHeader;
