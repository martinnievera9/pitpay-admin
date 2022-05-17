import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import qs from 'qs';

import mutator from 'mutator';
import { query } from '../queries/get-tracks';

export default graphql(
  gql`
    mutation DeleteTrack($id: Int!) {
      deleteTrack(id: $id)
    }
  `,
  {
    props: ({ mutate }) => ({
      deleteTrack: async (id) => {
        return mutator(() =>
          mutate({
            variables: { id },
            update: (proxy, { data: { deleteTrack } }) => {
              const search = qs.parse(window.location.search, {
                ignoreQueryPrefix: true
              });

              if (!deleteTrack) {
                return;
              }

              const data = proxy.readQuery({
                query,
                variables: { input: search }
              });

              proxy.writeQuery({
                query,
                variables: { input: search },
                data: {
                  ...data,
                  getTracksAdmin: {
                    ...data.getTracksAdmin,
                    count: data.getTracksAdmin.count - 1,
                    results: data.getTracksAdmin.results.filter(
                      (track) => track.id !== id
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
