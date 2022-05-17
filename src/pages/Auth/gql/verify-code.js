import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import mutator from 'mutator';

export default graphql(
  gql`
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
  `,
  {
    props: ({ mutate }) => ({
      verifyCode: async (code) => {
        return mutator(() =>
          mutate({
            variables: { code },
          })
        );
      },
    }),
  }
);
