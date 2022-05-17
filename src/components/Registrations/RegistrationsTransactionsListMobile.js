import React, { useState } from 'react';
import styled from 'styled-components';
import { Checkbox } from 'components/Form/Checkbox';
import Icon from 'components/Icon';
import { CheckInModal } from 'components/Modal';
import Pagination from 'components/Pagination';
import { getDriverName } from 'components/Registrations/RegistrationsDesktop';
import { UpdateRegistration } from 'components/Registrations/UpdateRegistration';
import Spacer from 'components/Spacer';
import Text from 'components/Text';
import useTheme from 'hooks/useTheme';
import {
  useCheckinRegistration,
  useGetEventRegistrations,
  useUnCheckRegistration,
} from './gql';

const ParticipantList = styled.div`
  background-color: #fff;
  border-radius: 5px;
  height: 100%;
  width: calc(100% - 20px);
  margin: 0 10px 0 10px;
  padding: 10px;
  box-sizing: border-box;
`;

const ParticipantRow = styled.div`
  cursor: pointer;
  display: flex;
  margin: 15px 0;
`;

const ItemRow = styled.div`
  display: flex;
  margin: 15px 0 15px 15px;
  width: 100%;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  @media (max-width: 768px) {
    ${(props) =>
      props.currentTransaction
        ? `  position: fixed;
    width: 100%;
    overflow: hidden;`
        : ''};
  }
`;

export const RegistrationsTransactionsListMobile = (props) => {
  const { currentPage, queryString } = props;
  const theme = useTheme();
  const { data } = useGetEventRegistrations(queryString);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [shouldDisplayUpdateModal, setShouldDisplayUpdateModal] = useState(
    false
  );
  const [shouldDisplayCheckInModal, setShouldDisplayCheckInModal] = useState(
    false
  );
  const [unCheck, setUncheck] = useState(false);

  const checkinRegistration = useCheckinRegistration();
  const unCheckRegistration = useUnCheckRegistration();

  if (!data?.getEvent && !data?.getEventRegistrations) return null;

  const transactions = data.getEventRegistrations.results ?? [];

  function handleSelectTransaction(transaction) {
    setShouldDisplayUpdateModal(true);
    setCurrentTransaction(transaction);
  }

  async function onConfirmCheckIn() {
    const { id } = currentTransaction;
    return unCheck
      ? await unCheckRegistration(id)
      : await checkinRegistration(id);
  }

  return (
    <>
      <Wrapper currentTransaction={currentTransaction}>
        <ParticipantList>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text type="heading">Registrations</Text>
          </div>
          <Spacer size={10} />
          {!transactions.length ? (
            <p
              style={{
                color: '#000',
                fontSize: 20,
                fontFamily: 'Barlow Condensed',
                fontWeight: 600,
                padding: '20px 0',
              }}
            >
              {queryString && queryString.length
                ? 'There are no registrations that match your search.'
                : 'The event does not have any Registrations yet'}
            </p>
          ) : null}
          {transactions.map((transaction, index) => {
            const driverName = getDriverName(transaction.data);
            const { id, is_checked } = transaction;

            return (
              <ParticipantRow key={index}>
                <Checkbox
                  key={id}
                  name="check_in"
                  aria-checked={!!is_checked}
                  role="checkbox"
                  checked={!!is_checked}
                  zIndex={10}
                  inversed
                  onChange={() => {
                    setCurrentTransaction(transaction);
                    setUncheck(!!is_checked);
                    setShouldDisplayCheckInModal(true);
                  }}
                  size={[36, 20, 3]}
                />
                <ItemRow
                  onClick={() => handleSelectTransaction(transaction)}
                  onKeyUp={() => handleSelectTransaction(transaction)}
                  role="button"
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px 0',
                    }}
                  >
                    <Text
                      inlineStyle={{
                        fontWeight: '500',
                        fontSize: 20,
                        marginLeft: 20,
                      }}
                      // onClick={() => handleSelectTransaction(transaction)}
                      // onKeyUp={() => handleSelectTransaction(transaction)}
                      // role="button"
                      tabIndex={0}
                    >
                      {driverName && driverName.toUpperCase()}
                    </Text>
                  </div>
                  <div style={{ transform: 'rotate(-90deg)' }}>
                    <Icon
                      icon="chevron"
                      color={theme.colors.primary}
                      size={22}
                    />
                  </div>
                </ItemRow>
              </ParticipantRow>
            );
          })}
        </ParticipantList>
        <Spacer size={10} />
        <div
          style={{ backgroundColor: '#00001F', margin: 10, borderRadius: 5 }}
        >
          <Pagination
            count={data.loading ? 0 : data.getEventRegistrations.count}
            perPage={15}
            currentPage={currentPage || 1}
            color={'#fff'}
          />
        </div>
      </Wrapper>
      <UpdateRegistration
        currentTransaction={currentTransaction}
        close={() => {
          setShouldDisplayUpdateModal(false);
          setCurrentTransaction(null);
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
