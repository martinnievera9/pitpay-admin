import React from 'react';
import Spacer from 'components/Spacer';
import MobileSearchInput from 'pages/employee/Events/search';
import { RegistrationsEventsListMobile as EventsList } from './RegistrationsEventsListMobile';

export const RegistrationsEventsMobile = (props) => {
  const {
    match,
    data,
    count,
    loading,
    currentPage,
    handleBlur,
    handleChange,
    handleKeyPress,
    search,
  } = props;

  return (
    <div>
      <MobileSearchInput
        placeholder="Search Events.."
        onChange={handleChange}
        value={search}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleKeyPress={handleKeyPress}
      />
      <Spacer size={10} />
      <EventsList
        search={search}
        match={match}
        currentPage={currentPage}
        data={data}
        count={count}
        loading={loading}
      />
    </div>
  );
};
