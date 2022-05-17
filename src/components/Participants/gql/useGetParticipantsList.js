import gql from 'graphql-tag';
import { useParams } from 'react-router-dom';
import { usePersistedQuery } from 'hooks/usePersistedQuery';
import { EventParticipantRow } from './participants.fragments';

export const GET_PARTICIPANTS_LIST = gql`
  query GetParticipantsList(
    $getParticipantsInput: GetParticipantsList!
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
    getParticipantsList(input: $getParticipantsInput) {
      ...eventParticipantRow
    }
  }
  ${EventParticipantRow}
`;

export function useGetParticipantsList({ date, search }) {
  const { id: eventId } = useParams();

  const result = usePersistedQuery(
    GET_PARTICIPANTS_LIST,
    `participants_list-${eventId}-${date}`,
    {
      variables: {
        getParticipantsInput: {
          event_id: Number(eventId),
          queryString: search ? search.trim() : '',
          date
        },
        getEventInput: {
          id: Number(eventId)
        }
      },
      fetchPolicy: 'cache-and-network'
    }
  );

  return { ...result };
}
