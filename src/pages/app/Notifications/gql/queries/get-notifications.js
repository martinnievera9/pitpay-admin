import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import qs from 'qs';

export const query = gql`
  query GetNotificationsAdmin($input: GetNotificationsAdminInput!) {
    getNotificationsAdmin(input: $input) {
      count
      results {
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
