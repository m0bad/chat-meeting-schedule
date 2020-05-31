import React from "react";
import {Menu} from "antd";
import {LeftOutlined, RightOutlined, UsergroupAddOutlined,} from "@ant-design/icons";
import UserAvatar from "./UserAvatar";

const { SubMenu } = Menu;

export const MeetingsList = ({ meetings, loggedInUser, ...otherProps }) => {
  // const [comingMeetings, setComingMeetings] = useState([]);
  // const [pastMeetings, setPastMeetings] = useState([]);

  // useEffect(() => {
  //   console.log({meetings})
  //   if (meetings) {
  //     meetings?.coming?.map(meeting => {
  //       setComingMeetings([
  //         ...comingMeetings,
  //         [meeting.startDate, meeting.endDate],
  //       ]);
  //     });
  //     meetings?.past?.map(meeting => {
  //       setPastMeetings([
  //         ...pastMeetings,
  //         [meeting.startDate, meeting.endDate],
  //       ]);
  //     });
  //   }
  // }, [meetings]);
  //
  // useEffect(() => {
  //   return () => {
  //     setComingMeetings([]);
  //     setPastMeetings([]);
  //   };
  // }, []);

  return (
    <SubMenu
      key="meetings"
      icon={<UsergroupAddOutlined />}
      title="Meetings"
      {...otherProps}
    >
      <SubMenu key="coming" icon={<RightOutlined />} title="Coming">
        {meetings?.coming &&
          meetings?.coming?.map(meeting => (
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
  );
};

