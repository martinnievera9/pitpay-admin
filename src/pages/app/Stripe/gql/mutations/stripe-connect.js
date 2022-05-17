import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import mutator from 'mutator';

export default graphql(
  gql`
    mutation StripeConnect($token: String!) {
      stripeConnect(token: $token)
    }
  `,
  {
    props: ({ mutate }) => ({
      stripeConnect: async (token) => {
        return mutator(() =>
          mutate({
            variables: { token }
          })
        );
      }
    })
  }
);
