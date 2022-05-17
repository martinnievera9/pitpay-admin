import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import qs from 'qs';

export const query = gql`
  query GetTrackNotifications($input: GetNotificationsAdminInput!) {
    getTrackNotifications(input: $input) {
      count
      results {
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
  }
`;

export default graphql(query, {
  options: (props) => {
    const search = qs.parse(props.location.search, { ignoreQueryPrefix: true });

    return {
      variables: { input: search },
      fetchPolicy: 'cache-and-network',
    };
  },
});
