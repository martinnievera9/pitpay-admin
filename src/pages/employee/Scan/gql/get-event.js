import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';

export const query = gql`
  query GetEvent($input: GetEventInput!) {
    getEvent(input: $input) {
      id
      track_id
      image
      image_id
      logo
      logo_id
      name
      start_date
      end_date
      eventDates
      day
      date
      month
      color_code
      status
    }
  }
`;
export default graphql(query, {
  options: (props) => {
    return {
      variables: { input: { id: parseInt(props.match.params.id) } },
      fetchPolicy: 'cache-and-network'
    };
  }
});
