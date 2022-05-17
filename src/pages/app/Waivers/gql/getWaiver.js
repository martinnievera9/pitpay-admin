import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';

export const query = gql`
  query GetWaiver($id: Int!) {
    getWaiver(id: $id) {
      id
      name
      waiver_id
    }
  }
`;
export default graphql(query, {
  options: ({ currentWaiver }) => {
    return {
      variables: { id: currentWaiver ? currentWaiver : 0 },
      fetchPolicy: 'cache-and-network'
    };
  }
});
