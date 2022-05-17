import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import mutator from 'mutator';
import { query } from '../queries/get-track-types';

export default graphql(
  gql`
    mutation UpdateTrackType($input: UpdateTrackTypeInput!) {
      updateTrackType(input: $input) {
        id
        name
        slug
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      updateTrackType: async (input) => {
        return mutator(() =>
          mutate({
            variables: { input },
            update: (proxy, { data: { updateTrackType } }) => {
              let updatedId = parseInt(input.id);
              const data = proxy.readQuery({
                query,
                variables: { input: {} }
              });

              proxy.writeQuery({
                query,
                data: {
                  ...data,
                  getTrackTypes: data.getTrackTypesAdmin.results.map((type) =>
                    type.id === updatedId
                      ? {
                          ...updateTrackType,
                          value: updateTrackType.slug,
                          key: updateTrackType.name
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
