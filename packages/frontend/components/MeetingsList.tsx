import React, {useCallback, useState} from "react";
import {Menu, Modal, Spin, Typography} from "antd";
import {LeftOutlined, RightOutlined, UsergroupAddOutlined,} from "@ant-design/icons";
import UserAvatar from "./UserAvatar";

const { SubMenu } = Menu;
const { Text } = Typography;

export const MeetingsList = ({ meetings, loggedInUser, ...otherProps }) => {
  const [visible, setVisible] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const handleClick = useCallback(
    meeting => {
      setVisible(true);
      setSelectedMeeting({ ...meeting });
      console.log({ meeting });
    },
    [setVisible],
  );
  return (
    <>
      <SubMenu
        key="meetings"
        icon={<UsergroupAddOutlined />}
        title="Meetings"
        {...otherProps}
      >
        <SubMenu key="coming" icon={<RightOutlined />} title="Upcoming">
          {meetings?.coming &&
            meetings?.coming?.map(meeting => {
              const user = meeting?.users?.filter(
                user => user._id !== loggedInUser._id,
              )[0];

              return (
                <Menu.Item key={meeting._id}>
                  <UserAvatar
                    username={"With " + user.username}
                    size="default"
                    onClick={handleClick.bind(null, { ...meeting, user })}
                  />
                </Menu.Item>
              );
            })}
        </SubMenu>
        <SubMenu key="past" icon={<LeftOutlined />} title="Past">
          {meetings?.past &&
            meetings?.past?.map(meeting => (
              <Menu.Item key={meeting._id}>
                <UserAvatar
                  username={
                    "With " +
                    meeting?.users?.filter(
                      user => user._id !== loggedInUser._id,
                    )[0].username
                  }
                  size="default"
                />
              </Menu.Item>
            ))}
        </SubMenu>
      </SubMenu>
      <Modal
        title="Meeting Info"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        {selectedMeeting ? (
          <Text>
            {selectedMeeting.user.username}, {selectedMeeting.type} Meeting, on
            day {new Date(selectedMeeting.startDate).toDateString()} From{" "}
            {new Date(selectedMeeting.startDate).getHours()} To{" "}
            {new Date(selectedMeeting.endDate).getHours()}
          </Text>
        ) : (
          <div className="loading-spinner">
            <Spin />
          </div>
        )}
      </Modal>
    </>
  );
};
