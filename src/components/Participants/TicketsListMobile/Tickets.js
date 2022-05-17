/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Checkbox } from 'components/Form/Checkbox';
import Icon from 'components/Icon';
import Spacer from 'components/Spacer';
import Text from 'components/Text';
import useNewPurchase from 'hooks/useNewPurchase';
import useTheme from 'hooks/useTheme';
import { useGetTicketsList } from '../gql';
import { PassesModal } from '../Modals';
import {
  ButtonAction,
  ParticipantName,
  ParticipantList,
  ParticipantRow,
} from './style';

export const Tickets = (props) => {
  const { match, location, search, date } = props;
  const [isChecked, setIsChecked] = useState([]);
  const [showPasses, setShowPasses] = useState(false);
  const [tickets, setTickets] = useState([]);

  const [ticket, setTicket] = useState(null);
  const theme = useTheme();
  const { id: eventId } = useParams();
  const { data, subscribeToMore } = useGetTicketsList({ date, search });

  useNewPurchase({ subscribeToMore }, eventId, search, date);

  const selectOne = (_, id) => {
    // check if it's already selected
    const found = isChecked.indexOf(id);
    // remove from selected array
    if (found > -1) {
      return setIsChecked(isChecked.filter((e) => e !== id));
    }
    // add to selected array
    return setIsChecked([...isChecked, id]);
  };
  useEffect(() => {
    console.warn('red');
  }, []);

  useEffect(() => {
    console.warn(data);
    if (data?.getSpectatorTickets) {
      setTickets(data?.getSpectatorTickets);
    }
  }, [data]);

  if (!tickets) return false;

  const event = data.getEvent;

  return (
    <>
      <div style={{}}>
        {tickets.length < 1 ? (
          <p
            style={{
              fontSize: 20,
              fontFamily: 'Barlow Condensed',
              fontWeight: 600,
              padding: 20,
            }}
          >
            The event does not have any tickets yet
          </p>
        ) : (
          <ParticipantList>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text type="heading" inlineStyle={{ padding: '0 10px' }}>
                Tickets ({tickets.length})
              </Text>
              <ButtonAction
                style={{
                  cursor: 'pointer',
                  justifyContent: 'flex-end',
                }}
                onClick={() => {
                  setShowPasses(true);
                }}
              >
                <Text
                  inlineStyle={{
                    lineHeight: '19px',
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: 500,
                  }}
                >
                  Passes on Sale
                </Text>
                <div style={{ transform: 'rotate(-90deg)' }}>
                  <Icon icon="chevron" color={theme.colors.primary} size={22} />
                </div>
              </ButtonAction>
            </div>
            <Spacer size={10} />

            {tickets.map((person, index) => {
              const { id, is_checked, user } = person;
              return (
                <ParticipantRow key={id}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox
                      inversed
                      name="checkbox1"
                      checked={is_checked}
                      onChange={() => selectOne(index)}
                      size={[36, 20, 3]}
                    />
                    <ParticipantName
                      onClick={() => {
                        setTicket(person);
                      }}
                    >
                      {user.name.toUpperCase()}
                    </ParticipantName>
                  </div>
                  <div style={{ transform: 'rotate(-90deg)' }}>
                    <Icon
                      icon="chevron"
                      color={theme.colors.primary}
                      size={22}
                    />
                  </div>
                </ParticipantRow>
              );
            })}
          </ParticipantList>
        )}
      </div>
      {/* {ticket ? (
        <TicketModal
          location={location}
          admin={location.pathname.includes('/admin/transactions/')}
          match={match}
          ticket={ticket}
          close={() => {
            setTicket(null);
          }}
        />
      ) : null} */}
      <PassesModal
        showModal={showPasses}
        event={event}
        close={() => {
          setShowPasses(false);
        }}
        location={location}
        match={match}
      />
    </>
  );
};
