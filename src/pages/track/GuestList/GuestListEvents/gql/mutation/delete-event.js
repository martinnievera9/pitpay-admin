import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import qs from 'qs';

import mutator from 'mutator';
import { GET_USER_EVENTS as query } from 'components/Events/gql';

export default graphql(
  gql`
    mutation DeleteEvent($id: Int!) {
      deleteEvent(id: $id)
    }
  `,
  {
    props: ({ mutate }) => ({
      deleteEvent: async ({ id, type, object_id }) => {
        return mutator(() =>
          mutate({
            variables: { id },
            update: (proxy, { data: { deleteEvent } }) => {
              const search = qs.parse(window.location.search, {
                ignoreQueryPrefix: true
              });

              if (!deleteEvent) {
                return;
              }

              const data = proxy.readQuery({
                query,
                variables:
                  'track' === type
                    ? {
                        input: { ...search, track_id: parseInt(object_id, 10) }
                      }
                    : {
                        input: {
                          ...search,
                          series_id: parseInt(object_id, 10)
                        }
                      }
              });

              proxy.writeQuery({
                query,
                variables:
                  'track' === type
                    ? {
                        input: { ...search, track_id: parseInt(object_id, 10) }
                      }
                    : {
                        input: {
                          ...search,
                          series_id: parseInt(object_id, 10)
                        }
                      },
                data: {
                  ...data,
                  getEventsAdmin: {
                    ...data.getEventsAdmin,
                    count: data.getEventsAdmin.count - 1,
                    results: data.getEventsAdmin.results.filter(
                      event => event.id !== id
                    )
                  }
                }
              });
            }
          })
        );
      }
    })
  }
);
