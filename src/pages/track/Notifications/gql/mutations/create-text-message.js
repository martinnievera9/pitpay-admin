import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import mutator from 'mutator';
import { query } from '../queries/get-track-notifications';

export default graphql(
  gql`
    mutation CreateTextMessage($input: CreateTextMessage!) {
      createTextMessage(input: $input) {
        id
        message
        title
        date
        series_id
        track_id
        unixTimestamp
        series
        track
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
                    getTrackNotifications: {
                      ...data.getTrackNotifications,
                      count: data.getTrackNotifications.count + 1,
                      results: [createTextMessage].concat(
                        data.getTrackNotifications.results
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
