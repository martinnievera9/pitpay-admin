import gql from 'graphql-tag';

export const query = gql`
  subscription NewPurchase($input: GetParticipantsList!) {
    newPurchase(input: $input) {
      id
      pass_id
      name
      is_checked
      is_pending
      promo_code
      duty
      age
      birthday
      user_id
      email
      phone
      address
      status
      has_waiver
      tickets {
        id
        ticket_name
        is_checked
        cost
        status
      }
      parents {
        id
        first_name
        last_name
        cellphone
        user_id
      }
    }
  }
`;
