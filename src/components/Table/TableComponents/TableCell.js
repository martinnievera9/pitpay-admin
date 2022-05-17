import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';
import { StyledTableCell } from './styles';

export const TableCell = ({
  children,
  className,
  colSpan,
  float,
  padding,
  plain,
  scope,
  size,
  verticalAlign,
  textAlign,
  stickyLeft,
  backgroundColor,
  isDeleted,
  sort,
  ...rest
}) => {
  const [sortDirection, setSortDirection] = useState(null);
  const handleSort = () => {
    if (!sort) return;

    // init ascending
    if (!sortDirection) {
      setSortDirection('asc');
      return sort('asc');
    }

    // set descending
    if (sortDirection === 'asc') {
      setSortDirection('desc');
      return sort('desc');
    }

    // set ascending
    if (sortDirection === 'desc') {
      setSortDirection('asc');
      return sort('asc');
    }
  };

  return (
    <StyledTableCell
      className={className}
      as={scope ? 'th' : undefined}
      scope={scope}
      size={size}
      colSpan={colSpan}
      verticalAlign={verticalAlign}
      textAlign={textAlign}
      float={float}
      onClick={handleSort}
      stickyLeft={stickyLeft}
      backgroundColor={backgroundColor}
      isDeleted={isDeleted}
      padding={padding}
      {...(plain ? rest : {})}
    >
      {children}
      {sort && sortDirection && <Icon icon="chevron" size={10} color="black" />}
    </StyledTableCell>
  );
};

TableCell.propTypes = {
  className: PropTypes.string,
  sort: PropTypes.func,
  stickyLeft: PropTypes.number,
  isDeleted: PropTypes.bool,
  textAlign: PropTypes.oneOf(['left', 'right', 'center'])
};

TableCell.defaultProps = {
  sort: null,
  stickyLeft: null,
  isDeleted: false
};
