/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import qs from 'qs';
import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Button } from 'components/Button';
import Container from 'components/Container';
import ContainerHeader from 'components/ContainerHeader';
import { CheckInModal } from 'components/Modal';
import {
  useCheckInUser,
  useUncheckInUser,
  useGetStoredPurchaseIds,
} from 'components/Participants/gql';
import { useGetTicket } from 'components/Participants/gql/useGetTicket';
import { useGetTransferLog } from 'components/Participants/gql/useGetTransferLog';
import Spacer from 'components/Spacer';
import Text from 'components/Text';
import { TransactionModal } from 'components/Transactions';
import { useOfflineCheck } from 'hooks/useOfflineCheck';
import useTheme from 'hooks/useTheme';
import { formatPhoneNumber } from 'shared/formatters';
import { AssosiatedTickets } from './AssosiatedTickets';
import { TransferLogModal } from './transferLogModal';

const OpenModal = styled.button`
  color: #fa4616;
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

const Content = styled.section`
  padding: 20px;
`;

const Heading = styled.div`
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #d8d8d8;
`;

const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AllPassesButtons = styled.div`
  display: flex;
  flex-direction: column;
  & > :first-child {
    margin-bottom: 12px;
  }

  @media (min-width: 859px) {
    flex-direction: row;
    & > :first-child {
      margin-right: 12px;
      margin-bottom: 0;
    }
  }
`;
export const TicketDetails = ({ employeeAdmin, match, location }) => {
  const theme = useTheme();
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [storedCheckins, setStoredCheckins] = useState([]);
  const [storedUnChecks, setStoredUnChecks] = useState([]);
  const [viewTransferLog, setViewTransferLog] = useState(false);
  const [transferLogs, setTransferLogs] = useState([]);
  const getStoredPurchaseIds = useGetStoredPurchaseIds();
  const { date } = qs.parse(location.search.substring(1));
  const { userId } = useParams();
  const { res } = useGetTicket({ date });
  const history = useHistory();
  const { pathname, search } = useLocation();
  const [ticket, setTicket] = useState(null);
  const [shouldDisplayCheckInModal, setShouldDisplayCheckInModal] =
    useState(false);
  async function onConfirmCheckIn() {
    if (unCheck) {
      setStoredUnChecks((prev) => [...new Set(prev.concat(purchaseItem.id))]);
    } else {
      setStoredCheckins((prev) => [...new Set(prev.concat(purchaseItem.id))]);
    }
    history.push(pathname + '/');
    return unCheck
      ? uncheckInUser([purchaseItem.id])
      : checkInUser([purchaseItem.id]);
  }

  const [unCheck, setUncheck] = useState(false);
  const [purchaseItem, setPurchaseItem] = useState(false);
  const [allTicketsStoredToCheckIn, setallTicketsStoredToCheckIn] = useState(0);
  const [allTicketsStoredToUnCheck, setallTicketsStoredToUnCheck] = useState(0);
  const [isAllCheckedIn, setisAllCheckedIn] = useState(false);
  const [isAllUnCheckedIn, setisAllUnCheckedIn] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  useEffect(() => {
    if (res && res.getSpectatorTicket) {
      setTicket(res?.getSpectatorTicket);
      setallTicketsStoredToCheckIn(
        res?.getSpectatorTicket.associated_tickets.reduce(
          (allStored, tick) =>
            !allStored ? allStored : storedCheckins.includes(tick.id),
          true
        )
      );
      setallTicketsStoredToUnCheck(
        res?.getSpectatorTicket.associated_tickets.reduce(
          (allStored, tick) =>
            !allStored ? allStored : storedUnChecks.includes(tick.id),
          true
        )
      );
      setisAllCheckedIn(
        res?.getSpectatorTicket.associated_tickets.reduce(
          (allChecked, tick) => (!allChecked ? allChecked : !!tick?.is_checked),
          true
        )
      );
      setisAllUnCheckedIn(
        res?.getSpectatorTicket.associated_tickets.reduce(
          (allUnChecked, tick) =>
            !allUnChecked ? allUnChecked : !tick?.is_checked,
          true
        )
      );
    }
  }, [res]);

  const { data } = useGetTransferLog({
    date,
    pass_id: parseInt(userId),
  });
  useEffect(() => {
    if (data) {
      setTransferLogs(data.getTransferLog);
    }
  }, [data]);

  const isOffline = useOfflineCheck();

  useEffect(() => {
    if (isOffline) {
      const storedPurchaseIdsToCheckIn = getStoredPurchaseIds('check');
      const storedPurchaseIdsToUnCheck = getStoredPurchaseIds('uncheck');
      setStoredCheckins(storedPurchaseIdsToCheckIn);
      setStoredUnChecks(storedPurchaseIdsToUnCheck);
    }
  }, [isOffline, getStoredPurchaseIds]);
  const disableCheckInButton = isOffline
    ? allTicketsStoredToCheckIn || isAllCheckedIn
    : isAllCheckedIn;
  const disableUnCheckButton = isOffline
    ? allTicketsStoredToUnCheck || isAllUnCheckedIn
    : isAllUnCheckedIn;
  useEffect(() => {
    if (location.query) {
      setSelectedPeople([...location.query]);
    }
  }, [location.query]);
  const checkInUser = useCheckInUser();
  const uncheckInUser = useUncheckInUser();
  if (!ticket) return false;
  async function checkInAllPasses() {
    function onSuccess() {
      toast.success('Succesfully checked in for all passes');
      const listPage = pathname
        .split('/')
        .slice(0, -1)
        .join('/')
        .concat(search);
      history.push(listPage);
    }

    const onError = () => toast.error("Couldn't complete check in");

    const purchase_ids = ticket.associated_tickets.map((ticket) => ticket.id);
    setStoredCheckins(purchase_ids);
    await checkInUser(purchase_ids, onSuccess, onError);
  }

  async function uncheckAllPasses() {
    function onSuccess() {
      toast.success('Unchecked all passes');
      const listPage = pathname
        .split('/')
        .slice(0, -1)
        .join('/')
        .concat(search);
      history.push(listPage);
    }

    const onError = () => toast.error("Couldn't uncheck all passes");

    const purchase_ids = ticket.associated_tickets.map((ticket) => ticket.id);
    setStoredUnChecks(purchase_ids);
    await uncheckInUser(purchase_ids, onSuccess, onError);
  }
  return (
    <Container>
      <ContainerHeader>
        <Text type="heading">Ticket Details</Text>
      </ContainerHeader>

      <Content>
        <Heading>
          <Text type="heading">Ticket Info</Text>
        </Heading>

        <Spacer size={15} />
        <DataRow>
          <Text
            type="bold"
            color={theme.colors.text.gray}
            inlineStyle={{ width: '30%' }}
          >
            Barcode:
          </Text>
          <Text
            type="bold"
            fontWeight="600"
            inlineStyle={{ width: '70%', whiteSpace: 'normal' }}
          >
            {ticket.barcode ? ticket.barcode : ''}
          </Text>
        </DataRow>

        <Spacer size={15} />
        <DataRow>
          <Text
            type="bold"
            color={theme.colors.text.gray}
            inlineStyle={{ width: '30%' }}
          >
            Transaction:
          </Text>
          <Text
            type="bold"
            fontWeight="600"
            inlineStyle={{ width: '70%', whiteSpace: 'normal' }}
          >
            <OpenModal
              onClick={() => {
                setCurrentTransaction(ticket.transaction);
              }}
            >
              View
            </OpenModal>
          </Text>
        </DataRow>

        <Spacer size={15} />
        <DataRow>
          <Text
            type="bold"
            color={theme.colors.text.gray}
            inlineStyle={{ width: '30%' }}
          >
            Ticket Name:
          </Text>
          <Text
            type="bold"
            fontWeight="600"
            inlineStyle={{ width: '70%', whiteSpace: 'normal' }}
          >
            {ticket.ticket.name}
          </Text>
        </DataRow>

        <Spacer size={15} />
        <DataRow>
          <Text
            type="bold"
            color={theme.colors.text.gray}
            inlineStyle={{ width: '30%' }}
          >
            Ticket Price:
          </Text>
          <Text
            type="bold"
            fontWeight="600"
            inlineStyle={{ width: '70%', whiteSpace: 'normal' }}
          >
            {'$' + ticket.ticket.price}
          </Text>
        </DataRow>

        <Spacer size={15} />
        {ticket.transfer?.id ? (
          <>
            <Heading>
              <Text type="heading">Transfer Info</Text>
            </Heading>
            <Spacer size={15} />
            <DataRow>
              <Text
                type="bold"
                color={theme.colors.text.gray}
                inlineStyle={{ width: '30%' }}
              >
                Name:
              </Text>
              <Text
                type="bold"
                fontWeight="600"
                inlineStyle={{ width: '70%', whiteSpace: 'normal' }}
              >
                {ticket.transfer?.name}
              </Text>
            </DataRow>

            <Spacer size={15} />
            <DataRow>
              <Text
                type="bold"
                color={theme.colors.text.gray}
                inlineStyle={{ width: '30%' }}
              >
                Phone number:
              </Text>
              <Text
                type="bold"
                color={theme.colors.text.gray}
                inlineStyle={{ width: '70%' }}
              >
                <a
                  href={`tel:${ticket.transfer?.phone_number}`}
                  style={{
                    color: theme.colors.primary,
                    textDecoration: 'none',
                  }}
                >
                  {formatPhoneNumber(ticket.transfer?.phone_number)}
                </a>
              </Text>
            </DataRow>
            <Spacer size={15} />
            <DataRow>
              <Text
                type="bold"
                color={theme.colors.text.gray}
                inlineStyle={{ width: '30%' }}
              >
                Transfer Date:
              </Text>
              <Text
                type="bold"
                fontWeight="600"
                inlineStyle={{ width: '70%', whiteSpace: 'normal' }}
              >
                {ticket.transfer?.date}
              </Text>
            </DataRow>

            <Spacer size={15} />
            <Button fontSize={22} onClick={() => setViewTransferLog(true)}>
              View transfer Log
            </Button>
          </>
        ) : (
          <></>
        )}

        <Spacer size={15} />
        {ticket.refund ? (
          <DataRow>
            <Text type="bold" color="#707273" inlineStyle={{ width: '50%' }}>
              Refund:
            </Text>
            <Text
              type="bold"
              fontWeight="600"
              inlineStyle={{
                width: '50%',
                whiteSpace: 'normal',
                marginLeft: 10,
              }}
            >
              {ticket.refund}
            </Text>
          </DataRow>
        ) : null}

        {ticket.associated_tickets.length ? (
          <>
            <Heading>
              <Text type="heading">Associated Tickets</Text>
            </Heading>
            <AssosiatedTickets
              currentUser={ticket}
              onChange={(item) => {
                setPurchaseItem(item);
                setUncheck(item.is_checked);
                setShouldDisplayCheckInModal(true);
              }}
            />
          </>
        ) : null}

        <Spacer size={15} />
        {!employeeAdmin ? (
          <AllPassesButtons>
            <Button
              fontSize={22}
              onClick={checkInAllPasses}
              disabled={disableCheckInButton}
            >
              Check In All Passes
            </Button>
            <Button
              fontSize={22}
              onClick={uncheckAllPasses}
              disabled={disableUnCheckButton}
            >
              Uncheck All Passes
            </Button>
          </AllPassesButtons>
        ) : null}
      </Content>
      {currentTransaction ? (
        <TransactionModal
          admin={location.pathname.includes('/admin/')}
          match={match}
          currentTransaction={currentTransaction}
          close={() => {
            setCurrentTransaction(null);
          }}
        />
      ) : null}

      <TransferLogModal
        admin={location.pathname.includes('/admin/')}
        match={match}
        isVisible={viewTransferLog}
        transferLogs={transferLogs}
        close={() => {
          setViewTransferLog(false);
        }}
      />
      <CheckInModal
        itemType="pass"
        isVisible={!!shouldDisplayCheckInModal}
        onConfirm={onConfirmCheckIn}
        setIsVisible={setShouldDisplayCheckInModal}
        unCheck={unCheck}
      />
    </Container>
  );
};

const TransactionInformationRow = (props) => {
  const { label, data, noSpacer } = props;
  return (
    <>
      <DataRow>
        <Text type="bold" color="#707273" inlineStyle={{ width: '50%' }}>
          {label}:
        </Text>
        <Text
          type="bold"
          fontWeight="600"
          inlineStyle={{
            width: '50%',
            whiteSpace: 'normal',
            marginLeft: 10,
            textTransform: 'capitalize',
          }}
        >
          {data}
        </Text>
      </DataRow>
      {!noSpacer && <Spacer size={15} />}
    </>
  );
};
TransactionInformationRow.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  noSpacer: PropTypes.bool,
};
