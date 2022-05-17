import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const ImageWrapper = styled.div`
  ${props => props.width && `width: ${props.width}px;`}
`;

const Image = props => {
  const { width, src, alt } = props;
  return (
    <ImageWrapper width={width}>
      <img style={{ width: '100%' }} src={src} alt={alt} />
    </ImageWrapper>
  );
};

Image.propTypes = {
  src: PropTypes.string,
  width: PropTypes.string,
};

Image.defaultProps = {
  width: '150',
  src: '',
};

export default Image;
