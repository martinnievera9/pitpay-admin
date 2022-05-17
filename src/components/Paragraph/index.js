import React from 'react';
import PropTypes from 'prop-types';

import { StyledParagraph } from './StyledParagraph';

const Paragraph = ({ color, ...props }) => <StyledParagraph colorProp={color} {...props} />;

Paragraph.propTypes = {
  color: PropTypes.string,
  textAlign: PropTypes.string
};

Paragraph.defaultProps = {
  color: '#333',
  textAlign: 'left'
};

export default Paragraph;
