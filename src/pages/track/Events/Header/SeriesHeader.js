import React from 'react';
import Header from './index';
import GetSeriesDetail from '../gql/queries/get-series-detail';

const SeriesHeader = ({ data }) => {
  if (!data.getSeriesDetail) return false;

  return (
    <Header
      name={data.getSeriesDetail.name}
      logo={data.getSeriesDetail.logo}
      street={data.getSeriesDetail.website}
      type={data.getSeriesDetail.type.key}
    />
  );
};

export default GetSeriesDetail(SeriesHeader);
