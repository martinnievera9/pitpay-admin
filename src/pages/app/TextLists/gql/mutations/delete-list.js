import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import mutator from 'mutator';
import { query } from '../queries/get-lists';

export default graphql(
  gql`
    mutation DeleteTextList($id: Int!) {
      deleteTextList(id: $id)
    }
  `,
  {
    props: ({ mutate }) => ({
      deleteTextList: async ({ id }) => {
        return mutator(() =>
          mutate({
            variables: { id },

            update: (proxy, { data: { deleteTextList } }) => {
              if (!deleteTextList) return;

              try {
                const data = proxy.readQuery({
                  query,
                  variables: { input: {} },
                });
                const index = data.getLists.results.findIndex(
                  (type) => type.id === id
                );
                if (index > -1) {
                  data.getLists.results.splice(index, 1);
                }

                proxy.writeQuery({ query, variables: { input: {} }, data });
              } catch (error) {
                console.error(error);
              }
            },
          })
        );
      },
    }),
  }
);
