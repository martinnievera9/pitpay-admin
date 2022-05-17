import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import mutator from 'mutator';
import { query } from '../queries/get-series-types';

export default graphql(
  gql`
    mutation CreateSeriesType($name: String!) {
      createSeriesType(name: $name) {
        id
        name
        slug
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      createSeriesType: async (name) => {
        return mutator(() =>
          mutate({
            variables: { name },
            update: (proxy, { data: { createSeriesType } }) => {
              try {
                const data = proxy.readQuery({
                  query,
                  variables: { input: {} }
                });

                proxy.writeQuery({
                  query,
                  variables: { input: {} },
                  data: {
                    ...data,
                    getSeriesTypesAdmin: {
                      results: data.getSeriesTypesAdmin.results.concat([
                        {
                          ...createSeriesType,
                          value: createSeriesType.slug,
                          key: createSeriesType.name
                        }
                      ])
                    }
                  }
                });
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
