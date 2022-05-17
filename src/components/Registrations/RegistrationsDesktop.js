import React, { useState } from 'react';
import styled from 'styled-components';
import { Checkbox } from 'components/Form/Checkbox';
import LineHeightText from 'components/LineHeightText';
import { CheckInModal } from 'components/Modal';
import { SearchableListContainer } from 'components/SearchableListContainer';
import { Table } from 'components/Table';
import { formatTimestamp } from 'shared/formatters';
import {
  useCheckinRegistration,
  useGetEventRegistrations,
  useUnCheckRegistration,
} from './gql';
import { RegistrationsHeader } from './RegistrationsHeader';
import { UpdateRegistration } from './UpdateRegistration';

const PassColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: ${(props) => props.color};
`;

const ParticipantName = styled.button`
  color: ${(props) => props.theme.colors.primary};
  font-size: 16px;
  padding: 0;
  margin: 0;
  border: none;
  background-color: transparent;
  font-family: 'Roboto';
  text-decoration: underline;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export function getDriverName(data) {
  const firstName =
    data.find((field) => field.name === 'drivers_first_name')?.value ?? '';
  const middleName =
    data.find((field) => field.name === 'drivers_middle_name')?.value ?? '';
  const lastName =
    data.find((field) => field.name === 'drivers_last_name')?.value ?? '';
  const driverName = `${lastName ? `${lastName}, ` : ''}${firstName}${
    middleName ? ` ${middleName}` : ''
  }`;
  return driverName;
}

export const RegistrationsDesktop = (props) => {
  const { data, variables } = useGetEventRegistrations();
  const [currentRegistration, setCurrentRegistration] = useState(null);
  const [shouldDisplayUpdateModal, setShouldDisplayUpdateModal] = useState(
    false
  );
  const [shouldDisplayCheckInModal, setShouldDisplayCheckInModal] = useState(
    false
  );
  const [unCheck, setUncheck] = useState(false);

  const checkinRegistration = useCheckinRegistration();
  const unCheckRegistration = useUnCheckRegistration();

  if (!data || !data.getEventRegistrations) return null;

  const registrations = data.getEventRegistrations.results;

  async function onConfirmCheckIn() {
    const { id } = currentRegistration;
    return unCheck
      ? await unCheckRegistration(id)
      : await checkinRegistration(id);
  }

  const columns = [
    {
      label: 'Check In',
      key: 'check_in',
    },
    {
      label: 'Date',
      key: 'date',
    },
    {
      label: 'Name',
      key: 'name',
    },
    {
      label: 'Registration Name',
      key: 'registration_name',
    },
    {
      label: 'Purchaser Name',
      key: 'purchaser_name',
    },
    {
      label: 'Color',
      key: 'color',
    },
    {
      label: 'Promo',
      key: 'promo',
    },
    {
      label: 'Total',
      key: 'total',
    },
  ];

  function renderRows(rowData) {
    const {
      data,
      is_checked,
      promo,
      purchase_date,
      registration,
      user,
    } = rowData;
    const driverName = getDriverName(data);
    const { color_code, name, price } = registration;
    return {
      check_in: (
        <Checkbox
          aria-checked={!!is_checked}
          checked={!!is_checked}
          inversed
          name="check_in"
          onChange={() => {
            setCurrentRegistration(rowData);
            setUncheck(!!is_checked);
            setShouldDisplayCheckInModal(true);
          }}
          role="checkbox"
          tabIndex={0}
        />
      ),
      date: formatTimestamp(purchase_date, 'h:mm a, MMM DD, YYYY'),
      name: (
        <LineHeightText>
          <ParticipantName
            onClick={() => {
              setCurrentRegistration(rowData);
              setShouldDisplayUpdateModal(true);
            }}
          >
            {driverName}
          </ParticipantName>
        </LineHeightText>
      ),
      purchaser_name: user ? `${user.last_name}, ${user.first_name}` : '',
      registration_name: name,
      color: <PassColor color={color_code ?? ''} />,
      promo: promo?.name ?? '',
      total: price ?? '',
    };
  }

  const noData =
    variables?.getTrackTransactionsInput &&
    variables?.getTrackTransactionsInput?.queryString ? (
      <p
        style={{
          color: '#000',
          fontSize: 20,
          fontFamily: 'Barlow Condensed',
          fontWeight: 600,
          paddingTop: 20,
        }}
      >
        No transactions with this name
      </p>
    ) : (
      <p
        style={{
          color: '#000',
          fontSize: 20,
          fontFamily: 'Barlow Condensed',
          fontWeight: 600,
          paddingTop: 20,
        }}
      >
        No transactions for this event yet
      </p>
    );

  return (
    <>
      <SearchableListContainer
        header={
          <RegistrationsHeader
            event={data}
            {...props}
            transactions={data.getEventRegistrations.results}
            total={data.getEventRegistrations.count}
          />
        }
        pageCount={data.getEventRegistrations.count}
        paginated
        title="Registrations"
        searchInputPlaceholder="Search Registrations"
      >
        <Table
          items={registrations ?? []}
          columns={columns}
          noData={noData}
          renderRows={renderRows}
        />
      </SearchableListContainer>
      <UpdateRegistration
        currentTransaction={currentRegistration}
        close={() => {
          setShouldDisplayUpdateModal(false);
          setCurrentRegistration(null);
        }}
        isVisible={shouldDisplayUpdateModal}
      />
      <CheckInModal
        itemType="guest"
        isVisible={shouldDisplayCheckInModal}
        onConfirm={onConfirmCheckIn}
        setIsVisible={setShouldDisplayCheckInModal}
        unCheck={unCheck}
      />
    </>
  );
};
