import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import mutator from 'mutator';
import qs from 'qs';
import { query } from '../../gql/queries/get-tracks';

export default graphql(
  gql`
    mutation UpdateTrack($input: UpdateTrackInput!) {
      updateTrack(input: $input) {
        id
        image
        logo
        image_id
        logo_id
        name
        short_name
        street
        state
        city
        zipcode
        phone
        website
        schedule
        added_by
        type {
          id
          key
          value
        }

        size
        bio
        twitter
        facebook
        instagram
        poc {
          id
        }
        user_id
        faqs {
          id
          question
          answer
        }
        status
        timezone
        fullAddress
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      updateTrack: async (input) => {
        const { type, object_id } = input;
        return mutator(() =>
          mutate({
            variables: { input },
            update: (proxy, { data: { updateTrack } }) => {
              const search = qs.parse(window.location.search, {
                ignoreQueryPrefix: true,
              });

              const variables =
                'track' === type
                  ? {
                      input: { ...search, track_id: parseInt(object_id, 10) },
                    }
                  : {
                      input: {
                        ...search,
                        series_id: parseInt(object_id, 10),
                      },
                    };

              const data = proxy.readQuery({
                query,
                variables,
              });

              proxy.writeQuery({
                query,
                variables,
                data: {
                  ...data,
                  getTracksAdmin: {
                    ...data.getTracksAdmin,
                    count: data.getTracksAdmin.count + 1,
                    results: data.getTracksAdmin.results.reduce(
                      (acc, track) => {
                        if (parseInt(track.id) === parseInt(input.id)) {
                          return acc.concat([updateTrack]);
                        }
                        return acc.concat([track]);
                      },
                      []
                    ),
                  },
                },
              });
            },
          })
        );
      },
    }),
  }
);
