import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';

export const query = gql`
  query Me {
    me {
      id
      first_name
      last_name
      ownership {
        tracks {
          id
          name
        }
        series {
          id
          name
        }
      }
      messageCount
      racerCount
      staffCount
      guestCount
    }
  }
`;

export default graphql(query, {
  options: (props) => {
    return {
      variables: {},
      fetchPolicy: 'cache-and-network',
    };
  },
});
