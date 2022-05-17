import React from 'react';
import Icon from 'components/Icon';
import Text from 'components/Text';
import { TransactionModal as Modal } from 'components/Modal';
import { ModalSectionHeaderContainer } from 'components/Modal/styles';
import { Checkbox } from 'components/Form/Checkbox';
import Spacer from 'components/Spacer';
import {
  ModalContainer,
  DataRow,
  Passitem,
  TicketsWrapper,
  Ticket,
  Header
} from './style';

const PassesModal = ({ currentTransaction, close, match }) => {
  return (
    <Modal
      maxWidth={600}
      isVisible={currentTransaction}
      close={close}
      noHeader
      modalStyle={{ overflow: 'scroll' }}
    >
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
          <Spacer size={15} />
          <DataRow>
            <Text type="bold" color="#707273" inlineStyle={{ width: '50%' }}>
              Total:
            </Text>
            <Text
              type="bold"
              fontWeight="600"
              inlineStyle={{
                width: '50%',
                whiteSpace: 'normal',
                marginLeft: 10
              }}
            >
              {currentTransaction.total}
            </Text>
          </DataRow>
          <Spacer size={15} />
          <DataRow>
            <Text type="bold" color="#707273" inlineStyle={{ width: '50%' }}>
              Fee:
            </Text>
            <Text
              type="bold"
              fontWeight="600"
              inlineStyle={{
                width: '50%',
                whiteSpace: 'normal',
                marginLeft: 10,
                textTransform: 'capitalize'
              }}
            >
              {currentTransaction.fee}
            </Text>
          </DataRow>
          <Spacer size={15} />
          <DataRow>
            <Text type="bold" color="#707273" inlineStyle={{ width: '50%' }}>
              Discount:
            </Text>
            <Text
              type="bold"
              fontWeight="600"
              inlineStyle={{
                width: '50%',
                whiteSpace: 'normal',
                marginLeft: 10
              }}
            >
              {currentTransaction.discount}
            </Text>
          </DataRow>
          <Spacer size={15} />
          <DataRow>
            <Text type="bold" color="#707273" inlineStyle={{ width: '50%' }}>
              Status:
            </Text>
            <Text
              type="bold"
              fontWeight="600"
              inlineStyle={{
                width: '50%',
                whiteSpace: 'normal',
                marginLeft: 10,
                textTransform: 'capitalize'
              }}
            >
              {currentTransaction.status}
            </Text>
          </DataRow>
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
                  marginLeft: 10
                }}
              >
                {currentTransaction.refund}
              </Text>
            </DataRow>
          ) : null}

          <ModalSectionHeaderContainer>
            <Text type="heading">Passes</Text>
          </ModalSectionHeaderContainer>
          {currentTransaction.users.map(person => (
            <TicketsWrapper>
              <Ticket>
                <Text
                  inlineStyle={{
                    fontWeight: '600',
                    fontSize: 20
                  }}
                >
                  {person.user.name}
                </Text>
                {person.tickets.map(ticket => (
                  <Passitem>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Checkbox
                        inversed
                        name="checkbox"
                        checked={ticket.refunded ? 'refunded' : false}
                        check={ticket.refunded ? false : true}
                        size={[36, 20, 3]}
                      />
                      <Text
                        inlineStyle={{
                          fontWeight: '600',
                          fontSize: 20,
                          marginLeft: 10,
                          whiteSpace: 'normal'
                        }}
                      >
                        {ticket.name}
                      </Text>
                    </div>
                    <Text
                      inlineStyle={{
                        fontWeight: '600',
                        fontSize: 20,
                        marginLeft: 20
                      }}
                    >
                      {ticket.price}
                    </Text>
                  </Passitem>
                ))}
              </Ticket>
            </TicketsWrapper>
          ))}
        </>
      </ModalContainer>
    </Modal>
  );
};

export default PassesModal;
