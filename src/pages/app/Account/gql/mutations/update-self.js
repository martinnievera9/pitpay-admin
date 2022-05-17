import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import mutator from 'mutator';

export default graphql(
  gql`
    mutation UpdateSelf($input: UpdateSelfInput!) {
      updateSelf(input: $input) {
        id
        cellphone
        email
        first_name
        middle_name
        address
        last_name
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      updateSelf: async (input) => {
        return mutator(() =>
          mutate({
            variables: { input }
          })
        );
      }
    })
  }
);
