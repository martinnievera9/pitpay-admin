import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import { CommonEventFieldsFragment } from 'components/Events/gql';

export const query = gql`
  query GetEvent($input: GetEventInput!) {
    getEvent(input: $input) {
      ...commonEventFields
      next_date
      tickets {
        name
        price
        date
      }
      other_tickets {
        name
        price
      }
    }
  }
  ${CommonEventFieldsFragment}
`;
export default graphql(query, {
  options: props => {
    // let { search } = qs.parse(
    //     window.location.search.substring(1)
    //   );

    return {
      variables: { input: { id: parseInt(props.match.params.id, 10) } },
      fetchPolicy: 'cache-and-network'
    };
  }
});
