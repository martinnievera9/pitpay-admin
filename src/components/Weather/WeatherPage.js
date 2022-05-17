import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { useGetUpcomingEvent } from 'components/UpcomingEvents/useGetUpcomingEvent';
import { WeatherWidget, Radar } from 'components/Weather';

const Wrapper = styled.div`
  @media (min-width: 864px) {
    display: flex;
    align-items: flex-start;
  }
`;

export const WeatherPage = (props) => {
  const { userType = 'admin-track' } = props;
  const { data } = useGetUpcomingEvent();

  // const width = userType === 'admin-track' ? '800px' : '377px';

  const events = data?.getUpcomingEvent;
  const me = data?.me;

  if (!events && !me) return null;

  return (
    <Wrapper>
      <WeatherWidget Width="377px" showHourly />
      {events.length || me.track ? (
        <Radar
          radarwidth={769}
          Width={userType === 'admin-track' ? '800px' : '377px'}
          data={data}
        />
      ) : null}
    </Wrapper>
  );
};
WeatherPage.propTypes = {
  userType: PropTypes.oneOf(['admin-track', 'employee']),
};
