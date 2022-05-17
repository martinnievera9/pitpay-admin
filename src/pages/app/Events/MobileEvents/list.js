import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { DateCard } from 'components/DateCard';
import { withRouter } from 'react-router';
import Anchor from 'components/Anchor';
import { EventYearFilter } from 'components/Events';
import { useGetEventsAdmin } from 'components/Events/gql';
import Icon from 'components/Icon';
import MobileContainer from 'components/MobileContainer';
import Spacer from 'components/Spacer';
import Text from 'components/Text';

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

const EventsList = () => {
  const { pathname } = useLocation();
  const eventType = pathname.includes('track')
    ? 'track'
    : pathname.includes('admin/events')
    ? 'events'
    : 'series';
  const { data } = useGetEventsAdmin(eventType);

  const events = data?.getEventsAdmin?.results ?? [];

  if (!data?.getEventsAdmin) return false;

  return (
    <>
      <EventYearFilter />
      {events.map((item, index) => (
        <Anchor to={`/admin/events/${item.id}`} key={index}>
          <MobileContainer>
            <FlexRow>
              <CardInfo>
                {'postponed' === item.status ? (
                  <img
                    style={{
                      width: '25%',
                      height: 'auto',
                      display: 'block',
                      transform: 'rotate(10deg)'
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
                      transform: 'rotate(10deg)'
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
                      width: '100%'
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <Text
                        type="heading"
                        fontSize={25}
                        lineHeight={28}
                        color="#fff"
                      >
                        {item.name}
                      </Text>
                      <Spacer size={10} />
                    </div>
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
};

export default withRouter(EventsList);
