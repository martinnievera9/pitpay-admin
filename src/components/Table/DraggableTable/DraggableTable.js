import PropTypes from 'prop-types';
import React from 'react';
import { ReactSortable } from 'react-sortablejs';
import styled from 'styled-components';
import { DragIndicatorIcon } from 'components/Icon/DragIndicatorIcon';
import LineHeightText from 'components/LineHeightText';
import {
  TableComponent,
  TableRow,
  TableCell,
  TableBody,
  TableHeader
} from '../TableComponents';
import { tablePropTypes } from '../Table';

const Tb = styled(TableBody)`
  position: relative;
`;

const Td = styled(TableCell)`
  &:last-child {
    padding-right: 20px;
  }
  &:first-child {
    padding-left: 20px;
  }
`;

const IconCell = styled(TableCell)`
  color: ${props => props.theme.colors.text.light};
  text-align: center;
  vertical-align: middle;
`;

export const DraggableTable = props => {
  const { items, columns, noData, renderRows, setItems } = props;

  return !items.length > 0 ? (
    <div />
  ) : (
    <TableComponent>
      <TableHeader>
        <TableRow>
          <IconCell scope="col">&nbsp;</IconCell>
          {columns.map(column => (
            <Td key={column.key} textAlign={column.textAlign} scope="col">
              <LineHeightText>{column.label}</LineHeightText>
            </Td>
          ))}
        </TableRow>
      </TableHeader>
      {items.length < 1 ? (
        noData ? (
          <Tb>{noData}</Tb>
        ) : null
      ) : (
        <ReactSortable list={items} setList={setItems} tag={Tb}>
          {items.map(item => {
            const row = renderRows(item);
            return (
              <TableRow key={item.id} sortable>
                <IconCell>
                  <DragIndicatorIcon />
                </IconCell>
                {columns.map(column => (
                  <Td key={column.key} textAlign={column.textAlign}>
                    {row[column.key]}
                  </Td>
                ))}
              </TableRow>
            );
          })}
        </ReactSortable>
      )}
    </TableComponent>
  );
};
DraggableTable.propTypes = {
  ...tablePropTypes,
  setItems: PropTypes.func.isRequired
};
