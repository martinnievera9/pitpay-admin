import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Checkbox } from 'components/Form/Checkbox';
import Icon from 'components/Icon';
import Spacer from 'components/Spacer';
import Text from 'components/Text';
import useNewPurchase from 'hooks/useNewPurchase';
import useTheme from 'hooks/useTheme';
import { useGetParticipantsList } from '../gql';
import { PassesModal } from '../Modals';
import {
  ButtonAction,
  ParticipantName,
  ParticipantList,
  ParticipantRow,
} from './style';

const isFullyChecked = ({ tickets }) => {
  const isComplete = tickets.filter(
    (ticket) => ticket.is_checked || ticket.status === 'refunded'
  );
  return isComplete.length === tickets.length;
};

export const Participants = (props) => {
  const { match, location, search, date } = props;
  const [isChecked, setIsChecked] = useState([]);
  const [showPasses, setShowPasses] = useState(false);
  const theme = useTheme();
  const { id: eventId } = useParams();
  const { data, subscribeToMore } = useGetParticipantsList({ date, search });

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

  const participants = data?.getParticipantsList;
  if (!participants) return false;

  const event = data.getEvent;

  return (
    <>
      <div>
        {participants.length < 1 ? (
          <p
            style={{
              color: '#fff',
              fontSize: 20,
              fontFamily: 'Barlow Condensed',
              fontWeight: 600,
              padding: 20,
            }}
          >
            The event does not have any participants yet
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
                Participants ({participants.length})
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

            {participants.map((person, index) => {
              const { id, is_pending, status, name } = person;
              return (
                <Link
                  key={id}
                  style={{ textDecoration: 'none' }}
                  to={(location) => ({
                    ...location,
                    pathname: `${location.pathname}/${person.id}`,
                  })}
                >
                  <ParticipantRow key={id} highlighted={is_pending}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Checkbox
                        inversed
                        name="checkbox1"
                        disabled={is_pending}
                        checked={isFullyChecked(person)}
                        onChange={() => selectOne(index)}
                        size={[36, 20, 3]}
                        check={'refunded' !== status}
                      />
                      <ParticipantName faded={is_pending}>
                        {name.toUpperCase()}
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
                </Link>
              );
            })}
          </ParticipantList>
        )}
      </div>
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
