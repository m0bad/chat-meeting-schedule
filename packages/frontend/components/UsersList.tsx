import React, { useCallback } from "react";
import { Avatar, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;

const UsersList = ({ data, onClick, key, title, ...otherProps }) => {
  const handleClick = useCallback(user => onClick(user), [onClick]);

  return (
    <SubMenu key={key} icon={<UserOutlined />} title={title} {...otherProps}>
      {data &&
        data.map(user => (
          <Menu.Item
            key={user._id}
            icon={
              <Avatar
                style={{ backgroundColor: "#87d068", margin: "5px" }}
                icon={<UserOutlined />}
              />
            }
            onClick={() => handleClick(user)}
          >
            {user.username}
          </Menu.Item>
        ))}
    </SubMenu>
  );
};

export default UsersList;
