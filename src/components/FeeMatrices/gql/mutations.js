import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useCallback } from 'react';
import {
  useAddNewItemToList,
  useRemoveDeletedItemFromList
} from 'hooks/useUpdateCachedList';
import { MatrixFieldsFragment } from './fragments';
import { GET_MATRICES } from './useGetMatrices';

export const CREATE_MATRIX = gql`
  mutation CreateMatrix($input: CreateMatrixInput!) {
    createMatrix(input: $input) {
      ...matrixFields
    }
  }
  ${MatrixFieldsFragment}
`;

export const UPDATE_MATRIX = gql`
  mutation UpdateMatrix($input: UpdateMatrixInput!) {
    updateMatrix(input: $input) {
      ...matrixFields
    }
  }
  ${MatrixFieldsFragment}
`;

export const DELETE_MATRIX = gql`
  mutation DeleteMatrix($id: Int!) {
    deleteMatrix(id: $id)
  }
`;

export const DUPLICATE_MATRIX = gql`
  mutation DuplicateMatrix($matrix_id: Int!) {
    duplicateMatrix(matrix_id: $matrix_id) {
      ...matrixFields
    }
  }
  ${MatrixFieldsFragment}
`;

export function useCreateMatrix() {
  const [createMutation] = useMutation(CREATE_MATRIX);
  const addNewItemToList = useAddNewItemToList();
  const createMatrix = useCallback(
    async input => {
      const response = await createMutation({
        variables: { input },
        update: (cache, { data }) => {
          if (data) {
            addNewItemToList({
              cache,
              newItem: data.createMatrix,
              query: GET_MATRICES,
              queryName: 'getMatrices'
            });
          }
        }
      });
      return response;
    },
    [createMutation, addNewItemToList]
  );
  return createMatrix;
}

export function useUpdateMatrix() {
  const [updateMutation] = useMutation(UPDATE_MATRIX);
  const updateMatrix = useCallback(
    async input => {
      const response = await updateMutation({ variables: { input } });
      return response;
    },
    [updateMutation]
  );
  return updateMatrix;
}

export function useDeleteMatrix() {
  const [deleteMutation] = useMutation(DELETE_MATRIX);
  const removeDeletedItemFromList = useRemoveDeletedItemFromList();
  const deleteMatrix = useCallback(
    async id => {
      const response = await deleteMutation({
        variables: { id },
        update: (cache, { data }) => {
          if (data) {
            removeDeletedItemFromList({
              cache,
              itemId: id,
              query: GET_MATRICES,
              queryName: 'getMatrices'
            });
          }
        }
      });
      return response;
    },
    [deleteMutation, removeDeletedItemFromList]
  );
  return deleteMatrix;
}

export function useDuplicateMatrix() {
  const [duplicateMatrixMutation] = useMutation(DUPLICATE_MATRIX);
  const addNewItemToList = useAddNewItemToList();
  const duplicateMatrix = useCallback(
    matrix_id => {
      const response = duplicateMatrixMutation({
        variables: { matrix_id },
        update: (cache, { data }) => {
          if (data) {
            addNewItemToList({
              cache,
              newItem: data.duplicateMatrix,
              query: GET_MATRICES,
              queryName: 'getMatrices'
            });
          }
        }
      });
      return response;
    },
    [duplicateMatrixMutation, addNewItemToList]
  );
  return duplicateMatrix;
}
