import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useSearchInput } from 'hooks/useSearchInput';

export const FaqFieldsFragment = gql`
  fragment faqFields on AppFaq {
    id
    question
    answer
    platform
    order
  }
`;

export const GET_ADMIN_FAQS = gql`
  query GetAdminFaqs {
    getAdminFaqs {
      ...faqFields
    }
  }
  ${FaqFieldsFragment}
`;

export const GET_EMPLOYEE_FAQS = gql`
  query GetEmployeeFaqs {
    getEmployeeFaqs {
      ...faqFields
    }
  }
  ${FaqFieldsFragment}
`;

export const GET_FAQS = gql`
  query GetFaqs($input: GetFaqsInput!) {
    getFaqs(input: $input) {
      count
      results {
        ...faqFields
      }
    }
  }
  ${FaqFieldsFragment}
`;

export function useGetFaqs(userType) {
  const { queryString } = useSearchInput();
  const QUERY =
    userType === 'track'
      ? GET_ADMIN_FAQS
      : userType === 'admin'
      ? GET_FAQS
      : GET_EMPLOYEE_FAQS;
  const result = useQuery(QUERY, {
    ...(userType === 'admin'
      ? { variables: { input: { queryString, limit: '200' } } }
      : null)
  });
  return result;
}
