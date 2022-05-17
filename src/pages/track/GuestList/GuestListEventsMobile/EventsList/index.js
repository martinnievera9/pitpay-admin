import React from 'react';
import styled from 'styled-components';
import DateCard from '../datecard';
import { withRouter } from 'react-router';
import Anchor from 'components/Anchor';
import { EventYearFilter, withEventYearFilterContext } from 'components/Events';
import { useGetUserEvents } from 'components/Events/gql';
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

const CardHeader = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const EventsList = withEventYearFilterContext(props => {
  let { track, match, search } = props;

  let url = match.url.split('/events')[0];

  const { data } = useGetUserEvents(search);

  const events = data?.getUserEvents?.results ?? [];

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
        <Anchor to={`${url}/event/${item.id}`} key={index}>
          <MobileContainer>
            <FlexRow>
              <CardInfo>
                {true === showTitles ? (
                  <CardHeader>
                    <div>
                      <p
                        style={{
                          color: '#FFF',
                          fontSize: 25,
                          fontWeight: 600,
                          fontFamily: 'Barlow Condensed',
                          lineHeight: 1.4
                        }}
                      >
                        {item.track.name}
                      </p>
                    </div>
                  </CardHeader>
                ) : null}
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
                        {track ? item.name : item.track.name}
                      </Text>
                      <Spacer size={10} />
                    </div>

                    {!track ? (
                      <div>
                        <Text
                          fontSize={20}
                          lineHeight={28}
                          color="#B7B7BB"
                          style={{ marginBottom: 10 }}
                        >
                          {item.name}
                        </Text>
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
