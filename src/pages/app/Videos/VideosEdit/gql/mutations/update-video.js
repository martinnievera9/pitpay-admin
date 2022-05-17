import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import qs from 'qs';

import mutator from 'mutator';
import { GET_VIDEOS } from 'pages/app/Videos/gql';

export default graphql(
  gql`
    mutation UpdateVideo($input: UpdateVideoInput!) {
      updateVideo(input: $input) {
        id
        title
        url
        image
        runtime
        iframe
        description
        category
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      updateVideo: async input => {
        return mutator(() =>
          mutate({
            variables: { input },
            update: (proxy, { data: { updateVideo } }) => {
              const search = qs.parse(window.location.search, {
                ignoreQueryPrefix: true
              });

              const data = proxy.readQuery({
                GET_VIDEOS,
                variables: { input: search }
              });

              proxy.writeQuery({
                GET_VIDEOS,
                variables: { input: search },
                data: {
                  ...data,
                  getVideos: {
                    ...data.getVideos,
                    count: data.getVideos.count + 1,
                    results: data.getVideos.results.reduce((acc, video) => {
                      if (parseInt(video.id) === parseInt(input.id)) {
                        return acc.concat([updateVideo]);
                      }
                      return acc.concat([video]);
                    }, [])
                  }
                }
              });
            }
          })
        );
      }
    })
  }
);
