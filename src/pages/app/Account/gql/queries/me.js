import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';

export const query = gql`
  query Me {
    me {
      id
      track {
        id
        name
        logo
        cityAndState
      }
      series {
        id
        name
        logo
      }
      first_name
      middle_name
      address
      last_name
      email
      cellphone
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
