import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';

export const query = gql`
  query GetUser($id: Int!) {
    getUser(id: $id) {
      id
      name
      first_name
      middle_name
      last_name
      email
      role
      cellphone
      address
      birthday
      expiration
      stripe_account_id
      suffix
      inactive
      associations
      message_center
      registrations
      memberships
      parents {
        first_name
        last_name
        cellphone
        user_id
      }
      is_orphaned
    }
  }
`;

export default graphql(query, {
  options: ({ currentUser, match }) => {
    return {
      variables: {
        id: currentUser ? currentUser : match ? Number(match.params.id) : null,
      },
      fetchPolicy: 'cache-and-network',
    };
  },
});
