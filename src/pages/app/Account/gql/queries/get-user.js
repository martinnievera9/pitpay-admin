import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import storage from 'shared/storage';

export const query = gql`
  query GetUser($id: Int!) {
    getUser(id: $id) {
      id
      first_name
      last_name
      email
      cellphone
    }
  }
`;

export default graphql(query, {
  options: (props) => {
    const user = storage.get('user', {});
    return {
      variables: { id: user.id },
      fetchPolicy: 'cache-and-network'
    };
  }
});
