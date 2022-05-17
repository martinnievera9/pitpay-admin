import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import qs from 'qs';

export const query = gql`
  query GetParticipants($input: GetParticipantsList!) {
    getParticipantsList(input: $input) {
      id
      purchase_id
      name
      is_checked
      promo_code
      duty
      age
      email
      phone
      address
    }
  }
`;

export default graphql(query, {
  options: props => {
    const search = qs.parse(props.location.search, { ignoreQueryPrefix: true });

    return {
      variables: { input: { event_id: parseInt(props.match.params.event_id) } },
      fetchPolicy: 'cache-and-network'
    };
  }
});
