import qs from 'qs';
import React, { useState } from 'react';
import { EventHeaderMobile } from 'components/Events';
import Spacer from 'components/Spacer';
import { useGetRefundStatus } from 'components/Transactions';
import MobileSearchInput from 'pages/employee/Events/search';
import { RegistrationsTransactionsListMobile as List } from './RegistrationsTransactionsListMobile';

export const RegistrationsMobile = (props) => {
  const { match, location } = props;
  const [search, setSearch] = useState('');
  const { data } = useGetRefundStatus();

  const { page } = qs.parse(window.location.search.substring(1));

  const handleChange = (e) => setSearch(e.target.value);

  const handleBlur = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      setSearch(e.target.value);
    }
  };

  const urlParams = new URLSearchParams(window.location.search);
  const currentPage = parseInt(urlParams.get('page'));

  return (
    <div>
      <MobileSearchInput
        placeholder="Search Registrations.."
        onChange={handleChange}
        value={search}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleKeyPress={handleKeyPress}
      />
      <EventHeaderMobile noDropdown queryDate={'2020-05-23'} noMargin />
      <Spacer size={10} />

      <Spacer size={10} />
      <List
        page={page}
        refundEventStatus={data?.getEventRefundStatus}
        currentPage={currentPage}
        match={match}
        location={{ ...location, search: `?queryString=${search}` }}
        queryString={search}
      />
    </div>
  );
};
