import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import qs from 'qs';

export const query = gql`
  query GetLists($input: GetTextListsInput!) {
    getLists(input: $input) {
      count
      results {
        id
        code
        name
        recipient_count
        track_id
        series_id
        track {
          id
          name
        }
        series {
          id
          name
        }
        messages_sent
        reply_message
      }
    }
  }
`;

export default graphql(query, {
  options: (props) => {
    let search = {};
    if (props.location) {
      search = qs.parse(props.location.search, {
        ignoreQueryPrefix: true,
      });
    } else {
      search = {};
    }

    return {
      variables: { input: search },
      fetchPolicy: 'cache-and-network',
    };
  },
});
