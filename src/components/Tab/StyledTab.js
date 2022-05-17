import styled from "styled-components";

export const TabWrapper = styled.div`
  position: relative;
`;

export const TabGroupContainer = styled.div`
  position: relative;
  display: block;
  padding: 0;
`;

export const TabItem = styled.div`
  position: relative;
  display: inline-block;
  text-decoration: none;
  padding: 20px 4px;
  text-align: center;
  margin: 0 15px;
`;

export const TabText = styled.div`
  cursor: pointer;
`;

export const TabLine = styled.div`
  position: absolute;
  z-index: 10;
  bottom: 0;
  height: 4px;
  background: ${props => props.theme.colors.primary};
  display: block;
  transition: all 0.2s ease;

  left: ${props => props.bounds.left}px;
  width: ${props => props.bounds.width}px;
`;
