import React from 'react';
import Header from './index';
import GetTrack from '../gql/queries/getTrack';

const TrackHeader = ({ data }) => {
  if (!data.getTrack) return false;

  return (
    <Header
      name={data.getTrack.name}
      logo={data.getTrack.logo}
      cityAndState={data.getTrack.cityAndState}
      street={data.getTrack.street}
      state={data.getTrack.state}
      zipcode={data.getTrack.zipcode}
      city={data.getTrack.city}
      type={data.getTrack.type.key}
      size={data.getTrack.size}
    />
  );
};

export default GetTrack(TrackHeader);
