import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import mutator from 'mutator';
import { query } from '../queries/get-lists';

export default graphql(
  gql`
    mutation UpdateTextList($input: UpdateTextListInput!) {
      updateTextList(input: $input) {
        id
        code
        name
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
        recipient_count
        reply_message
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      updateTextList: async (input) => {
        return mutator(() =>
          mutate({
            variables: { input },
            update: (proxy, { data: { updateTextList } }) => {
              const updatedId = parseInt(input.id);
              const data = proxy.readQuery({
                query,
                variables: { input },
              });

              proxy.writeQuery({
                query,
                variables: { input },
                data: {
                  ...data,
                  getLists: data.getLists.results.map((type) =>
                    type.id === updatedId
                      ? {
                          ...updateTextList,
                          value: updateTextList.slug,
                          key: updateTextList.name,
                        }
                      : type
                  ),
                },
              });
            },
          })
        );
      },
    }),
  }
);
