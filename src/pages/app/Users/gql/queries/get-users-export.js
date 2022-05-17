import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';

export const query = gql`
  query GetUserExport {
    getUserExport {
      id
      first_name
      middle_name
      address
      last_name
      email
      role
      cellphone
      name
      suffix
      races
      purchases
      lifetimeValue
      favoritesCount
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
