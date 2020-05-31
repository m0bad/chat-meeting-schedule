import React, {useCallback, useState} from "react";
import {Modal} from "antd";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {SCHEDULE_MEETING} from "../graphql/meeting/meeting.mutation";
import {UNAVAILABLE_TIMES_QUERY} from "../graphql/meeting/meeting.query";
import {ScheduleMeetingForm} from "./ScheduleMeetingForm";
import {HeaderView} from "./HeaderView";

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
      <HeaderView selectedUser={selectedUser} setVisible={setVisible} />
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
