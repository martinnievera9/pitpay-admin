import { graphql } from '@apollo/react-hoc';
import { useQuery } from '@apollo/react-hooks';
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
    }
  }
`;

export function useMyOwnershipQuery(options = {}) {
  return useQuery(query, { ...options });
}

export default graphql(query, {
  options: () => {
    return {
      variables: {},
      fetchPolicy: 'cache-and-network',
    };
  },
});
