import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import mutator from 'mutator';

export default graphql(
  gql`
    mutation addAddress($input: CreateAccountAddressInput!) {
      addAddress(input: $input)
    }
  `,
  {
    props: ({ mutate }) => ({
      addAddress: async (input) => {
        return mutator(() =>
          mutate({
            variables: { input },
          })
        );
      },
    }),
  }
);
