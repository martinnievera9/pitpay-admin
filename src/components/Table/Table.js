import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import LineHeightText from 'components/LineHeightText';
import {
  TableComponent,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from './TableComponents';

const Td = styled(TableCell)`
  text-align: left;
  ${(props) => (props.width ? `width: ${props.width};` : '')}
  &:last-child {
    padding-right: 20px;
  }
  &:first-child {
    padding-left: 20px;
  }
`;

export const Table = (props) => {
  const { items, columns, Components = {}, noData, renderRows, sorter } = props;

  const { Row } = Components;

  const RowComponent = Row ?? TableRow;

  return !items.length > 0 ? (
    <div />
  ) : (
    <TableComponent>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <Td
              key={column.key}
              textAlign={column.textAlign}
              scope="col"
              sort={sorter}
              width={column.width}
            >
              <LineHeightText>{column.label}</LineHeightText>
            </Td>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 && noData ? noData : null}
        {items.map((item, index) => {
          const rowData = renderRows(item, index);
          const { rowProps, ...row } = rowData;
          return (
            <RowComponent key={item.id} {...rowProps}>
              {columns.map((column) => (
                <Td key={column.key} textAlign={column.textAlign}>
                  {row[column.key]}
                </Td>
              ))}
            </RowComponent>
          );
        })}
      </TableBody>
    </TableComponent>
  );
};

export const tablePropTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      textAlign: PropTypes.oneOf(['left', 'right', 'center']),
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  Components: PropTypes.shape({
    // Add more here as required
    Row: PropTypes.elementType,
  }),
  noData: PropTypes.node,
  renderRows: PropTypes.func.isRequired,
  sorter: PropTypes.func,
};
Table.propTypes = tablePropTypes;
