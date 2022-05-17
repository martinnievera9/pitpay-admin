import React from 'react';

import { StyledTable, StyledTableDataCaption } from './styles';

export const TableComponent = ({ caption, children, ...rest }) => (
  <div style={{ overflowX: 'scroll', overflowY: 'hidden', width: '100%' }}>
    <StyledTable {...rest}>
      {caption ? (
        <StyledTableDataCaption>{caption}</StyledTableDataCaption>
      ) : null}
      {children}
    </StyledTable>
  </div>
);
