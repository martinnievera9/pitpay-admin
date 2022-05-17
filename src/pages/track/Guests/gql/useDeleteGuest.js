import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const DELETE_GUEST = gql`
  mutation DeleteGuest($id: Int!) {
    deleteGuest(id: $id)
  }
`;

export function useDeleteGuest() {
  const [deleteGuest] = useMutation(DELETE_GUEST);
  return deleteGuest;
}
