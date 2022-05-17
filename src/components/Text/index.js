import React from 'react';
import PropTypes from 'prop-types';

import { StyledText } from './StyledText';

const Text = ({ color, ...props }) => (
  <StyledText colorProp={color} {...props} />
);

Text.propTypes = {
  color: PropTypes.string,
  textAlign: PropTypes.string,
  type: PropTypes.string,
  inlineStyle: PropTypes.object
};

Text.defaultProps = {
  color: '#00001f',
  textAlign: 'left',
  type: 'body4',
  inlineStyle: null
};

export default Text;
