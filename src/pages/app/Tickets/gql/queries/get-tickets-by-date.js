import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';

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
    return {
      variables: {
        input: {
          event_id: parseInt(props.eventID),
          date: props.date,
        },
      },
      fetchPolicy: 'no-cache',
    };
  },
});
