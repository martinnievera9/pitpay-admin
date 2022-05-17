import React, { useState } from 'react';
import styled from 'styled-components';
import Loading from 'components/Loading';

export const Container = styled.div`
  color: ${props => props.theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  margin-bottom: 10px;
  text-align: center;
  height: 55px;
  width: 65px;

  & > img {
    display: ${props => (props.status === 'completed' ? 'inline' : 'none')};
  }
`;

export const HourlyImage = props => {
  const { iconFile, altText } = props;
  const [status, setStatus] = useState('loading');

  return (
    <Container status={status}>
      <img
        src={`https://cdn.aerisapi.com/wxicons/v2/${iconFile}`}
        alt={altText}
        onLoad={() => {
          setTimeout(() => {
            setStatus('completed');
          }, 2000);
        }}
        onError={() => setStatus('error')}
      />
      {status === 'loading' ? (
        <Loading />
      ) : status === 'error' ? (
        'No preview available'
      ) : null}
    </Container>
  );
};
