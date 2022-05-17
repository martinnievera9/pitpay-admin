import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Icon from 'components/Icon';
import { ConfirmModal } from 'components/Modal';
import { SearchableListContainer } from 'components/SearchableListContainer';
import { Table } from 'components/Table';
import useTheme from 'hooks/useTheme';
import { useDeleteGuest } from 'pages/track/Guests/gql';
import {
  logDevError,
  deleteErrorMessage,
  deleteSuccessMessage,
} from 'shared/alerts';
import { formatPhoneNumber } from 'shared/formatters';
import { GuestModal } from '../../GuestModal';

const NameButton = styled.a`
  background-color: transparent;
  padding: 0;
  margin: 0;
  display: inline-block;
  color: #fa4616;
  border: none;
  font-size: 16px;
  font-family: Roboto;
  text-decoration: underline;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
`;

const CheckInColor = styled.div`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color || '#fff'};
  border-radius: 23px;
  width: 23px;
  height: 23px;
`;

export const GuestList = (props) => {
  const { guests, handleAddClick, title } = props;
  const [currentGuest, setCurrentGuest] = useState(null);
  const [shouldDisplayInfoModal, setShouldDisplayInfoModal] = useState(false);
  const [shouldDisplayDeleteModal, setShouldDisplayDeleteModal] = useState(
    false
  );
  const { pathname } = useLocation();
  // Remove trailing slash or it'll mess up our link below
  const path = pathname.slice(-1) === '/' ? pathname.slice(0, -1) : pathname;
  const theme = useTheme();

  const deleteGuest = useDeleteGuest();

  async function handleDeleteGuestConfirm() {
    try {
      await deleteGuest({
        variables: { id: currentGuest.id },
        refetchQueries: ['GetEventAndEventGuests'],
      });
    } catch (error) {
      logDevError(error);
      deleteErrorMessage('Guest');
    }
    deleteSuccessMessage('Guest');
    setShouldDisplayDeleteModal(false);
    setCurrentGuest(null);
  }

  const columns = [
    {
      label: 'Check In',
      key: 'check_in',
      width: '15%',
    },
    {
      label: 'Name',
      key: 'name',
      width: '30%',
    },
    {
      label: 'Phone Number',
      key: 'phone_number',
      width: '20%',
    },
    {
      label: 'Additional Guests',
      key: 'additional_guests',
      width: '20%',
    },
    {
      label: '',
      key: 'actions',
    },
  ];

  function renderRows(guest) {
    const {
      id,
      is_checked,
      last_name,
      first_name,
      phone_number,
      additional_guests,
    } = guest;
    return {
      check_in: (
        <CheckInColor backgroundColor={is_checked ? '#00A526' : '#c7c7c7'} />
      ),
      name: (
        <NameButton href={`${path}/guest/${id}`}>
          {`${last_name}, ${first_name}`}
        </NameButton>
      ),
      phone_number: formatPhoneNumber(phone_number),
      additional_guests: additional_guests ? `+${additional_guests}` : '0',
      actions: (
        <Icon
          icon="trash"
          size={22}
          color={theme.colors.primary}
          onClick={() => {
            setCurrentGuest(guest);
            setShouldDisplayDeleteModal(true);
          }}
        />
      ),
    };
  }

  return (
    <>
      <SearchableListContainer
        title={title}
        onAddClick={handleAddClick}
        noSearch
      >
        <Table
          columns={columns}
          renderRows={renderRows}
          items={guests}
          noData={
            <p
              style={{
                color: '#000',
                fontSize: 20,
                fontFamily: 'Barlow Condensed',
                fontWeight: 600,
                padding: 20,
              }}
            >
              This event does not have any guests/
            </p>
          }
        />
      </SearchableListContainer>
      <GuestModal
        isVisible={shouldDisplayInfoModal}
        currentGuest={currentGuest}
        hideModal={() => {
          setShouldDisplayInfoModal(false);
          setCurrentGuest(null);
        }}
      />
      <ConfirmModal
        isVisible={shouldDisplayDeleteModal}
        confirmText="Delete Guest"
        cancelText="Don't Delete"
        onConfirm={handleDeleteGuestConfirm}
        title="Do you want to delete this Guest?"
        hideModal={() => {
          setShouldDisplayDeleteModal(false);
          setCurrentGuest(null);
        }}
      />
    </>
  );
};
GuestList.propTypes = {
  guests: PropTypes.arrayOf(PropTypes.object),
  handleAddClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
