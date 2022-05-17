import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { GuestFieldsFragment } from './guest.fragments';

export const GET_GUESTS = gql`
  query GetGuests($input: GetGuestsInput!) {
    getGuests(input: $input) {
      count
      results {
        ...guestFields
      }
    }
  }
  ${GuestFieldsFragment}
`;

export function useGetGuests({ queryString }) {
  return useQuery(GET_GUESTS, { variables: { input: { queryString } } });
}
