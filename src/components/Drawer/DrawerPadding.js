import React from 'react';
import styled from 'styled-components';

export const DrawerSectionLine = styled.hr`
  border: none;
  color: transparent;
  margin: ${(props) => (props.margin ? props.margin : '40px 0px')};
  width: 100%;
  height: 0px;

  @media (min-width: 768px) {
    border-bottom: ${(props) => `1px solid ${props.theme.colors.border}`};
  }
`;

const Container = styled.div`
  padding: ${(props) => (props.padding ? props.padding : '0px 20px 20px 20px')};

  @media (min-width: 768px) {
    padding: ${(props) => (props.padding ? props.padding : '40px')};
    border-bottom: ${(props) => (props.border ? '1px solid #E6E6E6' : 'none')};
  }
`;

export const DrawerPadding = ({ children, padding, border }) => {
  return (
    <Container padding={padding} border={border}>
      {children}
    </Container>
  );
};
