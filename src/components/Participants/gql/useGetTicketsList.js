import gql from 'graphql-tag';
import { useParams } from 'react-router-dom';
import { usePersistedQuery } from 'hooks/usePersistedQuery';

export const GET_TICKETS_LIST = gql`
  query GetTicketsList(
    $input: GetSpectatorTicketsList!
    $getEventInput: GetEventInput!
  ) {
    getEvent(input: $getEventInput) {
      id
      isMultiDay
      name
      month
      day
      date
      start_date
      listDates
      end_date
      track {
        id
        logo
      }
      series {
        id
        logo
      }
      status
    }
    getSpectatorTickets(input: $input) {
      id
      is_checked
      barcode
      transfer {
        id
        name
        first_name
        last_name
        phone_number
        calling_code
        date
      }
      associated_tickets {
        id
        is_checked
        name
        barcode

        transfer {
          id
          name
          first_name
          last_name
          phone_number
          calling_code
        }
      }
      transaction {
        id
        total
      }
      user {
        name
        first_name
        last_name
      }
      ticket {
        price
        name
      }
      refunded
      cost
    }
  }
`;

export function useGetTicketsList({ date, search }) {
  const { id: eventId } = useParams();

  const result = usePersistedQuery(
    GET_TICKETS_LIST,
    `tickets_list-${eventId}-${date}`,
    {
      variables: {
        input: {
          event_id: Number(eventId),
          queryString: search ? search.trim() : '',
          date,
        },
        getEventInput: {
          id: Number(eventId),
        },
      },
      fetchPolicy: 'cache-and-network',
    }
  );

  return { ...result };
}
