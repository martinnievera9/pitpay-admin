import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useState, useEffect } from 'react';
import styled, { withTheme } from 'styled-components';
import { toast } from 'react-toastify';

const Container = styled.button`
  border: none;
  background-color: #fa4616;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 5px;
  padding: 5px;
  ${props => (props.disabled ? `opacity: 0.5; pointer-events: none;` : '')};

  p {
    margin-left: 10px;
    color: #fff;
    font-family: 'Barlow Condensed';
    font-size: 18px;
    font-weight: 600;
    line-height: 19px;
    text-align: center;
    text-transform: uppercase;
  }

  &:focus {
    outline: none;
  }

  @media (min-width: 768px) {
    border: none;
    background-color: transparent;
  }
`;

export const GET_DOWNLOAD_URL = gql`
  query GetDownloadUrl($pass_id: Int!) {
    getDownloadUrl(pass_id: $pass_id)
  }
`;

const WaiverDownload = ({ passId, theme, icon, ...props }) => {
  const [getDownloadWaiver, { data, loading }] = useLazyQuery(
    GET_DOWNLOAD_URL,
    {
      variables: { pass_id: passId }
    }
  );
  const [clickedOn, setOnClick] = useState();

  useEffect(() => {
    if (data && data.getDownloadUrl) {
      window.location.assign(data.getDownloadUrl);
    }
  }, [data, passId]);

  return (
    <Container
      disabled={loading}
      onClick={() => {
        setOnClick(true);
        if (clickedOn && data === undefined) {
          toast.error('Cannot download waiver');
        }

        try {
          getDownloadWaiver(passId);
        } catch (e) {
          console.log('e', e);
        }
      }}
    >
      {icon}
    </Container>
  );
};

export default withTheme(WaiverDownload);
