import gql from 'graphql-tag';

export const query = gql`
  subscription Newbarcode($input: GetEventTicketsInput!) {
    newBarcode(input: $input) {
      id
      barcode
      gaBarcode
      is_checked
      person_name
      ticket_name
    }
  }
`;
