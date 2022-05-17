import moment from 'moment';
import qs from 'qs';
import React, { useState } from 'react';
import { withRouter } from 'react-router';
import styled, { withTheme } from 'styled-components';
import { AutoSuggest } from 'components/Form/AutoSuggest';
import GetEvent from '../gql/queries/get-event';

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

const DateDropdown = (props) => {
  const { data, history } = props;
  const { date, ...query } = qs.parse(window.location.search.substring(1));

  const [eventDate, setDate] = useState(
    date !== undefined
      ? { value: date, label: moment(date).format('ddd, MMM DD, YYYY') }
      : null
  );

  if (!data.getEvent) return false;

  return props.data.loading ? (
    <div />
  ) : (
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
                label: moment(data.getEvent.eventDates[0]).format(
                  'ddd, MMM DD, YYYY'
                ),
              }
        }
        closeMenuOnSelect
        options={data.getEvent.eventDates.map((item) => ({
          value: item,
          label: moment(item).format('ddd, MMM DD, YYYY'),
        }))}
        onChange={(date) => {
          setDate(date);
          const newQuery = qs.stringify({
            ...query,
            date: date.value,
          });
          history.push(`?${newQuery} `);
        }}
      />
    </Container>
  );
};

export default withRouter(GetEvent(withTheme(DateDropdown)));
