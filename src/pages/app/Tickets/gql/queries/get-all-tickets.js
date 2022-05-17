import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';

export const query = gql`
  query GetAllTickets($event_id: Int!) {
    getAllTickets(event_id: $event_id) {
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
        event_id: parseInt(props.eventID),
      },
      fetchPolicy: 'no-cache',
    };
  },
});
