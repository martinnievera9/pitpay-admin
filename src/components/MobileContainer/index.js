import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: calc(100% - 20px);
  margin: 0 10px 10px 10px;
  padding: ${props => (props.padding ? props.padding : '10px')};
  background: ${props =>
    props.background ? props.background : props.theme.colors.background.mobile};
  box-sizing: border-box;
  border-radius: 5px;
`;

const MobileContainer = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

export default MobileContainer;
