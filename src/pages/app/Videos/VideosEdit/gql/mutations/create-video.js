import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import qs from 'qs';

import mutator from 'mutator';
import { GET_VIDEOS } from 'pages/app/Videos/gql';

export default graphql(
  gql`
    mutation CreateVideo($input: CreateVideoInput!) {
      createVideo(input: $input) {
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
      createVideo: async input => {
        return mutator(() =>
          mutate({
            variables: { input },
            update: (proxy, { data: { createVideo } }) => {
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
                    results: data.getVideos.results.concat(createVideo)
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
