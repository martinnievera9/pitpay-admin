import gql from 'graphql-tag';
import { useParams } from 'react-router-dom';
import { usePersistedQuery } from 'hooks/usePersistedQuery';
import { useSearchInput } from 'hooks/useSearchInput';
import { EventParticipantDownload } from './participants.fragments';

export const GET_PARTICIPANTS_DOWNLOAD = gql`
  query GetParticipantsDownload($getParticipantsInput: GetParticipantsList!) {
    getParticipantsList(input: $getParticipantsInput) {
      ...eventParticipantDownload
    }
  }
  ${EventParticipantDownload}
`;

export function useGetParticipantsDownload() {
  const { input } = useSearchInput();
  const { date } = input;
  const { id: eventId } = useParams();

  const result = usePersistedQuery(
    GET_PARTICIPANTS_DOWNLOAD,
    `participants_download-${eventId}-${date}`,
    {
      variables: {
        getParticipantsInput: {
          event_id: Number(eventId),
          queryString: '',
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
