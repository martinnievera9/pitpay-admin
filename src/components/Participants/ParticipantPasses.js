import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Checkbox } from 'components/Form/Checkbox';
import Text from 'components/Text';
import { useOfflineCheck } from 'hooks/useOfflineCheck';

const Heading = styled.div`
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #d8d8d8;
`;

const PassRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

export const ParticipantPasses = (props) => {
  const { currentUser, onChange, storedCheckins, storedUnChecks } = props;
  const { status, tickets } = currentUser ?? { status: '', tickets: [] };

  const isOffline = useOfflineCheck();

  return currentUser && status === 'active' ? (
    <div style={{ marginBottom: 20 }}>
      <Heading>
        <Text type="heading">Passes</Text>
      </Heading>
      {currentUser
        ? tickets.map((item) => {
            const { id, status, is_checked, ticket_name } = item;
            const checked =
              status === 'refunded'
                ? true
                : isOffline
                ? // If it started out checked in AND isn't on the list
                  // to be un-checked. OR if it started out un-checked
                  // and isn't on the list to be checked.
                  (is_checked && !storedUnChecks.includes(id)) ||
                  (!is_checked && storedCheckins.includes(id))
                : is_checked;
            return (
              <PassRow key={id}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox
                    inversed
                    name={`${item}_check_in`}
                    aria-checked={checked}
                    checked={checked}
                    role="checkbox"
                    tabIndex={0}
                    onChange={() => {
                      if (!status !== 'refunded') {
                        onChange(item);
                      }
                    }}
                    check={!status !== 'refunded'}
                    size={[36, 20, 3]}
                  />
                  <Text
                    inlineStyle={{
                      fontWeight: '600',
                      fontSize: 20,
                      marginLeft: 20,
                    }}
                  >
                    {ticket_name}
                  </Text>
                </div>
              </PassRow>
            );
          })
        : null}
    </div>
  ) : null;
};
ParticipantPasses.propTypes = {
  currentUser: PropTypes.shape({
    status: PropTypes.string,
    tickets: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        status: PropTypes.string,
        is_checked: PropTypes.bool,
        ticket_name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
  onChange: PropTypes.func.isRequired,
  storedCheckins: PropTypes.arrayOf(PropTypes.number),
  storedUnChecks: PropTypes.arrayOf(PropTypes.number),
};

// const { id, status, is_checked, ticket_name } = item;
