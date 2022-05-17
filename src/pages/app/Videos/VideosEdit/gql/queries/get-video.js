import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';

export const query = gql`
  query GetVideo($id: Int!) {
    getVideo(id: $id) {
      id
      title
      url
      image
      runtime
      iframe
      description
      category
    }
  }
`;
export default graphql(query, {
  options: ({ currentVideo }) => {
    return {
      variables: { id: currentVideo ? currentVideo : 0 },
      fetchPolicy: 'cache-and-network'
    };
  }
});
