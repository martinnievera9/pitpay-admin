import PropTypes from 'prop-types';
import React from 'react';

import { StyledTableRow } from './styles';

export const TableRow = props => <StyledTableRow {...props} />;
TableRow.propTypes = {
  // Add highlight colors here as needed
  highlight: PropTypes.oneOf(['orange']),
  sortable: PropTypes.bool
};
