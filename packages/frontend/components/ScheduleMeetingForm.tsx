import {DatePicker, Form, Input, Radio, Select, TimePicker} from "antd";
import React, {useMemo} from "react";

const format = "YYYY-MM-DD";
const { RangePicker } = TimePicker;
const locations = ["AUC", "GUC", "Maadi", "Greek-Campus", "AUC-Library"];

export const ScheduleMeetingForm = ({
  setHours,
  type,
  setType,
  setLocation,
  data,
  meetingDate,
  setMeetingDate,
  location,
}) => {
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

  const getDisabledHours = () =>
    notAvailableTimes[meetingDate.toISOString().split("T")[0]];

  return (
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
  );
};
