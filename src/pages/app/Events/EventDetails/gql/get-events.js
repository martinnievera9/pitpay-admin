import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import { TicketFieldsFragment } from 'pages/app/Events/gql/tickets.fragments';

export const query = gql`
  query GetEvent($input: GetEventInput!) {
    getEvent(input: $input) {
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
      admin_website_url
      admin_schedule_url
      off_sale_time
      twitter
      facebook
      instagram
      fullDate
      track {
        id
        name
      }
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
        ...ticketFields
      }
      admin_multiday_tickets {
        ...ticketFields
      }
      admin_other_tickets {
        ...ticketFields
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
    getEventsAdmin(input: {}) {
      count
      results {
        id
        fullDate
        start_date
        added_by
        end_date
        name
        eventDates
        admin_website_url
        admin_schedule_url
        track {
          id
          name
        }
        user {
          id
          first_name
          last_name
        }
        series {
          id
          name
        }
        status
        color_code
        isMultiDay
        faqs {
          id
          question
          answer
        }
        admin_tickets {
          ...ticketFields
        }
        admin_multiday_tickets {
          ...ticketFields
        }
        admin_other_tickets {
          ...ticketFields
        }
      }
    }
  }
  ${TicketFieldsFragment}
`;
export default graphql(query, {
  options: ({ match }) => {
    return {
      variables: {
        input: {
          id: Number(match.params.id)
        }
      },
      fetchPolicy: 'cache-and-network'
    };
  }
});
