import React, { useCallback } from "react";
import { Button } from "antd";
import UserAvatar from "./UserAvatar";
import { ScheduleOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import { SCHEDULE_MEETING } from "../graphql/meeting/meeting.mutation";

const ChatHeader = ({ selectedUser }) => {
  const [scheduleMeeting] = useMutation(SCHEDULE_MEETING);

  const onSchedule = useCallback(() => {
    scheduleMeeting({
      variables: {
        type: "offline",
        location: "AUC",
        users: ["5ed1ebbb6ad5fa423b4e8910", "5ed28964d5d4451ffd7aa391"],
        startDate:
          "Sat Jun 06 2020 22:45:48 GMT+0200 (Eastern European Standard Time)",
        endDate:
          "Sat Jun 06 2020 23:45:48 GMT+0200 (Eastern European Standard Time)",
      },
    });
  }, [scheduleMeeting]);
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
          onClick={onSchedule}
        >
          Schedule Meeting
        </Button>
      </div>
    </>
  );
};

export default ChatHeader;
