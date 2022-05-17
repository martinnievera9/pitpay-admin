import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import mutator from 'mutator';

export default graphql(
  gql`
    mutation emulateUser($user_id: Int!) {
      emulateUser(user_id: $user_id) {
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
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      emulateUser: async user_id => {
        return mutator(() =>
          mutate({
            variables: { user_id }
          })
        );
      }
    })
  }
);
