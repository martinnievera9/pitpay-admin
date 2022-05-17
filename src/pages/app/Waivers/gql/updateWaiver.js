import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import qs from 'qs';

import mutator from 'mutator';
import { query } from '../gql/getWaivers';

export default graphql(
  gql`
    mutation UpdateWaiver($input: UpdateWaiverInput!) {
      updateWaiver(input: $input) {
        id
        waiver_id
        name
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      updateWaiver: async (input) => {
        return mutator(() =>
          mutate({
            variables: { input },
            update: (proxy, { data: { updateWaiver } }) => {
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
                    results: data.getAdminWaivers.results.reduce(
                      (acc, item) => {
                        if (parseInt(item.id) === parseInt(input.id)) {
                          return acc.concat([updateWaiver]);
                        }
                        return acc.concat([item]);
                      },
                      []
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
