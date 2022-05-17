import dayjs from 'dayjs';
import moment from 'moment';
import React from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import Anchor from 'components/Anchor';
import { DateCard } from 'components/DateCard';
import {
  EventYearFilter,
  withEventYearFilterContext,
} from 'components/Events/';
import { useGetUserEvents } from 'components/Events/gql';
import Icon from 'components/Icon';
import MobileContainer from 'components/MobileContainer';
import Spacer from 'components/Spacer';
import { TrackName, EventName } from '../style';

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const CardInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const CardHeader = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const EventsList = withEventYearFilterContext((props) => {
  const { track, match, search } = props;

  const { data } = useGetUserEvents(search);

  const url = match.url.split('/events')[0];

  const events = data?.getUserEventsV2?.results ?? [];

  const showTitles = events.reduce((acc, event) => {
    if (true === acc) {
      return acc;
    }

    if (false === acc) {
      return event.track.id;
    } else {
      return acc !== event.track.id ? true : event.track.id;
    }
  }, false);

  return (
    <>
      <EventYearFilter />
      {events.map((item, index) => (
        <Anchor
          to={`${url}/track/${
            item.track ? item.track.id : item.series.id
          }/events/${item.id}/participants?date=${
            moment(item.nextFullDate, 'ddd, MMM DD, YYYY').format(
              'YYYY-MM-DD'
            ) === moment().format('YYYY-MM-DD')
              ? dayjs(item.nextFullDate, 'ddd, MMM DD, YYYY').format(
                  'MMM DD-YYYY'
                )
              : item.eventDates[0]
          }`}
          key={index}
        >
          <MobileContainer>
            <FlexRow>
              <CardInfo>
                {true === showTitles ? (
                  <CardHeader>
                    <div>
                      <TrackName>{item.track.name}</TrackName>
                    </div>
                  </CardHeader>
                ) : null}
                {'postponed' === item.status ? (
                  <img
                    style={{
                      width: '25%',
                      height: 'auto',
                      display: 'block',
                      transform: 'rotate(10deg)',
                    }}
                    src="https://d3294qt0f4hbwl.cloudfront.net/postponed.png"
                    alt="postponed-stamp"
                  />
                ) : null}
                {'cancelled' === item.status ? (
                  <img
                    style={{
                      width: '25%',
                      height: 'auto',
                      display: 'block',
                      transform: 'rotate(10deg)',
                    }}
                    src="https://d3294qt0f4hbwl.cloudfront.net/cancelled.png"
                    alt="cancelled-stamp"
                  />
                ) : null}

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: 100 }}>
                    <DateCard item={item} />
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <EventName>
                        {track ? item.name : item.track.name}
                      </EventName>
                      <Spacer size={10} />
                    </div>

                    {!track ? (
                      <div>
                        <EventName>{item.name}</EventName>
                      </div>
                    ) : null}
                  </div>
                </div>
              </CardInfo>
              <div style={{ transform: 'rotate(-90deg)' }}>
                <Icon icon="chevron" size={22} color={'red'} />
              </div>
            </FlexRow>
          </MobileContainer>
        </Anchor>
      ))}
    </>
  );
});

export default withRouter(EventsList);
