import React from 'react';
import { withTheme } from 'styled-components';
import Spacer from 'components/Spacer';
import MobileSearchInput from '../../employee/Events/search';
import EventsList from './eventsList';

const Transactions = props => {
  let {
    match,
    data,
    count,
    loading,
    currentPage,
    handleBlur,
    handleChange,
    handleKeyPress,
    search
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

export default withTheme(Transactions);
