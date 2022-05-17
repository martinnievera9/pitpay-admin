import { useQuery } from '@apollo/react-hooks';
import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import { VideoFieldsFragment } from 'fragments/video.fragments';

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

export default graphql(GET_EMPLOYEE_VIDEOS, {
  options: () => {
    return {
      fetchPolicy: 'cache-and-network',
      variables: {
        input: { queryString: '' }
      }
    };
  }
});

export function useGetEmployeeVideos() {
  const { data, loading, error } = useQuery(GET_EMPLOYEE_VIDEOS, {
    variables: { queryString: '' }
  });
  return { data, loading, error };
}
