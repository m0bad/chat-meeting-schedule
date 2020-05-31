import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Modal,
  DatePicker,
  Form,
  TimePicker,
  Radio,
  Select,
  Input,
} from "antd";
import UserAvatar from "./UserAvatar";
import { ScheduleOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { SCHEDULE_MEETING } from "../graphql/meeting/meeting.mutation";
import { UNAVAILABLE_TIMES_QUERY } from "../graphql/meeting/meeting.query";

const format = "YYYY-MM-DD";
const { RangePicker } = TimePicker;
const locations = ["AUC", "GUC", "Maadi", "Greek-Campus", "AUC-Library"];

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

  const notAvailableTimes = useMemo(
    () =>
      data?.unavailableTimes
        .map(d => [new Date(+d.date).toISOString().split("T")[0], d.hours])
        .reduce((acc, [date, hours]) => {
          acc[date] = [...hours, ...(acc[date] || [])];
          return acc;
        }, {}) || [],
    [data],
  );

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

  const getDisabledHours = () =>
    notAvailableTimes[meetingDate.toISOString().split("T")[0]];

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
        <Form>
          <Form.Item label="Type" name="type">
            <Radio.Group value={type} onChange={e => setType(e.target.value)}>
              <Radio key="online" value="online">
                Online
              </Radio>
              <Radio key="offline" value="offline">
                Offline
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Date">
            <DatePicker
              format={format}
              onChange={value => setMeetingDate(value.toDate())}
            />
            <RangePicker
              disabledHours={getDisabledHours}
              picker={null}
              format="HH"
              onChange={value => setHours(value)}
            />
          </Form.Item>

          <Form.Item label="Location" name="location">
            {type === "offline" ? (
              <Select
                placeholder="Place"
                defaultActiveFirstOption={false}
                showArrow={false}
                optionFilterProp="children"
                value={location}
                onChange={value => setLocation(value)}
              >
                {locations.map(location => (
                  <Select.Option key={location} value={location}>
                    {location}
                  </Select.Option>
                ))}
              </Select>
            ) : (
              <Input
                placeholder="Link"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ChatHeader;
