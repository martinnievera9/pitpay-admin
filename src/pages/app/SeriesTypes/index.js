import React, { useState } from 'react';
import { withTheme } from 'styled-components';
import { compose } from 'recompose';
import Icon from 'components/Icon';
import Loading from 'components/Loading';
import Paragraph from 'components/Paragraph';
import { SearchableListContainer } from 'components/SearchableListContainer';
import GetSeriesTypes from './gql/queries/get-series-types';
import DeleteSeriesType from './gql/mutations/delete-series-type';
import TypeEdit from './TypeEdit';
import {
  TableComponent as Table,
  TableRow,
  TableCell,
  TableBody,
  TableHeader
} from 'components/Table';

const SeriesTypes = ({ deleteSeriesType, ...props }) => {
  let { data } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [seriesType, setEditSeriesType] = useState(null);

  const handleOutClick = () => {
    setIsVisible(!isVisible);
    setEditSeriesType(null);
  };

  if (props.data.loading) return <Loading />;

  return (
    <>
      <SearchableListContainer
        pageCount={props.data.getSeriesTypesAdmin.count}
        paginated
        onAddClick={() => setIsVisible(!isVisible)}
        searchInputPlaceholder="Search Series Types"
        title="Series Types"
      >
        {data.getSeriesTypesAdmin.results.length < 1 ? (
          <Paragraph textAlign="center" lineHeight={100} fontSize={20}>
            No Series Types.
          </Paragraph>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell scope="col" colSpan={10}>
                  Series Type
                </TableCell>
                <TableCell scope="col" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.getSeriesTypesAdmin.results.map(item => (
                <TableRow key={item.id}>
                  <TableCell colSpan={10}>{item.name}</TableCell>
                  <TableCell>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end'
                      }}
                    >
                      <Icon
                        icon="edit"
                        size={18}
                        color={props.theme.colors.primary}
                        onClick={async () => {
                          setEditSeriesType(item);
                          setIsVisible(!isVisible);
                        }}
                        padding="0 15px 0 0"
                      />
                      <Icon
                        icon="trash"
                        size={18}
                        color={props.theme.colors.primary}
                        onClick={async () => {
                          if (
                            window.confirm(
                              'Are you sure you want to delete this one?'
                            )
                          ) {
                            await deleteSeriesType({ id: item.id });
                          } else {
                            return;
                          }
                        }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </SearchableListContainer>
      <TypeEdit
        isVisible={isVisible}
        handleOutClick={handleOutClick}
        currentSeriesType={seriesType}
      />
    </>
  );
};

export default withTheme(
  compose(GetSeriesTypes, DeleteSeriesType)(SeriesTypes)
);
