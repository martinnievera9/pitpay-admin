import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import qs from 'qs';

export const query = gql`
  query GetCustomerTransactions($input: UserTransactionListInput!) {
    getCustomerTransactions(input: $input) {
      count
      results {
        id
        fee
        refund
        discount
        total
        purchase_date
        status
        users {
          user {
            id
            name
          }
          tickets {
            id
            name
            price
            refunded
          }
        }
        event {
          id
          name
          tickets {
            id
            name
            price
          }
        }
        track {
          id
          name
        }
      }
    }
  }
`;

export default graphql(query, {
  options: ({ match, location }) => {
    const search = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    return {
      variables: { input: { user_id: Number(match.params.id), ...search } },
      fetchPolicy: 'cache-and-network',
    };
  },
});
