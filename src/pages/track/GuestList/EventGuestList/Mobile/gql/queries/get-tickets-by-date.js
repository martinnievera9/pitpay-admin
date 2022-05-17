import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import qs from 'qs';

export const query = gql`
  query GetTicketsByDate($input: GetEventTicketsInput!) {
    getTicketsByDate(input: $input) {
      id
      name
      price
      date
      start_date
      end_date
      color_code
    }
  }
`;

export default graphql(query, {
  options: (props) => {
    const { queryString, date } = qs.parse(props.location.search, {
      ignoreQueryPrefix: true
    });

    return {
      variables: {
        input: {
          event_id: parseInt(props.match.params.id),
          date
        }
      },
      fetchPolicy: 'no-cache'
    };
  }
});
