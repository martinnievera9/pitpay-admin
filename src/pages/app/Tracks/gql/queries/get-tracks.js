import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import qs from 'qs';

export const query = gql`
  query GetTracksAdmin($input: GetTracksAdminInput!) {
    getTracksAdmin(input: $input) {
      count
      results {
        id
        name
        short_name
        fullAddress
        timezone
        added_by
        type {
          id
          key
          value
        }
        phone
        status
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
