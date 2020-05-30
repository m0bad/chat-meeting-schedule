import gql from "graphql-tag";

export const SEND_MESSAGE_MUTATION = gql`
    mutation sendMessage($body: String!, $sender: String!, $chat: String!) {
        sendMessage(body: $body, sender: $sender, chat: $chat) {
            _id
            body
            sender
            chat
        }
    }
`;
