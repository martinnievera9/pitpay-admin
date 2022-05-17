import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { logDevError } from 'shared/alerts';
import { useDownloadWaiver } from './gql/useDownloadWaiver';

const Container = styled.button`
  border: none;
  background-color: #fa4616;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 5px;
  padding: 5px;
  ${(props) => (props.disabled ? `opacity: 0.5; pointer-events: none;` : '')};

  p {
    margin-left: 10px;
    color: #fff;
    font-family: 'Barlow Condensed';
    font-size: 22px;
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
    ${(props) => (props.transparent ? `background-color: transparent` : '')};
  }
`;

export const WaiverDownloadButton = ({ passId, icon, transparent = true }) => {
  const [loading, setLoading] = useState(false);
  const downloadWaiver = useDownloadWaiver();

  return (
    <Container
      transparent={transparent}
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        try {
          const response = await downloadWaiver(passId);
          setLoading(false);

          if (!response || response.errors) {
            toast.error('Cannot download waiver');
          } else {
            window.location.assign(response.data.downloadWaiver);
          }
        } catch (error) {
          logDevError(error);
          toast.error('Cannot download waiver');
          setLoading(false);
        }
      }}
    >
      {icon}
    </Container>
  );
};
