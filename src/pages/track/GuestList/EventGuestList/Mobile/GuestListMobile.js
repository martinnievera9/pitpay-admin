import React, { useState } from 'react';
import Spacer from 'components/Spacer';
import {
  GuestForm,
  GuestSearch,
  GuestSearchWrapper,
  useGuestSearch,
  withGuestSearchContext,
} from 'pages/track/Guests';
import { useGetEventAndEventGuests } from '../../gql/useGetEventAndEventGuests';
import { PrintGuestList } from '../PrintGuestList';
import { List } from './GuestList';
import Header from './header';

export const GuestListMobile = withGuestSearchContext(() => {
  const { guestSearchQuery: queryString } = useGuestSearch();
  const [guestTypeToAdd, setGuestTypeToAdd] = useState(null);
  const { data } = useGetEventAndEventGuests({ queryString });

  const event = data?.getEvent;
  const guests = data?.getEventGuests;

  if (!event && !guests) return null;

  return (
    <>
      <div>
        <Spacer size={10} />
        <Header />
        <GuestSearchWrapper
          style={{ margin: '0 10px', width: 'calc(100% - 20px)' }}
        >
          <GuestSearch />
        </GuestSearchWrapper>
        <Spacer size={20} />
        <List
          guests={guests?.event_guests ?? []}
          title="Single Event Guests"
          handleAddClick={() => setGuestTypeToAdd('event_guests')}
        />
        <Spacer size={20} />
        <List
          guests={guests?.yearly_guests ?? []}
          title="Full Season Guests"
          handleAddClick={() => setGuestTypeToAdd('event_guests')}
        />
        <Spacer size={20} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '0 10px',
          }}
        >
          <PrintGuestList
            guests={guests}
            event={event}
            buttonLabel="Print List"
          />
        </div>
      </div>

      <GuestForm
        isVisible={!!guestTypeToAdd}
        handleOutClick={() => setGuestTypeToAdd(null)}
        guestTypeToAdd={guestTypeToAdd}
        queryString={queryString}
      />
    </>
  );
});
