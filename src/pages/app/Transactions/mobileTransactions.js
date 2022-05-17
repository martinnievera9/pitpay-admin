import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { withEventYearFilterContext } from 'components/Events';
import { useGetEventsAdmin } from 'components/Events/gql';
import MobileTransactionsComponent from '../../track/MobileTransactions/mobileTransactions';

const MobileTransactions = withEventYearFilterContext(({ match, history }) => {
  const [search, setSearch] = useState('');

  const { pathname } = useLocation();
  const eventType = pathname.includes('track')
    ? 'track'
    : pathname.includes('/admin/series')
    ? 'series'
    : 'events';
  const { data, loading } = useGetEventsAdmin(eventType);
  const events = data?.getEventsAdmin?.results ?? [];

  const handleChange = e => {
    setSearch(e.target.value);
    history.push(`${match.url}?queryString=${e.target.value}`);
  };

  const handleBlur = e => {
    history.push(`${match.url}?queryString=${e.target.value}`);
  };

  const handleKeyPress = e => {
    if (e.keyCode === 13) {
      history.push(`${match.url}?queryString=${e.target.value}`);
    }
  };

  const urlParams = new URLSearchParams(window.location.search);
  const currentPage = parseInt(urlParams.get('page'));

  return (
    <MobileTransactionsComponent
      match={match}
      loading={loading}
      count={data?.getEventsAdmin?.count ?? 0}
      data={events}
      history={history}
      currentPage={currentPage}
      handleChange={handleChange}
      handleBlur={handleBlur}
      handleKeyPress={handleKeyPress}
      search={search}
    />
  );
});

export default MobileTransactions;
