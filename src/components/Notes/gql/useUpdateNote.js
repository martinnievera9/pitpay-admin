import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useCallback } from 'react';
import {
  logDevError,
  updateErrorMessage,
  updateSuccessMessage
} from 'shared/alerts';
import { NoteFieldsFragment } from './useGetNotes';

export const UPDATE_NOTE = gql`
  mutation UpdateNote($input: UpdateNoteInput!) {
    updateNote(input: $input) {
      ...faqFields
    }
  }
  ${NoteFieldsFragment}
`;

export function useUpdateNote() {
  const [updateNoteMutation] = useMutation(UPDATE_NOTE);

  const updateNote = useCallback(
    async input => {
      try {
        await updateNoteMutation({
          variables: { input },
          onCompleted: () => updateSuccessMessage('Note'),
          onError: () => updateErrorMessage('Note')
        });
      } catch (error) {
        logDevError(error);
        updateErrorMessage('Note');
      }
      return true;
    },
    [updateNoteMutation]
  );
  return updateNote;
}
