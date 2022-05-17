import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useParams } from 'react-router-dom';
import { RegistrationValuesFragment } from 'components/Registrations/gql';

export const GET_ALL_EVENT_REGISTRATIONS = gql`
  query GetAllEventRegistrations($event_id: Int!) {
    getAllEventRegistrations(event_id: $event_id) {
      count
      results {
        ...registrationValues
      }
    }
  }
  ${RegistrationValuesFragment}
`;

export function useGetAllEventRegistrations() {
  const { id } = useParams();
  const result = useQuery(GET_ALL_EVENT_REGISTRATIONS, {
    variables: { event_id: Number(id) },
    skip: !id,
  });
  return result;
}
