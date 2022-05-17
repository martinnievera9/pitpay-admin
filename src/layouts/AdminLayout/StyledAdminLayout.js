import { NavLink } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) =>
      props.theme.colors.background.light}!important;
  }
`;

export const BackgroundContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const Wrapper = styled.div`
  padding-bottom: 80px;
`;

export const NavMenu = styled.div`
  width: 200px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.primary};
  position: fixed;
  overflow: auto;
  height: 100%;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

export const Logo = styled.img`
  height: 44px;
  width: 117.08px;
`;
export const TicketHossLogo = styled.img`
  height: 70px;
  width: 1500.08px;
`;
export const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
  height: 50px;
  font-family: 'Barlow Condensed';
  font-weight: 700;
  font-size: 20px;
  text-decoration: none;

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

export const NavItemExternal = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
  height: 50px;
  font-family: 'Barlow Condensed';
  font-weight: 700;
  font-size: 20px;
  text-decoration: none;
  cursor: pointer;

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
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: ${(props) => props.theme.colors.secondary};
  height: 60px;
  width: 100%;
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
