import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import qs from 'qs';

export const query = gql`
  query GetParticipantsList(
    $getParticipantsInput: GetParticipantsList!
    $getEventInput: GetEventInput!
  ) {
    getEvent(input: $getEventInput) {
      id
      track_id
      image
      added_by
      eventDates
      off_sale_time
      isMultiDay
      image_id
      logo
      logo_id
      name
      start_date
      end_date
      user_id
      sale_start
      sale_end
      about
      website_url
      off_sale_time
      twitter
      facebook
      instagram
      next_date
      fullDate

      admin_times {
        id
        event_date
        start_time
        gate_time
      }
      user {
        id
        first_name
        last_name
        middle_name
      }
      waivers {
        id
        name
      }
      admin_tickets {
        id
        color_code
        end_date
        isMultiDay
        start_date
        name
        price
        date
        start_time
        gate_time
      }
      admin_multiday_tickets {
        id
        end_date
        start_date
        color_code
        name
        price
      }
      admin_other_tickets {
        id
        name
        price
        end_date
        start_date
        color_code
      }
      status
      series_ids
      series {
        id
        name
      }
      color_code
      faqs {
        id
        question
        answer
      }
    }
    getParticipantsList(input: $getParticipantsInput) {
      id
      purchase_id
      name
      is_checked
      promo_code
      duty
      age
      user_id
      type
      email
      phone
      address
      status
      has_waiver
      tickets {
        id
        person_name
        ticket_name
        barcode
        is_checked
        cost
      }
    }
  }
`;

export default graphql(query, {
  options: (props) => {
    const { queryString, date } = qs.parse(props.location.search, {
      ignoreQueryPrefix: true
    });

    return {
      variables: {
        getParticipantsInput: {
          event_id: parseInt(props.match.params.id),
          queryString: queryString ? queryString.trim() : '',
          date
        },
        getEventInput: {
          id: parseInt(props.match.params.id)
        }
      },
      fetchPolicy: 'cache-and-network'
    };
  }
});
