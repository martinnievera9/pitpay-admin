import React, { useState } from 'react';
import { withTheme } from 'styled-components';
import { withEventYearFilterContext } from 'components/Events/';
import { useGetUserEvents } from 'components/Events/gql';
import MobileTransactionsComponent from './mobileTransactions';

const MobileTransactions = withEventYearFilterContext(({ match, history }) => {
  const [search, setSearch] = useState('');
  const { data, loading } = useGetUserEvents();

  const handleChange = (e) => {
    setSearch(e.target.value);
    history.push(`${match.url}?queryString=${e.target.value}`);
  };

  const handleBlur = (e) => {
    history.push(`${match.url}?queryString=${e.target.value}`);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      history.push(`${match.url}?queryString=${e.target.value}`);
    }
  };

  const urlParams = new URLSearchParams(window.location.search);
  const currentPage = parseInt(urlParams.get('page'));

  return (
    <MobileTransactionsComponent
      match={match}
      data={data?.getUserEventsV2?.results ?? []}
      loading={loading}
      count={data?.getUserEventsV2?.count ?? 0}
      history={history}
      currentPage={currentPage}
      handleChange={handleChange}
      handleBlur={handleBlur}
      handleKeyPress={handleKeyPress}
      search={search}
    />
  );
});

export default withTheme(MobileTransactions);
