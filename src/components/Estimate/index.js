import React from 'react';
import styled from 'styled-components';
import Spacer from 'components/Spacer';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EstimateNumber = styled.p`
  font-weight: bold;
  font-size: 22px;
  margin-right: 10px;
`;

export default ({ estimate, type }) => {
  return estimate !== null ? (
    <>
      <Spacer size={18} />
      <Wrapper>
        <EstimateNumber>{estimate.toLocaleString()}</EstimateNumber>
        <p>
          {`People Will Receive this ${
            'text' === type ? 'Text Message' : 'App Push Notification'
          }
          instantly`}
        </p>
      </Wrapper>
    </>
  ) : null;
};
