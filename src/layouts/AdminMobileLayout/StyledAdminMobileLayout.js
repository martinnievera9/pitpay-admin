import styled, { createGlobalStyle } from 'styled-components';
import { NavLink } from 'react-router-dom';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.backgroundColor || '#000'}!important;
  }
`;

export const BackgroundContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const NavMenuBackground = styled.div`
  position: relative;
  padding-top: 60px;

  ${(props) =>
    props.isVisible
      ? `  width: 100%;
          height: 100%;
          position: fixed;
          top: 60px;
          left: 0;
          background-color: rgba(8, 8, 8, 0.64);
          z-index:2;`
      : ''}
`;

export const NavMenu = styled.div`
  width: 140px;
  height: calc(100vh - 60px);
  top: 60px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.primary};
  position: fixed;
  transform: ${(props) =>
    props.isVisible ? 'translateX(0%)' : 'translateX(-100%)'};
  transition: transform 0.25s ease-out;
  z-index: 9999;
  overflow: scroll;

  &::after {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: blue;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

export const Logo = styled.img`
  height: 44px;
  width: 117.08px;
`;

export const Wrapper = styled.div``;

export const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
  height: 50px;
  font-family: 'Barlow Condensed';
  font-weight: 600;
  font-size: 5.5vw;
  text-decoration: none;

  @media (min-width: 700px) {
    font-size: 20px;
  }

  color: #fff;

  &.active {
    background-color: ${(props) => props.theme.colors.secondary};
  }

  &:active {
    color: #fff;
  }

  &:visited {
    color: #fff;
  }
`;

export const SettingsLink = styled(NavLink)`
  border-top-width: 3px;
  border-bottom-width: 3px;
  border-color: transparent;
  border-style: solid;
  display: flex;
  height: 100%;
  box-sizing: border-box;
  align-items: center;

  &.active {
    border-bottom-color: ${(props) => props.theme.colors.primary};
  }

  &:active {
    color: #fff;
  }

  &:visited {
    color: #fff;
  }
`;

export const TopBar = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: ${(props) => props.theme.colors.primary};
  height: 60px;
  width: 100%;
  z-index: 9;
  top: 0;
`;

export const SettingsWrapper = styled.div`
  padding: 0 20px;
  margin: 0 20px 0 0;
  border-right: 1px solid #222222;
  height: 100%;
  display: flex;
  align-items: center;
`;
export const UserName = styled.div`
  font-family: 'Barlow Condensed';
  font-weight: 600;
  font-size: 16px;
  color: #fff;
  margin-bottom: 5px;
  margin-right: 50px;
`;
export const UserRole = styled.div`
  font-weight: 500;
  font-size: 12px;
  color: #fff;
  opacity: 0.7;
  text-transform: uppercase;
`;
