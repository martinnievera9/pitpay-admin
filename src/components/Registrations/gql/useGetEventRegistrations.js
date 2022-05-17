import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useParams } from 'react-router-dom';
import { useSearchInput } from 'hooks/useSearchInput';
import { RegistrationValuesFragment } from './registrations.fragments';

export const GET_EVENT_REGISTRATIONS = gql`
  query GetEventRegistrations(
    $getTrackTransactionsInput: TransactionListInput!
    $getEventInput: GetEventInput!
  ) {
    getEventRegistrations(input: $getTrackTransactionsInput) {
      count
      results {
        ...registrationValues
      }
    }
    getEvent(input: $getEventInput) {
      id
      day
      date
      month
      listDates
      isMultiDay
      fullMonth
      image_id
      name
      fullDate
      fullMonth
    }
  }
  ${RegistrationValuesFragment}
`;

export function useGetEventRegistrations(queryString) {
  const { id } = useParams();
  const { input } = useSearchInput();

  const response = useQuery(GET_EVENT_REGISTRATIONS, {
    variables: {
      getTrackTransactionsInput: {
        event_id: Number(id),
        page: input.page,
        queryString,
        ...input,
      },
      getEventInput: {
        id: Number(id),
      },
    },
  });
  return response;
}
