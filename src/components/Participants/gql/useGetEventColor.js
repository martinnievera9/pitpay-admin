import { useQuery } from '@apollo/react-hooks';
import dayjs from 'dayjs';
import gql from 'graphql-tag';
import { useParams } from 'react-router-dom';
import { useSearchInput } from 'hooks/useSearchInput';

export const GET_EVENT_COLOR = gql`
  query GetEventColor($input: EventColorInput!) {
    getEventColor(input: $input)
  }
`;

export function useGetEventColor() {
  const { id } = useParams();
  const { input } = useSearchInput();
  const date = input?.date
    ? dayjs(input.date, 'YYYY-MM-DD').format('MMM DD - YYYY')
    : undefined;
  const event_id = id ? Number(id) : undefined;
  return useQuery(GET_EVENT_COLOR, {
    variables: { input: { event_id, date } },
    skip: !event_id || !date,
  });
}
