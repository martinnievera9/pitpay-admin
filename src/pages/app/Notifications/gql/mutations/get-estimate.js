import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import mutator from 'mutator';

export default graphql(
  gql`
    mutation GetNotificationEstimate($input: MessageEstimateInput!) {
      getNotificationEstimate(input: $input)
    }
  `,
  {
    props: ({ mutate }) => ({
      getNotificationEstimate: async (input) => {
        return mutator(() =>
          mutate({
            variables: { input },
          })
        );
      },
    }),
  }
);
