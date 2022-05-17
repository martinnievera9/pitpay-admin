import { graphql } from '@apollo/react-hoc';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const GET_TRACK = gql`
  query GetTrack($input: GetTrackInput!) {
    getTrack(input: $input) {
      id
      image
      logo
      image_id
      logo_id
      name
      short_name
      street
      state
      city
      zipcode
      phone
      website
      schedule
      added_by
      added_by_user {
        id
        name
      }
      type {
        id
        key
        value
      }
      size
      bio
      twitter
      facebook
      instagram
      poc {
        id
      }
      user_id
      faqs {
        id
        question
        answer
      }
      status
      timezone
      fullAddress
    }
    getAllUsers {
      id
      name
      first_name
      middle_name
      last_name
      email
      role
    }
    getTrackTypes {
      id
      value
      key
    }
  }
`;

export function useGetTrackEditData(currentTrack) {
  const { data, loading, error } = useQuery(GET_TRACK, {
    variables: { input: { id: currentTrack ? currentTrack : 0 } },
  });
  return { data, loading, error };
}

export default graphql(GET_TRACK, {
  options: ({ currentTrack }) => {
    return {
      fetchPolicy: 'cache-and-network',
      variables: { input: { id: currentTrack ? currentTrack : 0 } },
    };
  },
});
