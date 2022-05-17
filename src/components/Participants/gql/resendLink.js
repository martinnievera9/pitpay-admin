import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const RESEND_MINORWAIVER = gql`
  mutation ResendMinorWaiver($pass_id: Int!) {
    resendMinorWaiver(pass_id: $pass_id)
  }
`;

export function useResendMuation(queryString) {
  const [resendMutation] = useMutation(queryString);
  return [resendMutation];
}

export const RESEND_PARENTWAIVER = gql`
  mutation ResendParentWaiver($pass_id: Int!) {
    resendParentWaiver(pass_id: $pass_id)
  }
`;

export function useResendMuationParent(queryString) {
  const [resendMutationParent] = useMutation(queryString);
  return [resendMutationParent];
}
