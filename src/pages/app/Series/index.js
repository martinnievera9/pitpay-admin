import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import Icon from 'components/Icon';
import Image from 'components/Image';
import LineHeightText from 'components/LineHeightText';
import { SearchableListContainer } from 'components/SearchableListContainer';
import {
  TableComponent as Table,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from 'components/Table';
import SeriesEdit from './EditSeries';
import DeleteSeries from './gql/mutations/delete-series';
import GetSeries from './gql/queries/get-series';

const Series = ({ theme, data, deleteSeries }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [editSeries, setEditSeries] = useState(null);

  const handleOutClick = () => {
    setIsVisible(!isVisible);
    setEditSeries(null);
  };

  return !data?.getSeriesAdmin ? (
    <div />
  ) : (
    <>
      <SearchableListContainer
        onAddClick={() => setIsVisible(!isVisible)}
        pageCount={data.getSeriesAdmin.count}
        paginated
        searchInputPlaceholder="Search Series"
        title="Series"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell scope="col">Name</TableCell>
              <TableCell scope="col">Logo</TableCell>
              <TableCell scope="col">Type</TableCell>
              <TableCell scope="col">Events</TableCell>
              <TableCell scope="col" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.getSeriesAdmin.results.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Link
                    style={{ color: theme.colors.primary }}
                    to={`/admin/series/events/${item.id}`}
                  >
                    <LineHeightText>{item.name}</LineHeightText>
                  </Link>
                </TableCell>
                <TableCell>
                  {item.logo ? (
                    <Image src={item.logo} width="75" alt="logo" />
                  ) : null}
                </TableCell>
                <TableCell>
                  <LineHeightText>
                    {item.type ? item.type.key : ''}
                  </LineHeightText>
                </TableCell>
                <TableCell>{item.events.length}</TableCell>
                <TableCell>
                  <Icon
                    icon="edit"
                    size={18}
                    color={theme.colors.primary}
                    padding="0 15px 0 0"
                    onClick={async () => {
                      setEditSeries(item.id);
                      setIsVisible(!isVisible);
                    }}
                  />
                  <Icon
                    icon="trash"
                    size={18}
                    color={theme.colors.primary}
                    onClick={async () => {
                      const successMessage = () =>
                        toast.success('Series Successfully Deleted');
                      const errorMessage = () =>
                        toast.error('Error Deleting Series');

                      if (
                        window.confirm(
                          'Are you sure you want to delete this series?'
                        )
                      ) {
                        const response = await deleteSeries(item.id);

                        if (!response || response.errors) {
                          errorMessage();
                        }

                        successMessage();
                      }
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SearchableListContainer>
      <SeriesEdit
        isVisible={isVisible}
        handleOutClick={handleOutClick}
        currentSeries={editSeries}
      />
    </>
  );
};

export default withTheme(compose(GetSeries, DeleteSeries)(Series));
