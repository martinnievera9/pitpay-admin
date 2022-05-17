import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';

export const query = gql`
  query GetSeriesDetail($input: GetSeriesDetailInput!) {
    getSeriesDetail(input: $input) {
      id
      name
      logo
      website
      type {
        id
        key
        value
      }
    }
  }
`;

export default graphql(query, {
  options: (props) => {
    return {
      variables: { input: { id: parseInt(props.me.series.id, 10) } },
      fetchPolicy: 'cache-and-network'
    };
  }
});
