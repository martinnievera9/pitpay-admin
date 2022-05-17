/* eslint-disable */
import gql from 'graphql-tag';
import { useParams } from 'react-router-dom';
import { usePersistedQuery } from 'hooks/usePersistedQuery';
import { useSearchInput } from 'hooks/useSearchInput';
import { ParticipantDetail } from './participants.fragments';

export const GET_PARTICIPANT = gql`
  query GetParticipant($input: GetParticipantInput!) {
    getParticipant(input: $input) {
      ...participantDetail
    }
  }
  ${ParticipantDetail}
`;

export function useGetParticipant() {
  const { input } = useSearchInput();
  const { date } = input;
  const { id: eventId, userId } = useParams();
  return usePersistedQuery(GET_PARTICIPANT, `participant-${eventId}-${date}`, {
    variables: {
      input: {
        date,
        event_id: Number(eventId),
        user_id: Number(userId),
      },
    },
  });
}
