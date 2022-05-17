import React, { forwardRef } from 'react';

import { StyledTableBody } from './styles';

export const TableBody = forwardRef((props, ref) => (
  <StyledTableBody ref={ref} {...props} />
));
