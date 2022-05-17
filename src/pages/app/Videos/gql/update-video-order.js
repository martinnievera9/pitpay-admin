import { useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { GET_VIDEOS_V2, VideoResultFragment } from './get-videos';
import { useVideoSearch } from './useVideoSearch';

export const UPDATE_VIDEO_ORDER = gql`
  mutation($ids: [Int!]!) {
    updateVideoOrder(ids: $ids) {
      ...videoResult
    }
  }
  ${VideoResultFragment}
`;

export function useUpdateVideoOrder() {
  const [updateOrder] = useMutation(UPDATE_VIDEO_ORDER);
  const { queryString } = useVideoSearch();
  const updateVideoOrder = useCallback(
    async ids => {
      try {
        await updateOrder({
          variables: { ids },
          update: (cache, { data: { updateVideoOrder } }) => {
            if (!updateVideoOrder) {
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
                getVideosV2: updateVideoOrder
              }
            });
          }
        });
      } catch (error) {
        console.error(error);
      }
    },
    [queryString, updateOrder]
  );
  return updateVideoOrder;
}
