import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';

export const query = gql`
  query GetPromoterLists {
    getPromoterLists {
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
`;

export default graphql(query, {
  options: () => {
    return {
      variables: {},
      fetchPolicy: 'cache-and-network',
    };
  },
});
