import dayjs from 'dayjs';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button, LinkButton } from 'components/Button';
import { Carousel } from 'components/Carousel';
import { DateCard } from 'components/DateCard';
import Loading from 'components/Loading';
import Spacer from 'components/Spacer';
import Text from 'components/Text';
import { useGetUpcomingEvent } from './useGetUpcomingEvent';

const SliderContainer = styled.div`
  background: ${(props) => props.theme.colors.secondary};
  overflow: hidden;
  margin: 10px;
  box-sizing: border-box;
  border-radius: 5px;
  width: calc(100% - 20px);

  @media (min-width: 860px) {
    max-width: 380px;
    width: 100%;
  }
`;

const TopTextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 0 20px;
`;

const ButtonPadding = styled.div`
  margin: 20px 10px;
`;

const CenterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TrackLogo = styled.img`
  width: auto;
  margin: 16px 0 0 0;
  max-width: 200px;
  max-height: 80px;
`;

const Box = styled.div`
  background: ${(props) => props.theme.colors.secondary};
  overflow: hidden;
  padding: 15px;
  box-sizing: border-box;
  max-width: 377px;
  height: 377px;
  margin: 10px;
  border-radius: 5px;
  width: 346px;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    color: ${(props) => props.theme.colors.text.white};
    text-align: center;
    font-size: 20px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  height: 80px;
`;

export const Title = styled.h3`
  display: inline;
  color: ${(props) => props.theme.colors.white};
  font-size: 6.8vw;
  line-height: 28px;
  font-weight: 600;
  font-family: Barlow Condensed;
  text-align: center;
  margin: 0;
  @media (min-width: 500px) {
    font-size: 26px;
  }
`;

export const TrackName = styled.span`
  display: inline;
  color: #9595a0;
  font-size: 5.5vw;
  line-height: 18px;
  font-weight: 400;
  text-align: left;
  @media (min-width: 500px) {
    font-size: 20px;
  }
`;

export const PitGate = styled.span`
  display: inline;
  color: ${(props) => props.theme.colors.primary};
  font-size: 6vw;
  line-height: 28px;
  font-weight: 800;
  font-family: Roboto;
  text-align: left;
  padding-right: 6px;
  @media (min-width: 500px) {
    font-size: 22px;
  }
`;

export const PitGateTime = styled.span`
  display: inline;
  color: ${(props) => props.theme.colors.white};
  font-size: 6vw;
  line-height: 28px;
  font-weight: 800;
  font-family: Roboto;
  text-align: left;
  @media (min-width: 500px) {
    font-size: 22px;
  }
`;

export const UpcomingEvents = ({ userType }) => {
  const history = useHistory();
  const { data, loading } = useGetUpcomingEvent();

  const isEmployee = userType === 'employee';

  const handleClickScan = (id, date) =>
    history.push(
      `/admin-${userType}/scan/${id}?date=${dayjs(date, 'MM-DD-YYYY').format(
        'YYYY-MM-DD'
      )}`
    );

  if (loading) return <Loading />;

  const events =
    data && data.getUpcomingEventsV2 && Array.isArray(data.getUpcomingEventsV2)
      ? data.getUpcomingEventsV2
      : undefined;
  if (!events) return null;

  const moldDate = (date) => {
    return dayjs(date.replace(/-/g, '/'), 'MM/DD/YYYY').format('YYYY-MM-DD');
  };
  return events.length > 0 ? (
    <SliderContainer className="slider-container">
      <Carousel>
        {events.map((event, index) => {
          return (
            <div key={index}>
              <TopTextContainer>
                <Text
                  color="white"
                  type="heading"
                  fontSize={isEmployee ? 18 : 20}
                >
                  {isEmployee
                    ? event.nextFullDate
                    : moment(new Date()).isSame(moment(event.nextFullDate))
                    ? 'Todays Event'
                    : 'Upcoming Event'}
                </Text>
              </TopTextContainer>
              <CenterContent>
                <Wrapper>
                  <DateCard
                    item={event}
                    medium={isEmployee ? undefined : true}
                    small={isEmployee ? true : undefined}
                    margin={isEmployee ? undefined : 'margin: 0 10px 0 0;'}
                  />
                  <TrackLogo
                    src={event.logo || event.track.logo}
                    style={{
                      marginLeft: isEmployee ? 10 : 20,
                      marginTop: 0,
                      ...(isEmployee ? { marginBottom: 0 } : undefined),
                    }}
                  />
                </Wrapper>
                <Title>{event.name}</Title>
                <Spacer size={6} />
                <TrackName>{event.track.name}</TrackName>
                <Spacer size={6} />
                <div style={{ display: 'flex' }}>
                  <PitGate>Pit Gate:</PitGate>
                  <PitGateTime>{event.nextGateTime}</PitGateTime>
                </div>
              </CenterContent>
              <ButtonPadding>
                <LinkButton
                  to={`/admin-${userType}/track/${
                    event.track ? event.track.id : event.series.id
                  }/events/${event.id}/participants?date=${moldDate(
                    event.next_date
                  )}`}
                >
                  {process.env.REACT_APP_PLATFORM !== 'tickethoss'
                    ? 'VIEW PARTICIPANTS LIST'
                    : 'VIEW TICKETS LIST'}
                </LinkButton>
              </ButtonPadding>
              <ButtonPadding
                style={{
                  marginBottom: 0,
                  ...(!isEmployee ? { fontSize: 20, height: 40 } : undefined),
                }}
              >
                <Button
                  onClick={() => handleClickScan(event.id, event.next_date)}
                  block
                  buttonStyle={isEmployee ? undefined : { height: 40 }}
                  style={isEmployee ? undefined : { fontSize: 20 }}
                >
                  SCAN PARTICIPANTS
                </Button>
              </ButtonPadding>
            </div>
          );
        })}
      </Carousel>
    </SliderContainer>
  ) : (
    <Box>
      <p>You do not have any upcoming events</p>
    </Box>
  );
};
