import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useParams } from 'react-router-dom';
import { GuestFieldsFragment } from 'pages/track/Guests';

export const GET_EVENT_AND_EVENT_GUESTS = gql`
  query GetEventAndEventGuests(
    $getEventGuestsInput: GetEventGuestsInput!
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
      month
      day
      date
      start_date
      listDates
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
      fullDate
      next_date
      track {
        id
        logo
      }
      series {
        id
        logo
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
    getEventGuests(input: $getEventGuestsInput) {
      event_guests {
        ...guestFields
      }
      yearly_guests {
        ...guestFields
      }
    }
  }
  ${GuestFieldsFragment}
`;

export function useGetEventAndEventGuests({ queryString }) {
  const { eventId } = useParams();
  return useQuery(GET_EVENT_AND_EVENT_GUESTS, {
    variables: {
      getEventGuestsInput: {
        event_id: Number(eventId),
        queryString,
      },
      getEventInput: {
        id: Number(eventId),
      },
    },
    fetchPolicy: 'network-only',
  });
}
