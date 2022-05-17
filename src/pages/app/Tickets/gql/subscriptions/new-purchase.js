import gql from 'graphql-tag';

export const query = gql`
  subscription NewPurchase($input: GetParticipantsList!) {
    newTicket(input: $input) {
      id
      is_checked
      barcode
      transfer {
        id
        name
        first_name
        last_name
        phone_number
        calling_code
        date
      }
      associated_tickets {
        id
        is_checked
        name
        barcode

        transfer {
          id
          name
          first_name
          last_name
          phone_number
          calling_code
        }
      }
      transaction {
        id
        total
      }
      user {
        name
        first_name
        last_name
      }
      ticket {
        price
        name
      }
      refunded
      cost
    }
  }
`;
