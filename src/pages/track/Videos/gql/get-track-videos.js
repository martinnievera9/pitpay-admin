import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import qs from 'qs';

export const GetTrackVideos = gql`
  query GetTrackVideos($input: GetVideosInput!) {
    getTrackVideos(input: $input) {
      count
      results {
        id
        title
        url
        image
        runtime
        iframe
        description
        vimeoId
      }
    }
  }
`;

export default graphql(GetTrackVideos, {
  options: (props) => {
    const search = qs.parse(props.location.search, { ignoreQueryPrefix: true });
    return {
      fetchPolicy: 'cache-and-network',
      variables: { input: search }
    };
  }
});
