import React from 'react';
import styled, { withTheme } from 'styled-components';
import MobileContainer from 'components/MobileContainer';
import Text from 'components/Text';

const EventLogo = styled.img`
  width: 100%;
  height: auto;
`;

const EventListHeader = ({ logo, name }) => {
  return (
    <MobileContainer padding="20px">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        {logo ? (
          <div style={{ width: '40%' }}>
            <EventLogo src={logo} />
          </div>
        ) : null}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '60%',
            marginLeft: 20
          }}
        >
          {name ? (
            <Text type="heading" color="#fff">
              {name}
            </Text>
          ) : null}
        </div>
      </div>
    </MobileContainer>
  );
};

export default withTheme(EventListHeader);
