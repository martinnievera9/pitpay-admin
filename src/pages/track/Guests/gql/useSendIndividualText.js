import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const SEND_INDIVIDUAL_TEXT = gql`
  mutation SendIndividualText($input: IndividualTextInput!) {
    sendIndividualText(input: $input)
  }
`;

export function useSendIndividualText() {
  const [sendIndividualText] = useMutation(SEND_INDIVIDUAL_TEXT);
  return sendIndividualText;
}
