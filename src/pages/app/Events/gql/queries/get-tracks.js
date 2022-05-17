import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';

export const query = gql`
  query GetTracksAdmin($input: GetTracksAdminInput!) {
    getTracksAdmin(input: $input) {
      count
      results {
        id
        name
        fullAddress
        timezone
        type {
          key
          value
        }
        phone
        status
      }
    }
  }
`;
export default graphql(query, {
  options: (props) => {
    return {
      variables: { input: {} },
      fetchPolicy: 'cache-and-network'
    };
  }
});
