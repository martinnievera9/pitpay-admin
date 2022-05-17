import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useParams } from 'react-router-dom';

export const GET_EVENT = gql`
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
      next_date
      sale_start
      sale_end
      eventDates
      isMultiDay
      listDates
      day
      date
      month
      color_code
      tickets {
        name
        price
        date
      }
      other_tickets {
        name
        price
      }
      user {
        id
        first_name
        middle_name
        last_name
      }
      status
      series_ids
      series {
        id
        name
      }
      color_code
      faqs {
        question
        answer
      }
    }
  }
`;

export function useGetEvent() {
  const { eventId } = useParams();
  return useQuery(GET_EVENT, {
    variables: { input: { id: Number(eventId) } },
    skip: !eventId,
  });
}
