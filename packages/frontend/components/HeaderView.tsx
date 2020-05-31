import UserAvatar from "./UserAvatar";
import {Button} from "antd";
import React from "react";
import {ScheduleOutlined} from "@ant-design/icons";

export const HeaderView = ({ selectedUser, setVisible }) => (
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
      onClick={() => setVisible(true)}
    >
      Schedule Meeting
    </Button>
  </div>
);
