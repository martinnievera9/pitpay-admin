import qs from 'qs';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, MinimalButton } from 'components/Button';
import { EventHeaderMobile } from 'components/Events';
import Icon from 'components/Icon';
import Loading from 'components/Loading';
import { useGetTicketsList } from 'components/Participants/gql';
import { CancelModal } from 'components/Participants/Modals';
import Spacer from 'components/Spacer';
import { useSearchInput } from 'hooks/useSearchInput';
import { PrintButton } from './PrintButton';
import { Text } from './style';
import { Tickets } from './Tickets';

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  position: relative;
  width: 100%;
  & > :not(:last-child) {
    margin-right: 20px;
  }
`;

const InputWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  padding: 0 20px;
  width: calc(100% - 40px);

  &:focus {
    outline: none;
  }

  &:focus-within,
  :focus {
    & input {
      outline: none;
      border-bottom: 1px solid #b7b7bb;
    }
  }
`;

const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid transparent;
  border-bottom-color: ${(props) =>
    props.focused ? `#b7b7bb;` : 'transparent'};
  color: #b7b7bb;
  display: inline-block;
  font-family: Roboto;
  font-size: 18px;
  margin-left: 10px;
  padding: 0;
  width: 100%;
`;

export const TicketsListMobile = (props) => {
  const { history, match, location } = props;
  const adminTrack = match.url.includes('admin-track');
  const admin = match.url.includes('/admin/');

  const [search, setSearch] = useState('');
  const {
    input: { date },
  } = useSearchInput();
  const { data, loading } = useGetTicketsList({ date, search });
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSelectedEvent, setShowSelectedEvent] = useState({});
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const tickets = data?.getSpectatorTickets;
  const event = data?.getEvent;

  useEffect(() => {
    if (!event) return;

    setShowSelectedEvent({ ...event });
  }, [event]);

  const handleClickScan = (id, date) => {
    if (adminTrack) {
      history.push(`/admin-track/scan/${id}?date=${date}`);
    } else if (admin) {
      history.push(`/admin/scan/${id}?date=${date}`);
    } else {
      history.push(`/admin-employee/scan/${id}?date=${date}`);
    }
  };

  const handleChange = (e) => setSearch(e.target.value);

  const handleBlur = (e) => {
    setSearch(e.target.value);
    setIsSearchFocused(false);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      setSearch(e.target.value);
    }
  };

  return !tickets && !event ? null : (
    <div>
      {showCancelModal ? (
        <CancelModal
          adminTrack={adminTrack}
          showCancelModal={showCancelModal}
          close={() => {
            setShowCancelModal(false);
          }}
          selectedEvent={showSelectedEvent}
          currentType={match.url.includes('track') ? 'track' : 'series'}
          objectId={match.params.id}
        />
      ) : null}
      <EventHeaderMobile
        queryDate={date}
        dateProps={{
          onChange: (date) => {
            const newQuery = qs.stringify({
              date: date.value,
            });
            history.push(`?${newQuery} `);
          },
        }}
      />
      <InputWrapper
        tabIndex={0}
        // style={isSearchFocused ? { position: 'absolute' } : undefined}
      >
        <Icon icon="search" size={21} color="#a2a2a2" />
        <Input
          name="search"
          focused={isSearchFocused}
          icon="search"
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyPress}
          placeholder="Search"
          value={search}
          style={{ fontSize: 22 }}
        />
      </InputWrapper>
      <Spacer size={20} />
      <Container
        style={{
          justifyContent: 'space-between',
        }}
      >
        {adminTrack &&
          (event?.status === 'cancelled' ? (
            <Text>Status: Cancelled</Text>
          ) : event?.status === 'postponed' ? (
            <Text>Status: Postponed</Text>
          ) : (
            <MinimalButton
              icon="cancel-event"
              onClick={() => {
                setShowCancelModal(true);
              }}
            >
              Cancel / Postpone
            </MinimalButton>
          ))}
        <PrintButton event={event} date={date} match={match} />
        <Button onClick={() => handleClickScan(event?.id, date)}>Scan</Button>
      </Container>
      <Spacer size={20} />
      {loading ? (
        <Loading size={60} />
      ) : (
        <Tickets
          match={match}
          location={location}
          search={search}
          date={date}
        />
      )}
      <Spacer size={20} />
    </div>
  );
};
