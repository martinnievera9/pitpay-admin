import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import qs from 'qs';

import mutator from 'mutator';
import { query } from '../gql/getWaivers';

export default graphql(
  gql`
    mutation CreateWaiver($input: CreateWaiverInput!) {
      createWaiver(input: $input) {
        id
        name
        waiver_id
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      createWaiver: async (input) => {
        return mutator(() =>
          mutate({
            variables: { input },
            update: (proxy, { data: { createWaiver } }) => {
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
                    count: data.getAdminWaivers.count + 1,
                    results: data.getAdminWaivers.results.concat(createWaiver)
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
