import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';

export const query = gql`
  query GetAccountData($input: GetTrackInput!) {
    getAllAccounts {
      id
      business_dba
    }
    getTrack(input: $input) {
      id
      account_id
    }
  }
`;

export default graphql(query, {
  options: ({ id }) => {
    return {
      fetchPolicy: 'cache-and-network',
      variables: {
        input: { id: parseInt(id, 10) }
      }
    };
  }
});
