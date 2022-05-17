import React from 'react';
import { Route, MemoryRouter } from 'react-router-dom';
import Icon from 'components/Icon';
import { TransactionModal as Modal } from 'components/Modal';
import {
  ParticipantName,
  ParticipantRow,
} from 'components/Participants/TicketsListMobile/style';
import Text from 'components/Text';
import { ModalContainer, Header } from './styles';
import { TransactionTickets } from './TransactionTickets';

export const TransferLogModal = ({
  transferLogs,
  close,
  isVisible,
  admin,
  employeeAdmin,
  match,
}) => {
  return (
    <Modal
      maxWidth={600}
      isVisible={isVisible}
      close={close}
      hideModal={close}
      noHeader
      modalStyle={{ overflow: 'scroll' }}
    >
      <ModalRoutes
        close={close}
        admin={admin}
        employeeAdmin={employeeAdmin}
        transferLogs={transferLogs}
        match={match}
      />
    </Modal>
  );
};

const ModalRoutes = ({
  close,
  admin,
  transferLogs,
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
            transferLogs={transferLogs}
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

const BaseModal = ({ close, transferLogs }) => {
  return (
    <ModalContainer>
      <Header>
        <Text type="heading">Transfer Logs</Text>
        <Icon
          icon="close"
          size={18}
          color={'#fa4616'}
          onClick={() => {
            close();
          }}
        />
      </Header>

      {transferLogs.map((transferLog) => (
        <ParticipantRow>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ParticipantName>{transferLog.name.toUpperCase()}</ParticipantName>
          </div>
        </ParticipantRow>
      ))}
    </ModalContainer>
  );
};
