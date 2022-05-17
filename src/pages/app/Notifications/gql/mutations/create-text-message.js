import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import mutator from 'mutator';
import { query } from '../queries/get-notifications';

export default graphql(
  gql`
    mutation CreateTextMessage($input: CreateTextMessage!) {
      createTextMessage(input: $input) {
        id
        message
        title
        date
        unixTimestamp
        user {
          first_name
          last_name
        }
        track
        series
        event
        list
        num_users
        type
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      createTextMessage: async (input) => {
        return mutator(() =>
          mutate({
            variables: { input },
            update: (proxy, { data: { createTextMessage } }) => {
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
                    getNotificationsAdmin: {
                      ...data.getNotificationsAdmin,
                      count: data.getNotificationsAdmin.count + 1,
                      results: [createTextMessage].concat(
                        data.getNotificationsAdmin.results
                      ),
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
