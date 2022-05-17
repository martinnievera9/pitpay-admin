import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import mutator from 'mutator';

export default graphql(
  gql`
    mutation GetSingleUserExport($user_id: Int!) {
      getSingleUserExport(user_id: $user_id) {
        user {
          name
          cellphone
          email
          address
        }
        purchases {
          total
          discount
          fee
          refund
          refunded
          purchase_date
          event {
            name
            track {
              name
            }
          }
        }
        races
        lifetimeValue
        favorites
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      getSingleUserExport: async user_id => {
        return mutator(() =>
          mutate({
            variables: { user_id }
          })
        );
      }
    })
  }
);
