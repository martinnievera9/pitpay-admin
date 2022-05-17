import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import qs from 'qs';

import mutator from 'mutator';
import { query } from '../queries/get-series';

export default graphql(
  gql`
    mutation DeleteSeries($id: Int!) {
      deleteSeries(id: $id)
    }
  `,
  {
    props: ({ mutate }) => ({
      deleteSeries: async (id) => {
        return mutator(() =>
          mutate({
            variables: { id },
            update: (proxy, { data: { deleteSeries } }) => {
              const search = qs.parse(window.location.search, {
                ignoreQueryPrefix: true
              });

              if (!deleteSeries) {
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
                  getSeriesAdmin: {
                    ...data.getSeriesAdmin,
                    count: data.getSeriesAdmin.count - 1,
                    results: data.getSeriesAdmin.results.filter(
                      (series) => series.id !== id
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
