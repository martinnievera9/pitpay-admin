import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';

export const query = gql`
  query GetAllAccounts {
    getAllAccounts {
      id
      business_dba
    }
  }
`;

export default graphql(query, {
  options: () => {
    return {
      fetchPolicy: 'cache-and-network',
      variables: {
        input: { id: null }
      }
    };
  }
});
