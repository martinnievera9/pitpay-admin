import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const GET_REGISTRATION_FIELDS = gql`
  query GetRegistrationFields($form_id: Int!) {
    getRegistration(form_id: $form_id) {
      id
      fields {
        label
        name
        type
        description
        items {
          label
          value
        }
        required
        hide_label
        readonly
        default
        placeholder
      }
    }
  }
`;

export function useGetRegistrationFields(form_id, options = {}) {
  const { data, loading, error } = useQuery(GET_REGISTRATION_FIELDS, {
    variables: { form_id },
    skip: !form_id,
    ...options,
  });
  return { data, loading, error };
}
