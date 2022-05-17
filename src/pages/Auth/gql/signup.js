import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import mutator from 'mutator';

export default graphql(
  gql`
    mutation PromoterSignup($input: GASignupInput!) {
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
  `,
  {
    props: ({ mutate }) => ({
      promoterSignup: async (input) => {
        return mutator(() =>
          mutate({
            variables: { input },
          })
        );
      },
    }),
  }
);
