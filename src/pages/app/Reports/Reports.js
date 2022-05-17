import React from 'react';
import Paragraph from 'components/Paragraph';
import { SearchableListContainer } from 'components/SearchableListContainer';
import { Table } from 'components/Table';
import { useGetAdminMetrics } from './gql/Reports.queries';

export const Reports = () => {
  const { data } = useGetAdminMetrics();

  if (!data?.getAdminMetrics) return null;
  const reports = data.getAdminMetrics.results ?? [];
  const pageCount = data.getAdminMetrics.count ?? 0;

  const columns = [
    {
      label: 'Name',
      key: 'name'
    },
    {
      label: 'Pit Passes',
      key: 'passes'
    },
    {
      label: 'Registrations',
      key: 'registrations'
    },
    {
      label: 'Other Tickets',
      key: 'other_passes'
    },
    {
      label: 'Favorites',
      key: 'favorites'
    }
  ];

  function renderRows(report) {
    const { name, passes, registrations, other_passes, favorites } = report;
    return {
      name,
      passes,
      registrations,
      other_passes,
      favorites
    };
  }

  return (
    <SearchableListContainer
      pageCount={pageCount}
      paginated
      title="Reports"
      noSearch
    >
      <Table
        columns={columns}
        items={reports}
        noData={
          <Paragraph textAlign="center" lineHeight={100} fontSize={20}>
            No Reports.
          </Paragraph>
        }
        renderRows={renderRows}
      />
    </SearchableListContainer>
  );
};
