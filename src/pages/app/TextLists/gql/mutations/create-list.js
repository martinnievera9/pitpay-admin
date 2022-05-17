import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import mutator from 'mutator';
import { query } from '../queries/get-lists';

export default graphql(
  gql`
    mutation CreateTextList($input: CreateTextListInput!) {
      createTextList(input: $input) {
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
      createTextList: async (input) => {
        return mutator(() =>
          mutate({
            variables: { input },
            update: (proxy, { data: { createTextList } }) => {
              try {
                const data = proxy.readQuery({
                  query,
                  variables: { input: {} },
                });

                proxy.writeQuery({
                  query,
                  variables: { input: {} },
                  data: {
                    ...data,
                    getLists: {
                      results: data.getLists.results.concat([
                        {
                          ...createTextList,
                          value: createTextList.slug,
                          key: createTextList.name,
                        },
                      ]),
                    },
                  },
                });
              } catch (error) {
                console.error(error);
              }
            },
          })
        );
      },
    }),
  }
);
