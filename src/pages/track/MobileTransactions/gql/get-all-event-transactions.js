import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';

export const query = gql`
  query GetAllEventTransactions($event_id: Int!) {
    getAllEventTransactions(event_id: $event_id) {
      count
      results {
        id
        fee
        total
        refund
        discount
        card {
          last4
        }
        purchase_date
        status
        user {
          id
          name
          first_name
          last_name
        }
        users {
          promo
          user {
            id
            name
            first_name
            last_name
          }
          tickets {
            id
            name
            price
            refunded
          }
        }
      }
    }
  }
`;
export default graphql(query, {
  options: ({ match }) => {
    return {
      variables: {
        event_id: Number(match.params.id)
      },
      fetchPolicy: 'cache-and-network'
    };
  }
});
