import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import qs from 'qs';

export const query = gql`
  query GetSeriesAdmin($input: GetSeriesAdminInput!) {
    getSeriesAdmin(input: $input) {
      count
      results {
        id
        logo
        name
        short_name
        added_by
        type {
          id
          key
          value
        }
        events {
          id
        }
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
