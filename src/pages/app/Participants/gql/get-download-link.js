import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';

export const query = gql`
  query GetDownloadUrl($pass_id: Int!) {
    getDownloadUrl(pass_id: $pass_id)
  }
`;
export default graphql(query, {
  options: (props) => {
    return {
      variables: { pass_id: 0 },
      fetchPolicy: 'cache-and-network'
    };
  }
});
