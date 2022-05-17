import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import mutator from 'mutator';

export default graphql(
  gql`
    mutation requestCode($input: RequestCodeInput!) {
      requestCode(input: $input)
    }
  `,
  {
    props: ({ mutate }) => ({
      requestCode: async (input) => {
        return mutator(() =>
          mutate({
            variables: { input },
          })
        );
      },
    }),
  }
);
