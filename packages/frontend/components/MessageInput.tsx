import React, {useCallback, useState} from "react";
import {Input} from "antd";
import {SendOutlined} from "@ant-design/icons";

const { TextArea } = Input;

export const MessageInput = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const handleSubmit = useCallback(
    val => {
      setValue("");
      onSubmit(val);
    },
    [onSubmit],
  );

  const handleChange = e => setValue(e.target.value);

  return (
    <div className="input-field">
      <TextArea
        rows={2}
        className="text-area"
        onPressEnter={() => handleSubmit(value)}
        value={value}
        onChange={handleChange}
      />
      <span className="suffix">
        <span className="send" onClick={() => handleSubmit(value)}>
          <SendOutlined style={{ color: "green", fontSize: "22px" }} />
        </span>
      </span>
    </div>
  );
};
