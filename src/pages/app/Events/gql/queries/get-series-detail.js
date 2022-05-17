import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';

export const query = gql`
  query GetSeriesDetail($input: GetSeriesDetailInput!) {
    getSeriesDetail(input: $input) {
      id
      logo
      name
      type {
        id
        value
        key
      }
      website
    }
  }
`;
export default graphql(query, {
  options: ({ id }) => {
    return {
      variables: { input: { id: parseInt(id, 10) } },
      fetchPolicy: 'cache-and-network'
    };
  }
});
