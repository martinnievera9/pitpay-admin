import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import mutator from 'mutator';
import { query } from '../queries/get-track-types';

export default graphql(
  gql`
    mutation CreateTrackType($name: String!) {
      createTrackType(name: $name) {
        id
        name
        slug
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      createTrackType: async (name) => {
        return mutator(() =>
          mutate({
            variables: { name },
            update: (proxy, { data: { createTrackType } }) => {
              try {
                const data = proxy.readQuery({
                  query,
                  variables: { input: {} }
                });

                proxy.writeQuery({
                  query,
                  variables: {
                    input: {}
                  },
                  data: {
                    ...data,
                    getTrackTypesAdmin: {
                      results: data.getTrackTypesAdmin.results.concat([
                        {
                          ...createTrackType,
                          value: createTrackType.slug,
                          key: createTrackType.name
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
