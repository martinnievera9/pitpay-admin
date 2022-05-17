import { graphql } from '@apollo/react-hoc';
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
    }
  }
`;

export default graphql(query, {
  options: (props) => {
    return {
      variables: { id: parseInt(props.match.params.employee_id) },
      fetchPolicy: 'cache-and-network'
    };
  }
});
