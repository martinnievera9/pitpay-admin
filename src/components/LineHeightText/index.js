import React from 'react';
import PropTypes from 'prop-types';

const LineHeightText = ({ lineHeight, children }) => (
  <p
    style={{
      lineHeight
    }}
  >
    {children}
  </p>
);

LineHeightText.propTypes = { lineHeight: PropTypes.string };
LineHeightText.defaultProps = { lineHeight: '25px' };

export default LineHeightText;
