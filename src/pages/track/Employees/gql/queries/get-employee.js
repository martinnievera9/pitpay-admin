import { graphql } from '@apollo/react-hoc';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const query = gql`
  query GetEmployee($id: Int!) {
    getEmployee(id: $id) {
      id
      first_name
      last_name
      email
      cellphone
      role
      middle_name
      suffix
      track {
        id
        name
      }
      series {
        id
        name
      }
    }
  }
`;

export function useGetEmployee(id, options) {
  return useQuery(query, {
    variables: { id: id ?? 0 },
    ...options,
  });
}

export default graphql(query, {
  options: ({ currentEmployee }) => {
    return {
      variables: { id: currentEmployee ? currentEmployee : 0 },
      fetchPolicy: 'cache-and-network',
    };
  },
});
