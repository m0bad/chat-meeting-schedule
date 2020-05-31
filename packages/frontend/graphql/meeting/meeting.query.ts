import gql from "graphql-tag";

export const MEETINGS_QUERY = gql`
  query meetings($user: String!) {
    meetings(user: $user) {
      coming {
        _id
        type
        location
        users {
          _id
          username
        }
        startDate
        endDate
      }
      past {
        _id
        type
        location
        users {
          _id
          username
        }
        startDate
        endDate
      }
    }
  }
`;

export const UNAVAILABLE_TIMES_QUERY = gql`
  query unavailableTimes($user: String!) {
    unavailableTimes(user: $user) {
      date
      hours
    }
  }
`;
