import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useVideoSearch } from './useVideoSearch';

export const VideoResultFragment = gql`
  fragment videoResult on Video {
    id
    title
    url
    image
    runtime
    iframe
    description
    category
    order
  }
`;

export const GET_VIDEOS = gql`
  query GetVideos($input: GetVideosInput!) {
    getVideos(input: $input) {
      count
      results {
        ...videoResult
      }
    }
  }
  ${VideoResultFragment}
`;

export const GET_VIDEOS_V2 = gql`
  query GetVideosV2($queryString: String!) {
    getVideosV2(queryString: $queryString) {
      ...videoResult
    }
  }
  ${VideoResultFragment}
`;

export function useGetVideos() {
  const { input } = useVideoSearch();
  const { data, loading, error } = useQuery(GET_VIDEOS, {
    variables: { input }
  });
  const videos = data && data.getVideos;
  return { videos, loading, error };
}

export function useGetVideosV2() {
  const { queryString } = useVideoSearch();
  const { data, loading, error } = useQuery(GET_VIDEOS_V2, {
    variables: { queryString }
  });
  const videos = data && data.getVideosV2;
  return { videos, loading, error };
}
