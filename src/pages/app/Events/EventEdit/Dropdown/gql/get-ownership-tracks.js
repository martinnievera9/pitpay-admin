import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';

export const query = gql`
  query GetOwnershipData($input: GetTrackInput!) {
    getAllUsers {
      id
      name
      first_name
      middle_name
      last_name
      email
      role
    }
    getTrack(input: $input) {
      id
      user_id
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
