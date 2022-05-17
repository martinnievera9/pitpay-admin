import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import mutator from 'mutator';
import { query } from '../../gql/queries/get-participants-list';

export default graphql(
  gql`
    mutation CreateIndividualRefund($input: IndividualRefundInput!) {
      createIndividualRefund(input: $input)
    }
  `,
  {
    props: ({ mutate }) => ({
      createIndividualRefund: async (input, user_id, event_id, date) => {
        return mutator(() =>
          mutate({
            variables: { input }
            // update: (proxy, { data: { createRefund } }) => {
            //   if (!createRefund) return;

            //   try {
            //     const data = proxy.readQuery({
            //       query,
            //       variables: { input: { event_id, date } }
            //     });

            //     proxy.writeQuery({
            //       query,
            //       variables: { input: { event_id, date } },
            //       data: {
            //         ...data,
            //         getParticipantsList: data.getParticipantsList.filter(
            //           (person) => person.id !== user_id
            //         )
            //       }
            //     });
            //   } catch (error) {
            //     console.error(error);
            //   }
            // }
          })
        );
      }
    })
  }
);
