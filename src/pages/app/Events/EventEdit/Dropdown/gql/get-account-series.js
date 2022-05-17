import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';

export const query = gql`
  query GetAccountData($input: GetSeriesDetailInput!) {
    getAllAccounts {
      id
      business_dba
    }
    getSeriesDetail(input: $input) {
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
