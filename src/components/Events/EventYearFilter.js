import dayjs from 'dayjs';
import React, { createContext, useContext, useState } from 'react';
import styled from 'styled-components';
import { AutoSuggest } from 'components/Form/AutoSuggest';

const thisYear = Number(dayjs().format('YYYY'));

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

const FilterContainer = styled.div`
  min-width: 230px;
  margin-left: 25px;

  @media screen and (max-width: 860px) {
    margin-left: 0;
    margin-bottom: 10px;
    padding: 0 20px;
  }
`;

export const EventYearFilter = () => {
  const { yearFilter, setYearFilter } = useEventYearFilter();
  const years = [thisYear - 2, thisYear - 1, thisYear, thisYear + 1];
  return (
    <FilterContainer>
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
        onChange={(year) =>
          setYearFilter(year?.value ? Number(year.value) : thisYear)
        }
      />
    </FilterContainer>
  );
};
