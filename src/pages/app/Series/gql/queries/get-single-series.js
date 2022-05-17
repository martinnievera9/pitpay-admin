import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';

export const query = gql`
  query GetSeriesDetail($input: GetSeriesDetailInput!) {
    getSeriesDetail(input: $input) {
      id
      image
      logo
      image_id
      logo_id
      added_by
      name
      short_name
      website
      schedule
      type_id
      bio
      twitter
      facebook
      instagram
      user_id
      faqs {
        question
        answer
      }
      status
    }
    getAllUsers {
      id
      name
      first_name
      middle_name
      last_name
      email
      role
    }
    getSeriesTypes {
      id
      value
      key
    }
  }
`;
export default graphql(query, {
  options: ({ currentSeries }) => {
    return {
      variables: { input: { id: currentSeries ? currentSeries : 0 } },
      fetchPolicy: 'cache-and-network',
    };
  },
});
