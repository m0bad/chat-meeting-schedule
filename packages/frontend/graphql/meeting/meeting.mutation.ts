import gql from "graphql-tag";

export const SCHEDULE_MEETING = gql`
  mutation scheduleMeeting(
    $type: String!
    $location: String!
    $users: [String!]!
    $startDate: DateTime!
    $endDate: DateTime!
  ) {
    scheduleMeeting(
      type: $type
      location: $location
      users: $users
      startDate: $startDate
      endDate: $endDate
    ) {
      _id
      type
      location
      users
      startDate
      endDate
    }
  }
`;
