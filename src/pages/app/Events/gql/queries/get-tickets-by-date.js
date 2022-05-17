/* eslint-disable */
import { graphql } from '@apollo/react-hoc';
import dayjs from 'dayjs';
import gql from 'graphql-tag';

export const query = gql`
  query GetTicketsByDate($input: GetEventTicketsInput!) {
    getTicketsByDate(input: $input) {
      id
      name
      price
      date
    }
  }
`;
export const secondQuery = gql`
  query GetTicketsByOtherDate($input: GetEventTicketsInput!) {
    getTicketsByDate(input: $input) {
      id
      name
      price
      date
    }
  }
`;
export default graphql(query, {
  options: (props) => {
    return {
      variables: {
        input: {
          event_id: props.selectedEvent.id,
          date: dayjs(props.selectedEvent.start_date, 'MM-DD-YYYY').format(
            'MM DD-YYYY'
          ),
        },
      },
      fetchPolicy: 'no-cache',
    };
  },
});
