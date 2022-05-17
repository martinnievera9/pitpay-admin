import gql from 'graphql-tag';

export const TicketFieldsFragment = gql`
  fragment ticketFields on EventTicket {
    id
    name
    price
    date
    start_date
    end_date
    type
    color_code
    isMultiDay
    gate_time
    start_time
    limit
    form_id
    form {
      id
    }
    description
  }
`;
