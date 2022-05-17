import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import mutator from 'mutator';

export default graphql(
  gql`
    mutation SingleUpload($file: Upload!) {
      singleUpload(file: $file) {
        id
        url
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      singleUpload: async (file) => {
        return mutator(() =>
          mutate({
            variables: { file }
          })
        );
      }
    })
  }
);
