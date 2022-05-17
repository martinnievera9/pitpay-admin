import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import mutator from 'mutator';

export default graphql(
  gql`
    mutation GetListsById($input: GetListsByInput!) {
      getListsById(input: $input) {
        id
        code
        name
        recipient_count
        track_id
        series_id
        track {
          id
          name
        }
        series {
          id
          name
        }
        messages_sent
        reply_message
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      getListsById: async (input) => {
        return mutator(() =>
          mutate({
            variables: { input },
          })
        );
      },
    }),
  }
);
