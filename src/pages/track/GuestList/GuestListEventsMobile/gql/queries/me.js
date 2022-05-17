import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import qs from 'qs';

export const query = gql`
  query Me($getUserEventsInput: GetUserEventsInput!) {
    me {
      id
      track {
        id
        name
        logo
        cityAndState
      }
      series {
        id
        name
        logo
        website
        type {
          key
          value
        }
      }
      first_name
      last_name
    }
    getUserEvents(input: $getUserEventsInput) {
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
      variables: { getUserEventsInput: search },
      fetchPolicy: 'cache-and-network'
    };
  }
});
