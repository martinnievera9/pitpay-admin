import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import mutator from 'mutator';
import { query } from '../queries/get-series-types';

export default graphql(
  gql`
    mutation DeleteSeriesType($id: Int!) {
      deleteSeriesType(id: $id)
    }
  `,
  {
    props: ({ mutate }) => ({
      deleteSeriesType: async ({ id, type, object_id }) => {
        return mutator(() =>
          mutate({
            variables: { id },

            update: (proxy, { data: { deleteSeriesType } }) => {
              if (!deleteSeriesType) return;

              try {
                const data = proxy.readQuery({
                  query,
                  variables: { input: {} }
                });
                const index = data.getSeriesTypesAdmin.results.findIndex(
                  (type) => type.id === id
                );
                if (index > -1) {
                  data.getSeriesTypesAdmin.results.splice(index, 1);
                }

                proxy.writeQuery({ query, variables: { input: {} }, data });
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
