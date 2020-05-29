import React from "react";
import { Input } from "antd";
import { SendOutlined } from "@ant-design/icons";

const { TextArea } = Input;

export const MessageInput = () => (
  <div className="input-field">
    <TextArea rows={2} className="text-area" onPressEnter={null} />
    <span className="suffix">
      <span className="send">
        <SendOutlined style={{ color: "green", fontSize: "22px" }} />
      </span>
    </span>
  </div>
);
