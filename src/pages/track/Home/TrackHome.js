import React, { useEffect } from 'react';
import styled from 'styled-components';
import { UpcomingEvents } from 'components/UpcomingEvents';
import { VideoResourcesCarousel as VideoResources } from 'components/Video';
import { WeatherWidget } from 'components/Weather';
import storage from 'shared/storage';
import { Metrics } from '../Metrics';

const FlexContainer = styled.div`
  @media (min-width: 768px) {
    display: flex;
  }
`;

export const TrackHome = () => {
  useEffect(() => {
    if (storage.get('promoter-user')) {
      storage.set('user', storage.get('promoter-user'));
      storage.removeItem('track-address');
      storage.removeItem('shipping-address');
      storage.removeItem('promoter-user');
      storage.removeItem('showStripe');

      storage.removeItem('accountId');
      storage.removeItem('step');
    }
  }, []);
  return (
    <div style={{ boxSizing: 'border-box' }}>
      <FlexContainer>
        <UpcomingEvents userType="track" />
        <WeatherWidget Width="377px" showButton={true} />
        <Metrics />
        {/* <TicketHossStripeModal
          isVisible={showTicketHossModal}
          close={() => {
            storage.set('showModal', true);
            setShowTicketHossModal(false);
          }}
        /> */}
      </FlexContainer>
      <VideoResources userType="track" />
    </div>
  );
};
