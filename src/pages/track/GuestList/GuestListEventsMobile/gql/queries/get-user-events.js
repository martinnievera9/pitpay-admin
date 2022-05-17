import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import qs from 'qs';

export const query = gql`
  query GetUserEvents($input: GetUserEventsInput!) {
    getUserEvents(input: $input) {
      count
      results {
        id
        name
        image
        date
        start_date
        fullDate
        nextStartTime
        series {
          id
          name
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
      fetchPolicy: 'cache-and-network'
    };
  }
});
