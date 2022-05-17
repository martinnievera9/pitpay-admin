import React from 'react';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { UpcomingEvents, useGetUpcomingEvent } from 'components/UpcomingEvents';
import { VideoResourcesCarousel as VideoResources } from 'components/Video';
import { Radar, WeatherWidget } from 'components/Weather';
import { useOfflineCheck } from 'hooks/useOfflineCheck';
import storage from 'shared/storage';
import { useInterval } from 'shared/timeout';

export const EmployeeHome = () => {
  const { data } = useGetUpcomingEvent();

  const me = data?.me;
  const events =
    data?.getUpcomingEvent && Array.isArray(data.getUpcomingEvent)
      ? data.getUpcomingEvent
      : undefined;

  const isOffline = useOfflineCheck();

  useInterval(
    () => {
      storage.removeItem('apollo-cache-persist');
    },
    !isOffline ? 3000 : null
  );

  return (
    <div style={{ padding: 20, boxSizing: 'border-box' }}>
      <UpcomingEvents userType="Employee" />
      <WeatherWidget Width="377px" />
      {(events && events.length > 0) || (me && me.track) ? (
        <Radar Width="377px" data={data} />
      ) : null}
      <VideoResources userType="employee" />
    </div>
  );
};
