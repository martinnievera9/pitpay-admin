import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import mutator from 'mutator';
import qs from 'qs';
import { query } from '../../gql/queries/get-tracks';

export default graphql(
  gql`
    mutation CreateTrack($input: CreateTrackInput!) {
      createTrack(input: $input) {
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
        type_id
        size
        bio
        twitter
        facebook
        instagram
        added_by
        type {
          id
          key
          value
        }
        poc {
          id
        }
        hasLiked
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
      createTrack: async (input) => {
        return mutator(() =>
          mutate({
            variables: { input },
            update: (proxy, { data: { createTrack } }) => {
              const search = qs.parse(window.location.search, {
                ignoreQueryPrefix: true,
              });

              const data = proxy.readQuery({
                query,
                variables: { input: search },
              });

              const sort = (createTrack) => {
                const newResults = data.getTracksAdmin.results.concat(
                  createTrack
                );

                newResults.sort(function (a, b) {
                  if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1;
                  }
                  if (a.name > b.name) {
                    return 1;
                  }
                  return 0;
                });

                return newResults;
              };

              proxy.writeQuery({
                query,
                variables: { input: search },
                data: {
                  ...data,
                  getTracksAdmin: {
                    ...data.getTracksAdmin,
                    count: data.getTracksAdmin.count + 1,
                    results: sort(createTrack),
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
