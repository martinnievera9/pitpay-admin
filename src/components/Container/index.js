import React from 'react';
import styled from 'styled-components';

const ContainerWrapper = styled.div`
  width: calc(100% - 40px);
  height: 100%;
  border-radius: 5px;
  border: 1px solid #e6e6e6;
  margin: 20px;
  box-sizing: border-box;
  background-color: #fff;

  @media (min-width: 860px) {
    width: calc(100% - 80px);
    margin: 40px;
  }
`;

const Container = ({ children, style }) => {
  return <ContainerWrapper style={style}>{children}</ContainerWrapper>;
};

export default Container;
