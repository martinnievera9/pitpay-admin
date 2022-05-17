import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';

export const query = gql`
  query Me {
    me {
      id
      track {
        id
        name
      }
      series {
        id
        name
      }
      first_name
      last_name
    }
  }
`;

export default graphql(query, {
  options: () => {
    return {
      variables: {},
      fetchPolicy: 'cache-and-network'
    };
  }
});
