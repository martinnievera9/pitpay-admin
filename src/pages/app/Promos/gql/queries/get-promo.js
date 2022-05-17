import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';

export const query = gql`
  query GetPromo($id: Int!) {
    getPromo(id: $id) {
      id
      name
      expiration
      no_expiration
      ticket_discount
      service_discount
      is_expired
      issuer
      limit
      track_id
      series_id
      dollar_amount
      free_ticket
    }
  }
`;

export default graphql(query, {
  options: ({ currentPromo }) => {
    return {
      variables: {
        id: currentPromo || 0
      },
      fetchPolicy: 'cache-and-network'
    };
  }
});
