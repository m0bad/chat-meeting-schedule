import React from "react";

export const Message = ({ isMe, body }) => (
  <li
    style={{
      display: "block",
      alignSelf: isMe ? "flex-end" : "flex-start",
      background: isMe ? "#DCF8C6" : "white",
      width: "fit-content",
      maxWidth: "50%",
      padding: "8px 24px",
      borderRadius: 8,
      margin: "8px 16px",
    }}
  >
    {body}
  </li>
);
