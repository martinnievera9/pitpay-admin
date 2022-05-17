import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import mutator from 'mutator';
import { query } from '../queries/get-track-types';

export default graphql(
  gql`
    mutation DeleteTrackType($id: Int!) {
      deleteTrackType(id: $id)
    }
  `,
  {
    props: ({ mutate }) => ({
      deleteTrackType: async ({ id, type, object_id }) => {
        return mutator(() =>
          mutate({
            variables: { id },

            update: (proxy, { data: { deleteTrackType } }) => {
              if (!deleteTrackType) return;

              try {
                const data = proxy.readQuery({
                  query,
                  variables: { input: {} }
                });
                const index = data.getTrackTypesAdmin.results.findIndex(
                  (type) => type.id === id
                );
                if (index > -1) {
                  data.getTrackTypesAdmin.results.splice(index, 1);
                }

                proxy.writeQuery({
                  query,
                  variables: {
                    input: {}
                  },
                  data
                });
              } catch (error) {
                console.error(error);
              }
            }
          })
        );
      }
    })
  }
);
