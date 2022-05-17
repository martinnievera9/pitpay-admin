import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import mutator from 'mutator';
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
export default graphql(
  gql`
    mutation Login($input: LoginInput!) {
      login(input: $input) {
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
  `,
  {
    props: ({ mutate }) => ({
      login: async (input) => {
        return mutator(() =>
          mutate({
            variables: { input },
          })
        );
      },
    }),
  }
);
