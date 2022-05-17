import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import mutator from 'mutator';

export default graphql(
  gql`
    mutation ForgotPassword($cellphone: String!) {
      forgotPassword(cellphone: $cellphone)
    }
  `,
  {
    props: ({ mutate }) => ({
      forgotPassword: async (cellphone) => {
        return mutator(() =>
          mutate({
            variables: { cellphone }
          })
        );
      }
    })
  }
);
