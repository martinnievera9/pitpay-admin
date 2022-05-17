import React, { useState } from 'react';
import { withTheme } from 'styled-components';
import { withEventYearFilterContext } from 'components/Events';
import { useGetEventsAdmin } from 'components/Events/gql';
import Spacer from 'components/Spacer';
import EventsList from './list';
import MobileSearchInput from '../../../employee/Events/search';
import Pagination from 'components/Pagination';

const Events = withEventYearFilterContext(props => {
  let { location, history, match } = props;

  const eventType = location.pathname.includes('track')
    ? 'track'
    : location.pathname.includes('admin/events')
    ? 'events'
    : 'series';

  const { data } = useGetEventsAdmin(eventType);

  const urlParams = new URLSearchParams(location.search);
  const currentPage = parseInt(urlParams.get('page'));

  const [search, setSearch] = useState('');

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

  if (!data?.getEventsAdmin) return false;

  return (
    <div>
      <MobileSearchInput
        placeholder="Search Events"
        onChange={handleChange}
        value={search}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleKeyPress={handleKeyPress}
      />
      <Spacer size={10} />

      <EventsList search={search} currentPage={currentPage} />
      <div style={{ backgroundColor: '#00001F', margin: 10, borderRadius: 5 }}>
        <Pagination
          count={data.loading ? 0 : data.getEventsAdmin.count}
          perPage={15}
          currentPage={currentPage || 1}
          color={'#fff'}
        />
      </div>
      <Spacer size={40} />
    </div>
  );
});

export default withTheme(Events);
