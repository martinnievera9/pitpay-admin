import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';

export const query = gql`
  query GetAllUsers {
    getAllUsers {
      id
      name
      first_name
      middle_name
      last_name
      email
      role
    }
  }
`;

export default graphql(query, {
  options: ({ id }) => {
    return {
      fetchPolicy: 'cache-and-network',
      variables: {
        input: { id: null }
      }
    };
  }
});
