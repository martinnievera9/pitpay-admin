import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';

import styled from 'styled-components';

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Loading = ({ type, color, size }) => (
  <LoadingWrapper>
    <ReactLoading type={type} color={color} height={size} width={size} />
  </LoadingWrapper>
);

Loading.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number
};

Loading.defaultProps = {
  type: 'bubbles',
  color: '#fa4616',
  size: 100
};

export default Loading;
