import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import mutator from 'mutator';
import qs from 'qs';
import { query } from '../queries/get-series';

export default graphql(
  gql`
    mutation CreateSeries($input: CreateSeriesInput!) {
      createSeries(input: $input) {
        id
        logo
        image_id
        logo_id
        name
        short_name
        website
        schedule
        added_by
        events {
          id
          name
        }
        type_id
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
      createSeries: async (input) => {
        return mutator(() =>
          mutate({
            variables: { input },
            update: (proxy, { data: { createSeries } }) => {
              const search = qs.parse(window.location.search, {
                ignoreQueryPrefix: true,
              });

              const data = proxy.readQuery({
                query,
                variables: { input: search },
              });

              const sort = (createSeries) => {
                const newResults = data.getSeriesAdmin.results.concat(
                  createSeries
                );

                newResults.sort(function (a, b) {
                  if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1;
                  }
                  if (a.name > b.name) {
                    return 1;
                  }
                  return 0;
                });

                return newResults;
              };

              proxy.writeQuery({
                query,
                variables: { input: search },
                data: {
                  ...data,
                  getSeriesAdmin: {
                    ...data.getSeriesAdmin,
                    count: data.getSeriesAdmin.count + 1,
                    results: sort(createSeries),
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
