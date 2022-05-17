import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';

export const query = gql`
  query GetTrack($input: GetTrackInput!) {
    getTrack(input: $input) {
      id
      logo
      name
      size
      street
      city
      state
      zipcode
      user_id
      cityAndState
      type {
        value
        key
      }
    }
  }
`;
export default graphql(query, {
  options: ({ id }) => {
    return {
      variables: { input: { id: parseInt(id, 10) } },
      fetchPolicy: 'cache-and-network',
      skip: !id,
    };
  },
});
