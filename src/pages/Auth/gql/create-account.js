import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import mutator from 'mutator';

export default graphql(
  gql`
    mutation createAccount($input: CreateAccountInput!) {
      createAccount(input: $input) {
        id
        email
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      createAccount: async (input) => {
        return mutator(() =>
          mutate({
            variables: { input },
          })
        );
      },
    }),
  }
);
