import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';

export const query = gql`
  query GetTracks($input: GetTracksInput!) {
    getTracks(input: $input) {
      id
      name
    }
  }
`;
export default graphql(query, {
  options: () => {
    return {
      variables: { input: {} },
      fetchPolicy: 'cache-and-network',
    };
  },
});
