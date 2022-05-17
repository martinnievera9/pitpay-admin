import gql from 'graphql-tag';
import { useParams } from 'react-router-dom';
import { usePersistedQuery } from 'hooks/usePersistedQuery';
import { useSearchInput } from 'hooks/useSearchInput';

export const GET_BARCODES = gql`
  query GetBarcodes($input: GetEventTicketsInput!) {
    getBarcodes(input: $input) {
      id
      person_name
      ticket_name
      barcode
      is_checked
      gaBarcode
    }
  }
`;

export function useGetBarcodes() {
  const {
    input: { date },
  } = useSearchInput();
  const { id: eventId } = useParams();

  const result = usePersistedQuery(
    GET_BARCODES,
    `barcodes-${eventId}-${date}`,
    {
      variables: {
        input: {
          event_id: Number(eventId),
          date,
        },
      },
    }
  );

  return { ...result };
}
