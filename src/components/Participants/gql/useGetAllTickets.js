import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useParams } from 'react-router-dom';

export const GET_ALL_TICKETS = gql`
  query GetAllTickets($event_id: Int!) {
    getAllTickets(event_id: $event_id) {
      id
      name
      price
      date
      start_date
      end_date
      color_code
    }
  }
`;

export function useGetAllTickets() {
  const { id } = useParams();
  return useQuery(GET_ALL_TICKETS, {
    variables: { event_id: Number(id) },
    fetchPolicy: 'no-cache'
  });
}
