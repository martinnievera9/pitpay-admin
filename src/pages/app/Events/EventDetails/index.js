import dayjs from 'dayjs';
import moment from 'moment';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled, { withTheme } from 'styled-components';
import {
  CardText,
  Card,
  CardLabel,
  CardContent,
} from 'components/Card/cardStyle';
import Container from 'components/Container';
import { useDuplicateEvent } from 'components/Events/gql';
import Icon from 'components/Icon';
import { CancelModal } from '../CancelModal';
import { EventEdit } from '../EventEdit';
import GetEvent from './gql/get-events';

const PassColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: ${(props) => props.color};
`;

const Event = ({ data, theme, match, location }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [newEvent, setNewEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState();

  const duplicateEvent = useDuplicateEvent();

  const type = -1 === location.pathname.indexOf('track') ? 'series' : 'track';

  const handleOutClick = () => {
    setEditEvent(null);
    setShowModal(false);
    setNewEvent(false);

    setTimeout(() => {
      setIsVisible(!isVisible);
    }, 300);
  };

  if (!data.getEvent) return false;

  return (
    <Container>
      <div style={{ padding: 20 }}>
        <Card key={data.getEvent.id}>
          <CardText>
            <CardLabel style={{ width: '15%' }}>Date:</CardLabel>
            <CardContent style={{ width: '85%' }}>
              {data.getEvent.fullDate
                ? moment(data.getEvent.fullDate).format('MMM DD - YYYY')
                : ''}
            </CardContent>
          </CardText>
          <CardText>
            <CardLabel style={{ width: '15%' }}>Name:</CardLabel>{' '}
            <CardContent style={{ width: '85%' }}>
              {data.getEvent.name}
            </CardContent>
          </CardText>
          <CardText>
            <CardLabel style={{ width: '15%' }}>Track:</CardLabel>{' '}
            <CardContent style={{ width: '85%' }}>
              {data.getEvent.track.name}
            </CardContent>
          </CardText>
          <CardText>
            <CardLabel style={{ width: '40%' }}>Pass Color:</CardLabel>{' '}
            <CardContent style={{ width: '20%' }}>
              <PassColor
                color={data.getEvent.color_code ? data.getEvent.color_code : ''}
              />
            </CardContent>
          </CardText>
          <CardText>
            <CardLabel style={{ width: '15%' }}>Status:</CardLabel>{' '}
            <CardContent style={{ width: '85%', textTransform: 'capitalize' }}>
              {data.getEvent.status}
            </CardContent>
          </CardText>

          <CardText>
            <CardContent style={{ marginLeft: 0, textTransform: 'capitalize' }}>
              <Link
                style={{
                  color: theme.colors.primary,
                }}
                to={`/admin/${type}/${match.params.id}/events/${
                  data.getEvent.id
                }/participants?date=${dayjs(
                  data.getEvent.start_date,
                  'MM-DD-YYYY'
                ).format('YYYY-MM-DD')}`}
              >
                {process.env.REACT_APP_PLATFORM !== 'tickethoss'
                  ? 'Participants List'
                  : 'Tickets List'}
              </Link>
            </CardContent>
          </CardText>

          <Icon
            icon="edit"
            size={18}
            color={theme.colors.primary}
            padding="0 15px 0 0"
            onClick={async () => {
              setEditEvent(data.getEvent.id);
              setIsVisible(true);
              setTimeout(() => {
                setShowModal(true);
              }, 300);
            }}
          />
          <Icon
            icon="cancel-event"
            size={22}
            color={theme.colors.primary}
            onClick={() => {
              setShowCancelModal(true);
              setSelectedEvent(data.getEvent);
            }}
          />
          <Icon
            icon="duplicate"
            size={22}
            color={theme.colors.primary}
            onClick={async () => {
              if (
                window.confirm('Are you sure you want to duplicate this event?')
              ) {
                const response = await duplicateEvent(data.getEvent.id);
                if (!response || response.errors) {
                  toast.error('Could not duplicate this event');
                } else {
                  toast.success('Event successfully duplicated');
                  window.location.href = '/admin/events';
                }
              }
            }}
            padding="0 0 0 15px"
          />
        </Card>
      </div>
      {isVisible && (
        <EventEdit
          newEvent={newEvent}
          isVisible={showModal}
          handleOutClick={handleOutClick}
          id={match.params.id}
          currentEvent={editEvent}
          currentTrack={match.url.includes('track') ? match.params.id : null}
          currentSeries={match.url.includes('series') ? match.params.id : null}
        />
      )}
      {showCancelModal ? (
        <CancelModal
          close={() => setShowCancelModal(false)}
          selectedEvent={selectedEvent}
          allEvents={data.getEventsAdmin.results}
          currentType={
            match.url.includes('track')
              ? 'track'
              : match.url.includes('series')
              ? 'series'
              : null
          }
          objectId={match.params.id}
        />
      ) : null}
    </Container>
  );
};
export default withTheme(GetEvent(Event));
