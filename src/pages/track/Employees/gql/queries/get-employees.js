import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import qs from 'qs';

export const query = gql`
  query GetEmployees($input: GetEmployeeInput!) {
    getEmployees(input: $input) {
      count
      results {
        id
        first_name
        last_name
        email
        role
        cellphone
        middle_name
        suffix
      }
    }
  }
`;

export default graphql(query, {
  options: (props) => {
    const search = qs.parse(props.location.search, { ignoreQueryPrefix: true });

    return {
      variables: { input: search },
      fetchPolicy: 'cache-and-network'
    };
  }
});
