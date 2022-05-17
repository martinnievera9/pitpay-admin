import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import qs from 'qs';

import mutator from 'mutator';
import { query } from '../queries/get-promos';

export default graphql(
  gql`
    mutation UpdatePromo($input: UpdatePromoInput!) {
      updatePromo(input: $input) {
        id
        name
        expiration
        no_expiration
        ticket_discount
        service_discount
        is_expired
        limit
        dollar_amount
        free_ticket
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      updatePromo: async input => {
        return mutator(() =>
          mutate({
            variables: { input },
            update: (proxy, { data: { updatePromo } }) => {
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
                  getPromos: {
                    ...data.getPromos,
                    count: data.getPromos.count + 1,
                    results: data.getPromos.results.reduce((acc, promo) => {
                      if (parseInt(promo.id) === parseInt(input.id)) {
                        return acc.concat([updatePromo]);
                      }
                      return acc.concat([promo]);
                    }, [])
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
