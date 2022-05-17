import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';

export const query = gql`
  query GetEvents($input: GetEventsInput!) {
    getEvents(input: $input) {
      id
      track {
        id
        image
        logo
        name
        street
        city
        state
        zipcode
      }

      track_id
      image
      image_id
      off_sale_time
      logo
      logo_id
      name
      start_date
      end_date
      sale_start
      sale_end
      international_fee
      hide_fee
      tickets {
        id
        name
        price
      }
      other_tickets {
        id
        name
        price
      }
      status
      series_ids
      is_purchasable
      day
      date
      fullDate
      color_code
      month
    }
  }
`;

export default graphql(query, {
  options: ({ queryString, state }) => {
    // const search = qs.parse(queryString.search, { ignoreQueryPrefix: true });
    // const type = -1 === location.pathname.indexOf("track") ? "series" : "track";

    return {
      variables: {
        input: {}
      },
      fetchPolicy: 'cache-and-network'
    };
  }
});
