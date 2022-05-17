import React, { useState } from 'react';
import styled from 'styled-components';
import { DateCard } from 'components/DateCard';
import Icon from 'components/Icon';
import { ModalSmsNotification } from 'components/ModalSmsNotification';
import Text from 'components/Text';
import useTheme from 'hooks/useTheme';
import {
  GuestForm,
  GuestSearch,
  GuestSearchWrapper,
  useGuestSearch,
  withGuestSearchContext,
} from 'pages/track/Guests';
import { useGetEventAndEventGuests } from '../../gql/useGetEventAndEventGuests';
import { PrintGuestList } from '../PrintGuestList';
import Export from './export';
import { GuestList } from './GuestList';

const HeaderWrapper = styled.div`
  @media (min-width: 860px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 40px 40px 20px 40px;
  }
`;

const Header = styled.div`
  width: 80vw;
`;

export const GuestListDesktop = withGuestSearchContext(() => {
  const theme = useTheme();
  const { guestSearchQuery: queryString } = useGuestSearch();
  const [guestTypeToAdd, setGuestTypeToAdd] = useState(null);
  const [newGuestData, setNewGuestData] = useState(null);

  const { data } = useGetEventAndEventGuests({ queryString });

  if (!data || !data.getEventGuests || !data.getEvent) return null;

  const event = data?.getEvent;
  const guests = data?.getEventGuests;

  async function onSetNewGuestData(guest) {
    setNewGuestData(guest);
  }

  return (
    <>
      <HeaderWrapper>
        <Header>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <DateCard item={event} margin={'margin: 0 10px 0 0'} />

            <Text type="heading" fontSize={32} color={theme.colors.secondary}>
              {event.name}
            </Text>

            {event.status === 'postponed' ? (
              <img
                style={{
                  width: '10%',
                  height: 'auto',
                  display: 'block',
                  marginLeft: 20,
                  transform: 'rotate(10deg)',
                }}
                src="https://d3294qt0f4hbwl.cloudfront.net/postponed.png"
                alt="postponed-stamp"
              />
            ) : null}
            {event.status === 'cancelled' ? (
              <img
                style={{
                  width: '10%',
                  height: 'auto',
                  display: 'block',
                  marginLeft: 20,
                }}
                src="https://d3294qt0f4hbwl.cloudfront.net/cancelled.png"
                alt="cancelled-stamp"
              />
            ) : null}
          </div>
        </Header>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Export
            guests={guests}
            event={event}
            icon={<Icon icon="Export-Icon" size={40} />}
          />
          <PrintGuestList
            guests={guests}
            event={event}
            buttonLabel="Print List"
          />
        </div>
        <div style={{ width: '20%', marginLeft: 40 }}>
          <img
            style={{ width: '100%', height: 'auto', display: 'block' }}
            src={
              event.track
                ? event.track.logo
                : event.series
                ? event.series.logo
                : null
            }
            alt="logo"
          />
        </div>
      </HeaderWrapper>
      <GuestSearchWrapper>
        <GuestSearch />
      </GuestSearchWrapper>
      <GuestList
        guests={data.getEventGuests.event_guests}
        title="Single Event Guests"
        handleAddClick={() => setGuestTypeToAdd('event_guests')}
      />
      <GuestList
        guests={data.getEventGuests.yearly_guests}
        title="Full Season Guests"
        handleAddClick={() => setGuestTypeToAdd('yearly_guests')}
      />
      <GuestForm
        isVisible={!!guestTypeToAdd}
        handleOutClick={() => setGuestTypeToAdd(null)}
        guestTypeToAdd={guestTypeToAdd}
        queryString={queryString}
        setNewGuestData={onSetNewGuestData}
      />

      <ModalSmsNotification
        isVisible={newGuestData !== null}
        cancelText="Close"
        title="New Guest Added"
        cellphone={newGuestData?.phone_number}
        body={`${newGuestData?.first_name} ${newGuestData?.last_name}, has been added, you can send them a message at this time.`}
        hideModal={() => {
          setNewGuestData(null);
        }}
      />
    </>
  );
});
