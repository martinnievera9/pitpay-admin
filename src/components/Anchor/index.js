import React from 'react';
import PropTypes from 'prop-types';

import { StyledAnchor } from './StyledAnchor';
import { StyledExternalAnchor } from './StyledExternalAnchor';

export const ExternalAnchor = props => <StyledExternalAnchor {...props} />;

const Anchor = ({ color, ...props }) => (
  <StyledAnchor colorProp={color} {...props} />
);

Anchor.propTypes = {
  color: PropTypes.string
};

Anchor.defaultProps = {
  color: null
};

export default Anchor;
