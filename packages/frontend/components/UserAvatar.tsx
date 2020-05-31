import React from "react";
import {Avatar, Typography} from "antd";
import {UserOutlined} from "@ant-design/icons";

const { Text } = Typography;

const UserAvatar = ({
  username,
  size,
  textColor = "rgba(0, 0, 0, 0.65)",
  onClick = null,
}) => {
  return (
    <div onClick={onClick}>
      <Avatar
        size={size}
        style={{
          backgroundColor: "#87d068",
          margin: "5px",
        }}
        icon={<UserOutlined style={{ fontSize: "22px" }} />}
      />
      <Text
        strong={size === "large"}
        style={{ fontSize: "16px", paddingLeft: "10px", color: textColor }}
      >
        {username}
      </Text>
    </div>
  );
};

export default UserAvatar;
