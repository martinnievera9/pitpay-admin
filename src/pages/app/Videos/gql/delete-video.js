import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { graphql } from '@apollo/react-hoc';
import qs from 'qs';
import { useCallback } from 'react';

import mutator from 'mutator';
import { GET_VIDEOS, GET_VIDEOS_V2 } from './get-videos';
import { useVideoSearch } from './useVideoSearch';

export const DELETE_VIDEO = gql`
  mutation DeleteVideo($id: Int!) {
    deleteVideo(id: $id)
  }
`;

export function useDeleteVideo() {
  const [deleteMutation] = useMutation(DELETE_VIDEO);
  const { queryString } = useVideoSearch();
  const deleteVideo = useCallback(
    async id => {
      try {
        await deleteMutation({
          variables: { id },
          update: (cache, { data: { deleteVideo } }) => {
            if (!deleteVideo) {
              return;
            }

            const data = cache.readQuery({
              query: GET_VIDEOS_V2,
              variables: { queryString }
            });

            cache.writeQuery({
              query: GET_VIDEOS_V2,
              variables: { queryString },
              data: {
                ...data,
                getVideosV2: data.getVideosV2.filter(video => video.id !== id)
              }
            });
          }
        });
        return true;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    [deleteMutation, queryString]
  );
  return deleteVideo;
}

export default graphql(
  gql`
    mutation DeleteVideo($id: Int!) {
      deleteVideo(id: $id)
    }
  `,
  {
    props: ({ mutate }) => ({
      deleteVideo: async id => {
        return mutator(() =>
          mutate({
            variables: { id },
            update: (proxy, { data: { deleteVideo } }) => {
              const search = qs.parse(window.location.search, {
                ignoreQueryPrefix: true
              });

              if (!deleteVideo) {
                return;
              }

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
                    count: data.getVideos.count - 1,
                    results: data.getVideos.results.filter(
                      video => video.id !== id
                    )
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
