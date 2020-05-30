import React from "react";
import { Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Text } = Typography;

const UserAvatar = ({ username, textColor = "rgba(0, 0, 0, 0.65)" }) => {
  return (
    <>
      <Avatar
        size="large"
        style={{
          backgroundColor: "#87d068",
          margin: "5px",
        }}
        icon={<UserOutlined style={{ fontSize: "22px" }} />}
      />
      <Text
        strong
        style={{ fontSize: "16px", paddingLeft: "10px", color: textColor }}
      >
        {username}
      </Text>
    </>
  );
};

export default UserAvatar;
