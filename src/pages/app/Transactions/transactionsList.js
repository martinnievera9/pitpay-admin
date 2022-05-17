import React, { useState } from 'react';
import styled from 'styled-components';
import LineHeightText from 'components/LineHeightText';
import { SearchableListContainer } from 'components/SearchableListContainer';
import {
  TableComponent as Table,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from 'components/Table';
import {
  TransactionModal,
  useGetTrackTransactionsGetEvent,
} from 'components/Transactions';
import { formatTimestamp } from 'shared/formatters';
import { TransactionsListHeader as Header } from './header';

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

const Transactions = (props) => {
  const { location, match } = props;
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const { data } = useGetTrackTransactionsGetEvent();

  if (!data?.getEvent && !data?.getTrackTransactions) return null;

  return (
    <>
      <SearchableListContainer
        header={
          <Header
            event={data}
            {...props}
            transactions={data.getTrackTransactions.results}
            total={data.getTrackTransactions.count}
          />
        }
        pageCount={data.getTrackTransactions.count}
        paginated
        searchInputPlaceholder="Search Transactions"
        title="Transactions"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell scope="col">Date</TableCell>
              <TableCell scope="col">Name</TableCell>
              <TableCell scope="col">Total</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!data.getTrackTransactions.results.length &&
            data?.variables?.getTrackTransactionsInput.queryString ? (
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
            ) : !data.getTrackTransactions.results.length ? (
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
            ) : null}
            {data.getTrackTransactions.results.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {formatTimestamp(
                    Number(transaction.purchase_date),
                    'MMM DD - YYYY h:mm a ',
                    true
                  )}
                </TableCell>
                <TableCell>
                  <LineHeightText>
                    <OpenModal
                      onClick={() => setCurrentTransaction(transaction)}
                    >
                      {transaction.user
                        ? `${transaction.user.last_name}, ${transaction.user.first_name}`
                        : ''}
                    </OpenModal>
                  </LineHeightText>
                </TableCell>
                <TableCell>{transaction.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SearchableListContainer>
      {currentTransaction ? (
        <TransactionModal
          admin={location.pathname.includes('/admin/transactions/')}
          match={match}
          currentTransaction={currentTransaction}
          close={() => {
            setCurrentTransaction(null);
          }}
        />
      ) : null}
    </>
  );
};

export default Transactions;
