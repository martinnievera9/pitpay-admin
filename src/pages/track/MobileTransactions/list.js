import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useRefundEvent } from 'components/Events';
import Icon from 'components/Icon';
import Pagination from 'components/Pagination';
import Spacer from 'components/Spacer';
import Text from 'components/Text';
import {
  TransactionModal,
  useGetTrackTransactionsGetEvent,
} from 'components/Transactions';
import useTheme from 'hooks/useTheme';
import { formatTimestamp } from 'shared/formatters';
import Print from './print';

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
  justify-content: space-between;
  align-items: center;
  margin: 25px 0;
`;

const RowText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  margin-right: 25px;
`;

const RefundEvent = styled.div`
  width: auto;
  padding: 25px;
  color: #fff;
  background-color: #fa4616;
  border-radius: 5px;
  font-family: 'Barlow Condensed';
  font-weight: 600;
  margin: 10px;
  font-size: 20px;
  cursor: pointer;
  text-align: center;

  @media (min-width: 769px) {
    padding: 15px;
  }
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

export const List = (props) => {
  const { match, location, currentPage, refundEventStatus } = props;
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const theme = useTheme();
  const { data, loading } = useGetTrackTransactionsGetEvent(currentPage);
  const refundEvent = useRefundEvent();

  if (!data?.getEvent && !data?.getTrackTransactions) return false;

  return (
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
          <Text type="heading">Transactions</Text>
        </div>
        <Spacer size={10} />
        {!data?.getTrackTransactions.results.length ? (
          <p
            style={{
              color: '#000',
              fontSize: 20,
              fontFamily: 'Barlow Condensed',
              fontWeight: 600,
              padding: '20px 0',
            }}
          >
            The event does not have any transactions yet
          </p>
        ) : null}
        {data?.getTrackTransactions.results.map((transaction, index) => {
          const { purchase_date, user } = transaction;
          return (
            <ParticipantRow
              onClick={() => setCurrentTransaction(transaction)}
              key={index}
            >
              <RowText>
                <Text
                  inlineStyle={{
                    fontWeight: '500',
                    fontSize: 20,
                  }}
                >
                  {user ? `${user.last_name}, ${user.first_name}` : ''}
                </Text>
                {purchase_date && (
                  <Text inlineStyle={{ fontSize: 16 }}>
                    {formatTimestamp(
                      Number(purchase_date),
                      'MMM DD - YYYY, h:mm A',
                      true
                    )}
                  </Text>
                )}
              </RowText>
              <div style={{ transform: 'rotate(-90deg)' }}>
                <Icon icon="chevron" color={theme.colors.primary} size={22} />
              </div>
            </ParticipantRow>
          );
        })}
      </ParticipantList>
      {currentTransaction ? (
        <TransactionModal
          location={location}
          match={match}
          employeeAdmin={location.pathname.includes('/admin-employee/')}
          admin={location.pathname.includes('/admin/')}
          currentTransaction={currentTransaction}
          close={() => {
            setCurrentTransaction(null);
          }}
        />
      ) : null}
      <Spacer size={10} />
      <Print match={match} event={data?.getEvent} />

      {refundEventStatus ? (
        <RefundEvent
          onClick={async () => {
            if (window.confirm('Are you sure you want to the entire event?')) {
              try {
                const response = await refundEvent(Number(match.params.id));

                if (!response || response.errors) {
                  toast.error('Event can not be refunded');
                  return;
                }

                if (response.data?.refundEvent) {
                  toast.success('Event has been refunded');
                } else {
                  toast.error('Event can not be refunded');
                }
              } catch (e) {}
            }
          }}
        >
          Refund Event
        </RefundEvent>
      ) : null}
      <div style={{ backgroundColor: '#00001F', margin: 10, borderRadius: 5 }}>
        <Pagination
          count={loading ? 0 : data?.getTrackTransactions.count}
          perPage={15}
          currentPage={currentPage || 1}
          color={'#fff'}
        />
      </div>
    </Wrapper>
  );
};
