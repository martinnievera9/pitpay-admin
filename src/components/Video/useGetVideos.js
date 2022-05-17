import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { VideoFieldsFragment } from 'fragments/video.fragments';

export const GET_TRACK_VIDEOS = gql`
  query GetTrackVideos($input: GetVideosInput!) {
    getTrackVideos(input: $input) {
      count
      results {
        ...videoFields
      }
    }
  }
  ${VideoFieldsFragment}
`;

export const GET_EMPLOYEE_VIDEOS = gql`
  query GetEmployeeVideos($input: GetVideosInput!) {
    getEmployeeVideos(input: $input) {
      count
      results {
        ...videoFields
      }
    }
  }
  ${VideoFieldsFragment}
`;

export function useGetVideos(type) {
  const QUERY = type === 'track' ? GET_TRACK_VIDEOS : GET_EMPLOYEE_VIDEOS;
  const { data, loading, error } = useQuery(QUERY, {
    variables: { input: { queryString: '' } }
  });
  return { data, loading, error };
}
