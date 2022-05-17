import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';

import mutator from 'mutator';
import { query } from '../queries/get-track-notifications';

export default graphql(
  gql`
    mutation CreateNotification($input: CreateNotification!) {
      createNotification(input: $input) {
        id
        message
        title
        date
        series_id
        track_id
        unixTimestamp
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      createNotification: async (input) => {
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
                    getTrackNotifications: {
                      ...data.getTrackNotifications,
                      count: data.getTrackNotifications.count + 1,
                      results: [createNotification].concat(
                        data.getTrackNotifications.results
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
