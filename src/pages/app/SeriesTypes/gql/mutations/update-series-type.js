import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import mutator from 'mutator';
import { query } from '../queries/get-series-types';

export default graphql(
  gql`
    mutation UpdateSeriesType($input: UpdateSeriesTypeInput!) {
      updateSeriesType(input: $input) {
        id
        name
        slug
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      updateSeriesType: async (input) => {
        return mutator(() =>
          mutate({
            variables: { input },
            update: (proxy, { data: { updateSeriesType } }) => {
              let updatedId = parseInt(input.id);
              const data = proxy.readQuery({
                query,
                variables: { input }
              });

              proxy.writeQuery({
                query,
                variables: { input },
                data: {
                  ...data,
                  getSeriesTypesAdmin: data.getSeriesTypesAdmin.results.map(
                    (type) =>
                      type.id === updatedId
                        ? {
                            ...updateSeriesType,
                            value: updateSeriesType.slug,
                            key: updateSeriesType.name
                          }
                        : type
                  )
                }
              });
            }
          })
        );
      }
    })
  }
);
