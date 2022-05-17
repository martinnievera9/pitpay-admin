import gql from 'graphql-tag.macro';
export default gql`
  fragment FaqItems on FaqItem {
    id
    track_id
    image
    image_id
    logo
    logo_id
    name
    start_date
    end_date
    sale_start
    sale_end
    tickets {
        name
        price
    }
    other_tickets {
        name
        price
    }
    status
    series: {
        id
        name
    }
    series_ids
    is_purchasable
    day
    date
  }
`;
