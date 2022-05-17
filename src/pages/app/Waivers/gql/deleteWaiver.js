import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import qs from 'qs';

import mutator from 'mutator';
import { query } from './getWaivers';

export default graphql(
  gql`
    mutation DeleteWaiver($id: Int!) {
      deleteWaiver(id: $id)
    }
  `,
  {
    props: ({ mutate }) => ({
      deleteWaiver: async (id) => {
        return mutator(() =>
          mutate({
            variables: { id },
            update: (proxy, { data: { deleteWaiver } }) => {
              const search = qs.parse(window.location.search, {
                ignoreQueryPrefix: true
              });

              const data = proxy.readQuery({
                query,
                variables: { input: search }
              });

              proxy.writeQuery({
                query,
                variables: { input: search },
                data: {
                  ...data,
                  getAdminWaivers: {
                    ...data.getAdminWaivers,
                    count: data.getAdminWaivers.count - 1,
                    results: data.getAdminWaivers.results.filter(
                      (item) => item.id !== id
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
