import gql from 'graphql-tag';

export const GuestFieldsFragment = gql`
  fragment guestFields on Guest {
    id
    first_name
    last_name
    phone_number
    year
    additional_guests
    event_id
    is_checked
    event {
      id
      name
      fullDate
    }
    notes
    ownership {
      value
      label
      type
    }
  }
`;
