import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ContainerIcon from 'components/ContainerIcon';
import { Checkbox } from 'components/Form/Checkbox';
import Icon from 'components/Icon';
import Spacer from 'components/Spacer';
import Text from 'components/Text';
import useTheme from 'hooks/useTheme';

const GuestList = styled.div`
  background-color: #fff;
  border-radius: 5px;
  height: 100%;
  width: calc(100% - 20px);
  margin: 0 10px 0 10px;
  padding: 10px;
  box-sizing: border-box;
`;

const GuestRow = styled.a`
  cursor: pointer;
  display: flex;
  margin: 15px 0;
  justify-content: space-between;
  text-decoration: none;
`;

export const List = (props) => {
  const { guests, title, handleAddClick } = props;
  const theme = useTheme();
  const { pathname } = useLocation();
  // Remove trailing slash or it'll mess up our link below
  const path = pathname.slice(-1) === '/' ? pathname.slice(0, -1) : pathname;

  if (!guests) return false;

  return (
    <GuestList>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text type="heading">{`${title} (${guests.length})`}</Text>
        <ContainerIcon onClick={handleAddClick} style={{ padding: 0 }} />
      </div>
      <Spacer size={10} />

      {guests.map((guest, index) => {
        const { id, is_checked, first_name, last_name } = guest;
        return (
          <GuestRow href={`${path}/guest/${id}`} key={index}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                key={id}
                name="check_in"
                checked={!!is_checked}
                disabled={!!is_checked}
                inversed
                pointerEvents="none"
                size={[36, 20, 3]}
              />
              <Text
                inlineStyle={{
                  fontWeight: '500',
                  fontSize: 20,
                  marginLeft: 20,
                }}
              >
                {`${last_name}, ${first_name}`}
              </Text>
            </div>
            <div style={{ transform: 'rotate(-90deg)' }}>
              <Icon icon="chevron" color={theme.colors.primary} size={22} />
            </div>
          </GuestRow>
        );
      })}
    </GuestList>
  );
};
