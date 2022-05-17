import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useEventYearFilter } from 'components/YearDropdown';

export const EVENTS_ADMIN = gql`
  query GetEventsAdmin($input: GetEventsAdminInput!) {
    getEventsAdmin(input: $input) {
      count
      results {
        id
        name
        day
        date
        month
        isMultiDay
        listDates
        fullDate
      }
    }
  }
`;

export function useGetEventsAdmin({ track, series }) {
  const { yearFilter } = useEventYearFilter();

  const variables = {
    input: {
      year: yearFilter,
      track_id: track ? track.value : null,
      series_id: series ? series.value : null,
      limit: '100',
    },
  };
  return useQuery(EVENTS_ADMIN, {
    variables,
    fetchPolicy: 'cache-and-network',
  });
}
