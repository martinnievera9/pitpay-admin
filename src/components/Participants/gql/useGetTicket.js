import gql from 'graphql-tag';
import { useParams } from 'react-router-dom';
import { usePersistedQuery } from 'hooks/usePersistedQuery';
import { useSearchInput } from 'hooks/useSearchInput';

export const GET_TICKET = gql`
  query GetTicket($ticket_id: Int!) {
    getSpectatorTicket(ticket_id: $ticket_id) {
      id
      is_checked
      barcode
      transfer {
        id
        name
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
          phone_number
          calling_code
        }
      }
      transaction {
        id
        fee
        total
        refund
        discount
        transfer_id
        charge_id
        card {
          last4
        }
        purchase_date
        status
        user {
          id
          name
          first_name
          last_name
        }
        users {
          promo
          user {
            id
            name
            first_name
            last_name
          }
          tickets {
            id
            name
            price
            refunded
            type
          }
        }
        international_fee
      }
      user {
        name
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
function useGetEventParams() {
  const { id } = useParams();
  const { input } = useSearchInput();
  const { date } = input ?? {};
  let event_id = null;

  if (id) {
    event_id = Number(id);
  } else {
    event_id = Number(window.location.href.split('/')[7]);
  }
  return [event_id, date];
}
export function useGetTicket() {
  const { id: eventId, userId } = useParams();

  const [date] = useGetEventParams();
  const result = usePersistedQuery(GET_TICKET, `ticket-${eventId}-${date}`, {
    variables: {
      ticket_id: parseInt(userId),
    },
    fetchPolicy: 'cache-and-network',
  });

  return { ...result, res: result.data };
}
