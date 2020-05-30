import gql from "graphql-tag";

export const MESSAGES_SUBSCRIPTION = gql`
    subscription newMessage($chat: String!) {
        newMessage(chat: $chat) {
            _id
            body
            sender
            chat
            createdAt
        }
    }
`;
