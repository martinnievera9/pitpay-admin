import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import mutator from 'mutator';
import qs from 'qs';
import { query } from '../queries/get-series';

export default graphql(
  gql`
    mutation UpdateSeries($input: UpdateSeriesInput!) {
      updateSeries(input: $input) {
        id
        image
        logo
        image_id
        logo_id
        name
        short_name
        added_by
        website
        schedule
        type_id
        user_id
        type {
          id
          key
          value
        }
        bio
        twitter
        facebook
        instagram
        faqs {
          question
          answer
        }
        status
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      updateSeries: async (input) => {
        return mutator(() =>
          mutate({
            variables: { input },
            update: (proxy, { data: { updateSeries } }) => {
              const search = qs.parse(window.location.search, {
                ignoreQueryPrefix: true,
              });

              const data = proxy.readQuery({
                query,
                variables: { input: search },
              });

              proxy.writeQuery({
                query,
                variables: { input: search },
                data: {
                  ...data,
                  getSeriesAdmin: {
                    ...data.getSeriesAdmin,
                    count: data.getSeriesAdmin.count + 1,
                    results: data.getSeriesAdmin.results.reduce(
                      (acc, series) => {
                        if (parseInt(series.id) === parseInt(input.id)) {
                          return acc.concat([updateSeries]);
                        }
                        return acc.concat([series]);
                      },
                      []
                    ),
                  },
                },
              });
            },
          })
        );
      },
    }),
  }
);
