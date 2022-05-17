import styled from 'styled-components';

export const Button = styled.a`
  border-radius: 5px;
  background-color: #fa4616;
  display: flex;
  padding: 0 16px;
  justify-content: center;
  align-items: center;
  border: 0;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  color: #ffffff;
  font-family: 'Barlow Condensed';
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  text-align: center;
  text-transform: uppercase;
  padding: 10px;
  z-index: 2;
  text-decoration: none;

  &:disabled {
    background-color: #ccc;
  }

  &:hover:disabled {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))
      #ccc;
  }

  &:hover:enabled {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));
  }
`;
