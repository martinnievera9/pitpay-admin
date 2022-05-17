import dayjs from 'dayjs';
import React, { useState } from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { DateCard } from 'components/DateCard';
import { AutoSuggest } from 'components/Form/AutoSuggest';
import { H3 } from 'components/Heading';
import Loading from 'components/Loading';
import MobileContainer from 'components/MobileContainer';
import Spacer from 'components/Spacer';
import { useGetEventHeaderInfo } from './gql';

export const Title = styled(H3)`
  color: ${(props) => props.theme.colors.white};

  @media (min-width: 500px) {
    font-size: 26px;
  }
`;

export const WaiverWarning = styled.p`
  font-family: 'Barlow Condensed';
  font-weight: 600;
  font-size: 11px;
  color: #fa4616;
  margin-top: 10px;
  line-height: 1.4;
  @media (min-width: 400px) {
    font-size: 13px;
  }
`;

export const EventHeaderMobile = withRouter((props) => {
  const { dateProps, queryDate, noDropdown, noMargin } = props;
  const [date, setDate] = useState(
    queryDate
      ? {
          value: queryDate,
          label: dayjs(queryDate).format('MMM DD - YYYY'),
        }
      : null
  );

  const { data, loading } = useGetEventHeaderInfo();

  const event = data?.getEvent;

  if (!event) return null;

  const { name, eventDates } = event ?? {};

  return loading ? (
    <Loading size={60} />
  ) : !event ? null : (
    <>
      <MobileContainer padding="20px">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div>
            <DateCard item={event} />
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: 20,
            }}
          >
            <Title style={noMargin ? null : { marginRight: 50 }}>{name}</Title>
          </div>
        </div>
        {noDropdown ? null : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              fontSize: 22,
            }}
          >
            <AutoSuggest
              isSearchable={false}
              labelColor={'#fff'}
              name="date"
              label="Date"
              style={{ fontSize: 22 }}
              error={''}
              value={
                date
                  ? date
                  : {
                      value: eventDates?.[0],
                      label: dayjs(eventDates?.[0]).format('MMM DD - YYYY'),
                    }
              }
              closeMenuOnSelect
              options={eventDates?.map((item) => ({
                value: item,
                label: dayjs(item).format('MMM DD - YYYY'),
              }))}
              {...dateProps}
              onChange={(date) => {
                setDate(date);
                if (dateProps.onChange) dateProps.onChange(date);
              }}
            />
          </div>
        )}
      </MobileContainer>

      <Spacer size={10} />
    </>
  );
});
