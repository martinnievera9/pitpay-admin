/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from 'dayjs';
import React, { createContext, useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { AutoSuggest } from 'components/Form/AutoSuggest';

const thisYear = Number(dayjs().format('YYYY'));

const LabelText = styled.div`
  color: ${(props) => props.theme.colors.text.black};
  font-size: 16px;
  padding-left: 5px;
  margin-bottom: 6px;

  @media (min-width: 500px) {
    font-size: 17px;
  }
`;

const EventYearFilterContext = createContext();

export const EventYearFilterProvider = ({ children }) => {
  const [yearFilter, setYearFilter] = useState(thisYear);
  return (
    <EventYearFilterContext.Provider value={{ yearFilter, setYearFilter }}>
      {children}
    </EventYearFilterContext.Provider>
  );
};

export const useEventYearFilter = () => {
  const context = useContext(EventYearFilterContext);
  if (context === undefined) {
    throw new Error(
      'useEventYearFilter must be used within an EventYearFilterProvider'
    );
  }
  return context;
};

export const withEventYearFilterContext = (Component) => {
  return (props) => (
    <EventYearFilterProvider>
      <Component {...props} />
    </EventYearFilterProvider>
  );
};

export const YearDropdown = ({ onSelect }) => {
  const { yearFilter, setYearFilter } = useEventYearFilter();
  const years = [thisYear - 2, thisYear - 1, thisYear, thisYear + 1];

  useEffect(() => {
    onSelect({ value: thisYear });
  }, []);

  return (
    <>
      <LabelText>Year</LabelText>
      <AutoSuggest
        placeholder="Filter"
        options={years.map((year) => ({
          label: String(year),
          value: year,
        }))}
        value={{
          label: String(yearFilter),
          value: yearFilter,
        }}
        onChange={(year) => {
          if (onSelect) {
            onSelect(year?.value ? year : { value: thisYear });
          }
          setYearFilter(year?.value ? Number(year.value) : thisYear);
        }}
      />
    </>
  );
};
