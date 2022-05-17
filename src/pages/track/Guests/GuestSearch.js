import React, { createContext, useContext, useState } from 'react';
import styled from 'styled-components';
import { SearchInput } from 'components/Form/SearchInput';

const GuestSearchContext = createContext();

export const GuestSearchProvider = ({ children }) => {
  const [guestSearchQuery, setGuestSearchQuery] = useState('');
  return (
    <GuestSearchContext.Provider
      value={{ guestSearchQuery, setGuestSearchQuery }}
    >
      {children}
    </GuestSearchContext.Provider>
  );
};

export const useGuestSearch = () => {
  const context = useContext(GuestSearchContext);
  if (context === undefined) {
    throw new Error(
      'useGuestSearch must be used within an GuestSearchProvider'
    );
  }
  return context;
};

export const withGuestSearchContext = (Component) => {
  return (props) => (
    <GuestSearchProvider>
      <Component {...props} />
    </GuestSearchProvider>
  );
};

export const GuestSearchWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  box-sizing: border-box;
  display: inline-block;
  margin: 0 40px;
  padding: 16px;
`;

export const GuestSearch = () => {
  const { guestSearchQuery, setGuestSearchQuery } = useGuestSearch();

  function handleChange(event) {
    setGuestSearchQuery(event.target.value);
  }

  function handleKeyPress(event) {
    if (event.keyCode === 13) {
      setGuestSearchQuery(event.target.value);
    }
  }

  return (
    <SearchInput
      placeholder="Search Guests"
      onChange={handleChange}
      onBlur={handleChange}
      onKeyDown={handleKeyPress}
      value={guestSearchQuery}
    />
  );
};
