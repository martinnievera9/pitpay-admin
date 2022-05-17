import gql from 'graphql-tag';
export const REQUEST_CODE = gql`
  mutation requestCode($input: RequestCodeInput!) {
    requestCode(input: $input)
  }
`;
export const VERIFY_CODE = gql`
  mutation verifyCode($code: String!) {
    verifyCode(code: $code) {
      id
      cellphone
      email
      jwt
      first_name
      last_name
      role
      address
      ownership {
        tracks {
          id
          name
        }
        series {
          id
          name
        }
      }
      track {
        id
      }
      series {
        id
      }
      message_center
      registrations
    }
  }
`;
export const ADD_ADDRESS = gql`
  mutation addAddress($input: CreateAccountAddressInput!) {
    addAddress(input: $input)
  }
`;
export const CREATE_ACCOUNT = gql`
  mutation createAccount($input: CreateAccountInput!) {
    createAccount(input: $input) {
      id
      email
    }
  }
`;
export const PROMOTER_SIGNUP = gql`
  mutation promoterSignup($input: GASignupInput!) {
    promoterSignup(input: $input) {
      id
      cellphone
      email
      jwt
      first_name
      last_name
      role
      address
      ownership {
        tracks {
          id
          name
        }
        series {
          id
          name
        }
      }
      track {
        id
      }
      series {
        id
      }
      message_center
      registrations
    }
  }
`;
