import {Message} from "./Message";
import React from "react";
import {Spin} from "antd";

export const MessagesList = ({ data, loggedInUser, loading }) => (
  <>
    {loading ? (
      <div className="loading-spinner">
        <Spin />
      </div>
    ) : (
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          margin: 0,
          padding: 0,
        }}
      >
        {data &&
          data?.messages.map(message => (
            <Message
              isMe={message.sender === loggedInUser}
              body={message.body}
              key={message._id}
            />
          ))}
      </ul>
    )}
  </>
);
