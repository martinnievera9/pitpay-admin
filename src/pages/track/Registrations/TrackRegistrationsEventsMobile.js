import React, { useState } from 'react';
import { withEventYearFilterContext } from 'components/Events/';
import { useGetUserEvents } from 'components/Events/gql';
import { RegistrationsEventsMobile } from 'components/Registrations';

export const TrackRegistrationsEventsMobile = withEventYearFilterContext(
  ({ match, history }) => {
    const [search, setSearch] = useState('');

    const { data, loading } = useGetUserEvents();

    const events = data?.getUserEventsV2?.results ?? [];

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
      <RegistrationsEventsMobile
        match={match}
        data={events}
        loading={loading}
        count={data?.getUserEvents?.count ?? 0}
        history={history}
        currentPage={currentPage}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleKeyPress={handleKeyPress}
        search={search}
      />
    );
  }
);
