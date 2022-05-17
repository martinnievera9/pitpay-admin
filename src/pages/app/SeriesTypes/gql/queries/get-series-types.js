import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import qs from 'qs';

export const query = gql`
  query GetSeriesTypesAdmin($input: GetSeriesTypesInput!) {
    getSeriesTypesAdmin(input: $input) {
      count
      results {
        id
        name
        slug
      }
    }
  }
`;

export default graphql(query, {
  options: (props) => {
    let search = {};
    if (props.location) {
      search = qs.parse(props.location.search, {
        ignoreQueryPrefix: true
      });
    } else {
      search = {};
    }

    return {
      variables: { input: search },
      fetchPolicy: 'cache-and-network'
    };
  }
});
