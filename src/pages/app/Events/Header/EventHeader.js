import React from 'react';
import SeriesHeader from './series-header';
import TrackHeader from './TrackHeader';

export const EventHeader = (props) => {
  const { type, id, margin } = props;

  return 'track' === type ? (
    <TrackHeader id={id} margin={margin} />
  ) : (
    <SeriesHeader id={id} margin={margin} />
  );
};
