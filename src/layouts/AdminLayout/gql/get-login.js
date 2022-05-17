import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import mutator from 'mutator';

export default graphql(
  gql`
    mutation GetStripeLogin {
      getStripeLogin
    }
  `,
  {
    props: ({ mutate }) => ({
      getStripeLogin: async () => {
        return mutator(() => mutate());
      }
    })
  }
);
