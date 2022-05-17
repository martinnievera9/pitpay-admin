import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useCallback } from 'react';

export const DOWNLOAD_WAIVER = gql`
  mutation DownloadWaiver($pass_id: Int!) {
    downloadWaiver(pass_id: $pass_id)
  }
`;

export function useDownloadWaiver() {
  const [downloadWaiverMutation] = useMutation(DOWNLOAD_WAIVER);
  const downloadWaiver = useCallback(
    pass_id => {
      return downloadWaiverMutation({ variables: { pass_id } });
    },
    [downloadWaiverMutation]
  );
  return downloadWaiver;
}
