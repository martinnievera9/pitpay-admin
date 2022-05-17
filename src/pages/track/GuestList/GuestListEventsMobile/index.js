import React, { useState } from 'react';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { LinkButton } from 'components/Button';
import Pagination from 'components/Pagination';
import Spacer from 'components/Spacer';
import EventsList from './EventsList';
import Me from './gql/queries/me';
import MobileSearchInput from './search';

const Events = (props) => {
  const { data, location } = props;

  const urlParams = new URLSearchParams(location.search);
  const currentPage = parseInt(urlParams.get('page'));

  const [search, setSearch] = useState('');

  const handleChange = (e) => setSearch(e.target.value);

  const handleBlur = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      setSearch(e.target.value);
    }
  };

  if (!data.me) return false;

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
      <div style={{ paddingLeft: 20, paddingRight: 20 }}>
        <LinkButton to={'/admin-track/guests'}>View or Add Guests</LinkButton>
      </div>

      <Spacer size={10} />
      <EventsList
        search={search}
        series={data.me.series ? true : false}
        track={data.me.track ? true : false}
        currentPage={currentPage}
      />
      <div style={{ backgroundColor: '#00001F', margin: 10, borderRadius: 5 }}>
        <Pagination
          count={data?.getUserEvents?.count ?? 0}
          perPage={15}
          currentPage={currentPage || 1}
          color={'#fff'}
        />
      </div>
      <Spacer size={40} />
    </div>
  );
};

export default withTheme(compose(Me)(Events));
