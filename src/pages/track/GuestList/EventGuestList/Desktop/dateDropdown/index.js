import dayjs from 'dayjs';
import React, { useState } from 'react';
import styled from 'styled-components';
import { AutoSuggest } from 'components/Form/AutoSuggest';
import { useSearchInput, useUpdateQuery } from 'hooks/useSearchInput';
import { useGetEvent } from '../../../gql/useGetEvent';

const Container = styled.div`
  margin-left: 0;
  margin-top: 10px;

  @media (min-width: 860px) {
    display: flex;
    flex-direction: column;
    width: 200px;
    margin-left: 20px;
    margin-top: 0;
  }
`;

const DateDropdown = () => {
  const { data, loading } = useGetEvent();
  const { input } = useSearchInput();
  const { updateQuery } = useUpdateQuery();
  const { date } = input ?? {};

  const [eventDate, setEventDate] = useState(
    date !== undefined
      ? { value: date, label: dayjs(date).format('MMM DD - YYYY') }
      : null
  );

  return loading ? (
    <div />
  ) : !data?.getEvent ? null : (
    <Container>
      <AutoSuggest
        isSearchable={false}
        name="date"
        error={''}
        value={
          eventDate
            ? eventDate
            : {
                value: data.getEvent.eventDates[0],
                label: dayjs(data.getEvent.eventDates[0]).format(
                  'MMM DD - YYYY'
                ),
              }
        }
        closeMenuOnSelect
        options={data.getEvent.eventDates.map((item) => ({
          value: item,
          label: dayjs(item).format('MMM DD - YYYY'),
        }))}
        onChange={(date) => {
          setEventDate(date);
          updateQuery({ date: date.value });
        }}
      />
    </Container>
  );
};

export default DateDropdown;
