import React from 'react';
import { Checkbox } from 'components/Form/Checkbox';
import Text from 'components/Text';
import { useOfflineCheck } from 'hooks/useOfflineCheck';
import { PassRow } from './styles';

export const AssosiatedTickets = (props) => {
  const { currentUser, onChange, storedCheckins, storedUnChecks } = props;
  const { associated_tickets } = currentUser ?? {
    status: '',
    tickets: [],
  };

  const isOffline = useOfflineCheck();

  return currentUser ? (
    <div style={{ marginBottom: 20 }}>
      {currentUser
        ? associated_tickets.map((item) => {
            const { id, status, is_checked, name } = item;
            const checked = isOffline
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
                    {name}
                  </Text>
                </div>
              </PassRow>
            );
          })
        : null}
    </div>
  ) : null;
};
