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
