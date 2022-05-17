import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useParams } from 'react-router-dom';
import { useSearchInput } from 'hooks/useSearchInput';

export const GET_TRACK_TRANSACTIONS_GET_EVENT = gql`
  query GetTrackTransactionsGetEvent(
    $getTrackTransactionsInput: TransactionListInput!
    $getEventInput: GetEventInput!
  ) {
    getTrackTransactions(input: $getTrackTransactionsInput) {
      count
      results {
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
    }
    getEvent(input: $getEventInput) {
      id
      track_id
      image
      month
      day
      date
      added_by
      eventDates
      off_sale_time
      listDates
      isMultiDay
      fullMonth
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
      fullMonth
      hide_fee
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
        limit
      }
      admin_multiday_tickets {
        id
        end_date
        start_date
        color_code
        name
        price
        limit
      }
      admin_other_tickets {
        id
        name
        price
        end_date
        start_date
        color_code
        limit
      }
      status
      series_ids
      series {
        id
        name
      }
      track {
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
  }
`;

export function useGetTrackTransactionsGetEvent(page) {
  const { input } = useSearchInput();
  const { id } = useParams();
  return useQuery(GET_TRACK_TRANSACTIONS_GET_EVENT, {
    variables: {
      getTrackTransactionsInput: {
        event_id: Number(id),
        ...(page ? { page } : null),
        ...input,
      },
      getEventInput: {
        id: Number(id),
      },
    },
  });
}
