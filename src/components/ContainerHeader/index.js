import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  border-bottom-width: ${(props) => props.borderWidth};
  border-color: ${(props) => props.theme.colors.border};
  border-style: solid;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 860px) {
    padding-left: 40px;
    padding: 0 0 0 40px;
    align-items: center;
    height: 80px;
  }
`;

const ContainerHeader = ({
  children,
  style,
  borderWidth = '1px',
  ...props
}) => {
  return (
    <Header style={style} borderWidth={borderWidth} {...props}>
      {children}
    </Header>
  );
};

export default ContainerHeader;
