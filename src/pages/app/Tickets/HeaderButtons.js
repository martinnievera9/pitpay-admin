import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'components/Button';
import Icon from 'components/Icon';
import { useGetParticipantsDownload } from 'components/Participants/gql/useGetParticipantsDownload';
import { PrintParticipants } from 'components/Participants/PrintParticipants';
import Text from 'components/Text';
import useNewPurchase from 'hooks/useNewPurchase';
import useTheme from 'hooks/useTheme';
import Export from './export';

const ButtonAction = styled.button`
  padding: 0;
  margin: 0 10px 0 10px;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
`;

const HeaderButtons = ({ event, date, match, setShowCancelModal }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const theme = useTheme();
  const { data, subscribeToMore } = useGetParticipantsDownload();
  useNewPurchase({ subscribeToMore }, event.id, '', date);

  if (!data || !data.getParticipantsList) return null;

  const participants = data.getParticipantsList;

  const handleClickScan = (id, date) => {
    pathname.includes('/admin-track/')
      ? history.push(`/admin-track/scan/${id}?date=${date}`)
      : history.push(`/admin/scan/${id}?date=${date}`);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Button
        buttonStyle={{ width: 165, marginRight: 10 }}
        onClick={() => handleClickScan(event.id, date)}
      >
        SCAN PARTICIPANTS
      </Button>

      <Export
        participants={participants}
        event={event}
        icon={<Icon icon="Export-Icon" size={40} />}
      />
      <PrintParticipants
        refunded={participants
          .map((item) => (item.status === 'refunded' ? item.name : null))
          .filter(Boolean)}
        checkedIn={participants
          .map((item) => {
            const tickets = item.tickets.filter(
              (ticket) => ticket.is_checked && 'active' === ticket.status
            );
            return tickets.length === item.tickets.length ? item.name : null;
          })
          .filter(Boolean)}
        participants={participants}
        date={date}
        eventID={match.params.id}
        event={event}
        text="Print List"
      />
      {'published' === event.status ? (
        <ButtonAction
          onClick={() => {
            setShowCancelModal(true);
          }}
        >
          <Icon icon="cancel-event" size={40} color={theme.colors.primary} />
          <Text
            type="label"
            fontSize={12}
            color={theme.colors.secondary}
            style={{
              marginTop: 10,
              textAlign: 'center',
              fontWeight: 700,
              lineHeight: '16px',
            }}
          >
            Cancel / Postpone
          </Text>
        </ButtonAction>
      ) : null}
    </div>
  );
};

export default HeaderButtons;
