import React, { Fragment } from 'react';
import styled from 'styled-components';
import { H3 } from 'components/Heading';
import Icon from 'components/Icon';
import useTheme from 'hooks/useTheme';

const SideDrawer = styled.div`
  height: calc(100% - 60px);
  background: white;
  box-shadow: 1px 0px 7px rgba(0, 0, 0, 0.5);
  border: 1px solid #e6e6e6;
  position: fixed;
  top: 60px;
  right: 0;
  width: 100%;
  z-index: 200;
  transform: ${(props) =>
    props.isVisible ? 'translateX(0%)' : 'translateX(100%)'};
  transition: transform 0.3s ease-out;
  overflow-y: auto;

  @media (min-width: 860px) {
    width: 520px;
  }
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 60px;
  left: 0;
  z-index: 100;
  height: calc(100% - 60px);
  width: calc(100% - 200px);
  margin-left: 200px;
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
`;

const DrawerHeading = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 40px 20px 20px 20px;

  @media (min-width: 860px) {
    padding: 40px;
  }
`;

export const Drawer = ({ isVisible, title, children, handleOutClick }) => {
  const theme = useTheme();

  return (
    <Fragment>
      <Overlay /* onClick={handleOutClick} */ isVisible={isVisible} />
      <SideDrawer isVisible={isVisible}>
        <DrawerHeading>
          <H3 color="#3C4144">{title}</H3>
          <Icon
            icon="close"
            size={20}
            color={theme.colors.primary}
            onClick={handleOutClick}
          />
        </DrawerHeading>

        {children}
      </SideDrawer>
    </Fragment>
  );
};
