import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';

export const query = gql`
  query GetTrack($input: GetTrackInput!) {
    getTrack(input: $input) {
      id
      name
      logo
      cityAndState
      street
      state
      city
      zipcode
      size
      type {
        value
        key
      }
    }
  }
`;

export default graphql(query, {
  options: (props) => {
    return {
      variables: {
        input: { id: props.me.track ? parseInt(props.me.track.id, 10) : null }
      },
      fetchPolicy: 'cache-and-network'
    };
  }
});
