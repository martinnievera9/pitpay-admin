import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Card } from 'components/Card/cardStyle';
import Container from 'components/Container';
import { Checkbox } from 'components/Form/Checkbox';
import Icon from 'components/Icon';
import {
  CheckInModal,
  ConfirmModal as DeleteGuestModal,
} from 'components/Modal';
import Spacer from 'components/Spacer';
import { DataRow } from 'components/StyledComponents';
import Text from 'components/Text';
import useTheme from 'hooks/useTheme';
import {
  logDevError,
  deleteErrorMessage,
  deleteSuccessMessage,
} from 'shared/alerts';
import { formatPhoneNumber } from 'shared/formatters';
import {
  GET_GUESTS,
  useCheckinGuest,
  useDeleteGuest,
  useGetGuest,
  useUnCheckGuest,
} from './gql';
import { GuestForm } from './GuestForm';
import { withGuestSearchContext } from './GuestSearch';

const Label = styled(Text)`
  margin-right: 5px;
`;

export const GuestDetail = withGuestSearchContext(() => {
  const theme = useTheme();
  const history = useHistory();
  const { pathname, state } = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldDisplayDeleteModal, setShouldDisplayDeleteModal] = useState(
    false
  );
  const [shouldDisplayCheckInModal, setShouldDisplayCheckInModal] = useState(
    false
  );
  const [unCheck, setUncheck] = useState(false);
  const { data, loading } = useGetGuest();
  const deleteGuest = useDeleteGuest();
  const checkinGuest = useCheckinGuest();
  const unCheckGuest = useUnCheckGuest();

  const guest = data?.getGuest;

  const {
    id,
    last_name,
    first_name,
    phone_number,
    additional_guests,
    notes,
    event,
    ownership,
    year,
    is_checked,
  } = guest ?? {};

  // If we're just on the `/admin-track/guests` detail, we don't
  // render the checkbox for checking/unchecking the guest.
  const shouldRenderCheckin = !pathname.includes('guests');

  const handleOutClick = () => {
    setIsVisible(!isVisible);
  };

  async function onConfirmCheckIn(id) {
    return unCheck ? await unCheckGuest(id) : await checkinGuest(id);
  }

  async function handleDeleteGuestConfirm() {
    try {
      deleteGuest({
        variables: { id },
        update: (cache) => {
          const data = cache.readQuery({
            query: GET_GUESTS,
            variables: { input: { queryString: state?.queryString ?? '' } },
          });
          if (data) {
            const updatedResults = data.getGuests.results.filter(
              (g) => g.id !== id
            );
            cache.writeQuery({
              query: GET_GUESTS,
              variables: { input: { queryString: state?.queryString ?? '' } },
              data: {
                ...data,
                getGuests: {
                  ...data.getGuests,
                  count: data.getGuests.count - 1,
                  results: updatedResults,
                },
              },
            });
          }
        },
      });
    } catch (error) {
      logDevError(error);
      deleteErrorMessage('Guest');
    }
    deleteSuccessMessage('Guest');
    history.push('/admin-track/guests');
  }

  return loading ? (
    <div />
  ) : !guest ? null : (
    <Container>
      <div style={{ padding: 20 }}>
        <Card key={id}>
          {shouldRenderCheckin && (
            <>
              <DataRow style={{ alignItems: 'center' }}>
                <span
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}
                >
                  <Label type="bold">Check In:</Label>
                  <Checkbox
                    aria-checked={!!is_checked}
                    checked={!!is_checked}
                    inversed
                    name="check_in"
                    onChange={() => {
                      setUncheck(!!is_checked);
                      setShouldDisplayCheckInModal(true);
                    }}
                    role="checkbox"
                    tabIndex={0}
                  />
                </span>
              </DataRow>
              <Spacer size={15} />
            </>
          )}
          <DataRow as="div">
            <Label type="bold" inlineStyle={{ width: '40%' }}>
              Name:
            </Label>
            <Text
              type="bold"
              inlineStyle={{ width: '60%' }}
            >{`${last_name}, ${first_name}`}</Text>
          </DataRow>
          <Spacer size={15} />
          <DataRow as="div">
            <Label type="bold" inlineStyle={{ width: '40%' }}>
              Phone Number:
            </Label>
            <Text type="bold" inlineStyle={{ width: '60%' }}>
              {formatPhoneNumber(phone_number)}
            </Text>
          </DataRow>
          <Spacer size={15} />
          <DataRow as="div">
            <Label type="bold" inlineStyle={{ width: '40%' }}>
              Year:
            </Label>{' '}
            <Text type="bold" inlineStyle={{ width: '60%' }}>
              {year}
            </Text>
          </DataRow>
          <Spacer size={15} />
          <DataRow as="div">
            <Label type="bold" inlineStyle={{ width: '40%' }}>
              Event:
            </Label>{' '}
            <Text type="bold" inlineStyle={{ width: '60%' }}>
              {event?.name ?? ownership?.label ?? 'N/A'}
            </Text>
          </DataRow>
          <Spacer size={15} />
          <DataRow as="div">
            <Label type="bold" inlineStyle={{ width: '40%' }}>
              Additional Guests:
            </Label>{' '}
            <Text type="bold" inlineStyle={{ width: '60%' }}>
              {additional_guests ? `+${additional_guests}` : '0'}
            </Text>
          </DataRow>
          <Spacer size={15} />
          <DataRow as="div">
            <Label type="bold" inlineStyle={{ width: '40%' }}>
              Notes:
            </Label>{' '}
            <Text type="bold" inlineStyle={{ width: '60%' }}>
              {notes ?? ''}
            </Text>
          </DataRow>
          <Spacer size={15} />
          <Icon
            icon="edit"
            size={23}
            color={theme.colors.primary}
            onClick={async () => {
              setIsVisible(!isVisible);
            }}
            padding="0 15px 0 0"
          />
          <Icon
            icon="trash"
            size={23}
            color={theme.colors.primary}
            onClick={() => setShouldDisplayDeleteModal(true)}
          />
        </Card>
      </div>
      <GuestForm
        isVisible={isVisible}
        handleOutClick={handleOutClick}
        guestId={id}
      />
      <DeleteGuestModal
        isVisible={shouldDisplayDeleteModal}
        confirmText="Delete Guest"
        cancelText="Don't Delete"
        onConfirm={handleDeleteGuestConfirm}
        title="Do you want to delete this Guest?"
        hideModal={() => {
          setShouldDisplayDeleteModal(false);
        }}
      />
      <CheckInModal
        itemType="guest"
        isVisible={!!shouldDisplayCheckInModal}
        onConfirm={() => onConfirmCheckIn(id)}
        setIsVisible={setShouldDisplayCheckInModal}
        unCheck={unCheck}
      />
    </Container>
  );
});
