import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import qs from 'qs';

export const query = gql`
  query GetPromos($input: GetPromosInput!) {
    getPromos(input: $input) {
      count
      results {
        id
        name
        expiration
        no_expiration
        ticket_discount
        service_discount
        is_expired
        issuer
        limit
        dollar_amount
        free_ticket
      }
    }
  }
`;

export default graphql(query, {
  options: props => {
    const search = qs.parse(props.location.search, { ignoreQueryPrefix: true });

    return {
      fetchPolicy: 'cache-and-network',
      variables: {
        input: search
      }
    };
  }
});
