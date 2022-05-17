import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import qs from 'qs';

import mutator from 'mutator';
import { query } from '../queries/get-promos';

export default graphql(
  gql`
    mutation DeletePromo($id: Int!) {
      deletePromo(id: $id)
    }
  `,
  {
    props: ({ mutate }) => ({
      deletePromo: async ({ id, type, object_id }) => {
        return mutator(() =>
          mutate({
            variables: { id },
            update: (proxy, { data: { deletePromo } }) => {
              const search = qs.parse(window.location.search, {
                ignoreQueryPrefix: true
              });

              if (!deletePromo) {
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
                  getPromos: {
                    ...data.getPromos,
                    count: data.getPromos.count - 1,
                    results: data.getPromos.results.filter(
                      (promo) => promo.id !== id
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
