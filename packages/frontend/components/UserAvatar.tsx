import React from "react";
import { Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Text } = Typography;

const UserAvatar = ({ username }) => {
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
        style={{ fontSize: "16px", paddingLeft: "10px", color: "#4FC3F7" }}
      >
        {username}
      </Text>
    </>
  );
};

export default UserAvatar;
