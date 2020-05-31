import React, { useCallback, useMemo, useState } from "react";
import { Button, Modal, TimePicker } from "antd";
import UserAvatar from "./UserAvatar";
import { ScheduleOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { SCHEDULE_MEETING } from "../graphql/meeting/meeting.mutation";
import { UNAVAILABLE_TIMES_QUERY } from "../graphql/meeting/meeting.query";
import { ScheduleMeetingForm } from "./ScheduleMeetingForm";

const ChatHeader = ({ selectedUser, loggedInUser }) => {
  const [visible, setVisible] = useState(false);
  const [meetingDate, setMeetingDate] = useState(null);
  const [scheduleMeeting] = useMutation(SCHEDULE_MEETING);

  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [hours, setHours] = useState([]);

  const { data, refetch } = useQuery(UNAVAILABLE_TIMES_QUERY, {
    skip: !selectedUser?._id,
    variables: { user: selectedUser?._id },
  });

  const onSchedule = useCallback(() => {
    scheduleMeeting({
      variables: {
        type: type,
        location: location,
        users: [loggedInUser, selectedUser?._id],
        startDate: new Date(meetingDate).setHours(hours[0].toDate().getHours()),
        endDate: new Date(meetingDate).setHours(hours[1].toDate().getHours()),
      },
    }).then(() => refetch());
    setVisible(false);
  }, [
    scheduleMeeting,
    location,
    type,
    loggedInUser,
    selectedUser,
    meetingDate,
  ]);

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
          onClick={() => setVisible(true)}
        >
          Schedule Meeting
        </Button>
      </div>
      <Modal
        visible={visible}
        title="Schedule Meeting"
        onOk={onSchedule}
        onCancel={() => setVisible(false)}
      >
        <ScheduleMeetingForm
          data={data}
          type={type}
          meetingDate={meetingDate}
          setHours={setHours}
          setLocation={setLocation}
          location={location}
          setType={setType}
          setMeetingDate={setMeetingDate}
        />
      </Modal>
    </>
  );
};

export default ChatHeader;
