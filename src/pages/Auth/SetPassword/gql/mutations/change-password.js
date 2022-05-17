import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import mutator from 'mutator';

export default graphql(
  gql`
    mutation ChangePassword($input: UserChangePasswordInput!) {
      changePassword(input: $input) {
        id
        cellphone
        email
        jwt
        first_name
        last_name
        role
        address
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      changePassword: async (input) => {
        return mutator(() =>
          mutate({
            variables: { input }
          })
        );
      }
    })
  }
);
