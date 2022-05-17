import gql from 'graphql-tag';

export const RegistrationValuesFragment = gql`
  fragment registrationValues on RegistrationForm {
    id
    name
    user {
      first_name
      last_name
      name
    }
    data {
      name
      value
      label
    }
    promo {
      id
      name
    }
    purchase_date
    registration {
      name
      price
      color_code
    }
    is_checked
  }
`;
