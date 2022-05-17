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
  options: () => {
    return {
      variables: { input: {} },
      fetchPolicy: 'cache-and-network'
    };
  }
});
