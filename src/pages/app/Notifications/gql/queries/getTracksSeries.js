import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';

export const query = gql`
  query GetTracksSeries(
    $seriesInput: GetSeriesInput!
    $tracksInput: GetTracksInput!
  ) {
    getSeries(input: $seriesInput) {
      id
      name
    }
    getTracks(input: $tracksInput) {
      id
      name
    }
  }
`;

export default graphql(query, {
  options: () => {
    return {
      variables: { seriesInput: {}, tracksInput: {} },
      fetchPolicy: 'cache-and-network',
    };
  },
});
