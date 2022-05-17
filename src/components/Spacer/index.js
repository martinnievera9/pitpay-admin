import React from 'react';
import PropTypes from 'prop-types';

/* Component ==================================================================== */
const Spacer = ({ size }) => (
  <div
    style={{
      left: 0,
      right: 0,
      height: 1,
      marginTop: size - 1
    }}
  />
);

Spacer.propTypes = { size: PropTypes.number };
Spacer.defaultProps = { size: 10 };

/* Export Component ==================================================================== */
export default Spacer;
