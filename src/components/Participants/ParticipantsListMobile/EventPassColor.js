import React from 'react';
import styled from 'styled-components';
import { useGetEventColor } from '../gql';

const PassColor = styled.div`
  margin-right: 40px;
  border-radius: 5px;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color || '#fff'};
  width: 50%;
  box-sizing: border-box;
  font-family: Roboto;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  padding: 8px;
  margin: 0 10px;
`;

export const EventPassColor = () => {
  const { data } = useGetEventColor();
  const color = data?.getEventColor;
  if (!color) return null;

  return (
    <PassColor backgroundColor={color}>
      {color ? 'Pass Color' : 'No Pass Color Set'}
    </PassColor>
  );
};
