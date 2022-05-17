import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useSearchInput } from 'hooks/useSearchInput';
import { MatrixFieldsFragment } from './fragments';

export const GET_MATRICES = gql`
  query GetMatrices($input: GetMatrixInput!) {
    getMatrices(input: $input) {
      count
      results {
        ...matrixFields
      }
    }
  }
  ${MatrixFieldsFragment}
`;

export function useGetMatrices() {
  const { input } = useSearchInput();
  const { data, loading, error } = useQuery(GET_MATRICES, {
    variables: { input }
  });
  return { data, loading, error };
}
