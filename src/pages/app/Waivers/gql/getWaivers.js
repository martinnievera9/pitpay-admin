import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import qs from 'qs';

export const query = gql`
  query GetAdminWaivers($input: GetWaiversInput!) {
    getAdminWaivers(input: $input) {
      count
      results {
        id
        name
        waiver_id
      }
    }
  }
`;

export default graphql(query, {
  options: props => {
    const search = qs.parse(props.location.search, { ignoreQueryPrefix: true });
    return {
      variables: { input: search },
      fetchPolicy: 'cache-and-network'
    };
  }
});
