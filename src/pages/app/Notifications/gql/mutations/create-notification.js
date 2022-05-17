import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import mutator from 'mutator';
import { query } from '../queries/get-notifications';

export default graphql(
  gql`
    mutation CreateNotification($input: CreateNotification!) {
      createNotification(input: $input) {
        id
        message
        title
        date
        unixTimestamp
        user {
          first_name
          last_name
        }
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      createNotification: async input => {
        return mutator(() =>
          mutate({
            variables: { input },
            update: (proxy, { data: { createNotification } }) => {
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
                    getNotificationsAdmin: {
                      ...data.getNotificationsAdmin,
                      count: data.getNotificationsAdmin.count + 1,
                      results: [createNotification].concat(
                        data.getNotificationsAdmin.results
                      )
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
