import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Route, MemoryRouter, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ExternalAnchor } from 'components/Anchor';
import Icon from 'components/Icon';
import { TransactionModal as Modal } from 'components/Modal';
import { ModalSectionHeaderContainer } from 'components/Modal/styles';
import Spacer from 'components/Spacer';
import Text from 'components/Text';
import { useRefundPasses } from '../gql/useRefundPasses';
import { Person } from './Person';
import {
  ModalContainer,
  DataRow,
  Header,
  TransferButton,
  RefundButton,
} from './styles';
import { TransactionTickets } from './TransactionTickets';

export const TransactionModal = ({
  currentTransaction,
  close,
  admin,
  employeeAdmin,
  match,
}) => {
  return (
    <Modal
      maxWidth={600}
      isVisible={!!currentTransaction}
      close={close}
      hideModal={close}
      noHeader
      modalStyle={{ overflow: 'scroll' }}
    >
      <ModalRoutes
        close={close}
        admin={admin}
        employeeAdmin={employeeAdmin}
        currentTransaction={currentTransaction}
        match={match}
      />
    </Modal>
  );
};

const ModalRoutes = ({
  close,
  admin,
  currentTransaction,
  match,
  employeeAdmin,
  // ...props
}) => {
  return (
    <MemoryRouter>
      <Route
        path="/"
        exact
        render={(props) => (
          <BaseModal
            {...props}
            close={close}
            currentTransaction={currentTransaction}
            match={match}
            admin={admin}
            employeeAdmin={employeeAdmin}
          />
        )}
      />
      <Route
        path="/transfer"
        render={(props) => (
          <TransactionTickets {...props} close={close} match={match} />
        )}
      />
    </MemoryRouter>
  );
};

const BaseModal = ({
  close,
  admin,
  currentTransaction,
  match,
  employeeAdmin,
  ...props
}) => {
  const [selectedPeople, setSelectedPeople] = useState([]);
  const refundPasses = useRefundPasses();

  useEffect(() => {
    if (props.location.query) {
      setSelectedPeople([...props.location.query]);
    }
  }, [props.location.query]);
  if (!currentTransaction) return false;

  const isAllRefunded =
    currentTransaction.users &&
    currentTransaction.users.length &&
    currentTransaction.users
      .map((person) => person.tickets.map((ticket) => ticket.refunded).flat())
      .flat()
      .every((refundedTicket) => refundedTicket === true);

  return (
    <ModalContainer>
      <Header>
        <Text type="heading">Transaction Information</Text>
        <Icon
          icon="close"
          size={18}
          color={'#fa4616'}
          onClick={() => {
            close();
          }}
        />
      </Header>

      <>
        <TransactionInformationRow
          label="Purchases By"
          data={currentTransaction.user ? currentTransaction.user.name : ''}
        />
        <TransactionInformationRow
          label="Total"
          data={currentTransaction.total}
        />
        <TransactionInformationRow
          label="Discount"
          data={currentTransaction.discount}
        />
        <TransactionInformationRow
          label="Status"
          data={currentTransaction.status}
          noSpacer={!currentTransaction.transfer_id}
        />
        {currentTransaction.transfer_id && (
          <TransactionInformationRow
            label="Transfer"
            data={
              <ExternalAnchor
                href={currentTransaction.transfer_id}
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </ExternalAnchor>
            }
            noSpacer={!currentTransaction.charge_id}
          />
        )}
        {currentTransaction.charge_id && (
          <TransactionInformationRow
            label="Charge"
            data={
              <ExternalAnchor
                href={currentTransaction.charge_id}
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </ExternalAnchor>
            }
            noSpacer
          />
        )}
        <Spacer size={15} />
        {currentTransaction.refund ? (
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
              {currentTransaction.refund}
            </Text>
          </DataRow>
        ) : null}

        {currentTransaction.users && currentTransaction.users.length ? (
          <>
            <ModalSectionHeaderContainer>
              <Text type="heading">Passes</Text>
            </ModalSectionHeaderContainer>
            {currentTransaction.users &&
              currentTransaction.users.length &&
              currentTransaction.users.map((person, index) => (
                <Person
                  key={person.id ?? index}
                  person={person}
                  setSelectedPeople={setSelectedPeople}
                  selectedPeople={selectedPeople}
                  index={index}
                  employeeAdmin={employeeAdmin}
                />
              ))}
          </>
        ) : null}
      </>

      {!employeeAdmin ? (
        <RefundButton
          disabled={isAllRefunded}
          onClick={async () => {
            if (
              window.confirm(
                'Are you sure you want to refund the selected passes?'
              )
            ) {
              try {
                const passes = selectedPeople
                  .map((person) => person.tickets.map((ticket) => ticket.id))
                  .flat();

                const response = await refundPasses(
                  passes,
                  Number(match.params.id)
                );
                if (!response || response.errors) {
                  toast.error('Passes could not be refunded');
                  return;
                }

                if (response.data.refundPasses) {
                  toast.success('Passes have been refunded');
                  close();
                } else {
                  toast.error('Passes could not be refunded');
                }
              } catch (e) {}
            }
          }}
        >
          Refund
        </RefundButton>
      ) : null}

      {admin && !isAllRefunded ? (
        <TransferButton
          disabled={!selectedPeople.map((item) => item.tickets).flat().length}
        >
          <Link
            to={{
              pathname: `/transfer`,
              query: [...selectedPeople],
            }}
            className={TransferButton}
          >
            transfer
          </Link>
        </TransferButton>
      ) : null}
    </ModalContainer>
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
