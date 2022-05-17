import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';

export const query = gql`
  query SearchUsers($query: String!) {
    searchUsers(query: $query) {
      id
      first_name
      last_name
      cellphone
      email
    }
  }
`;

export default graphql(query, {
  options: () => ({
    variables: {
      query: ''
    },
    fetchPolicy: 'no-cache'
  })
});
