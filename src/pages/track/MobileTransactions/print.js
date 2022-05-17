import dayjs from 'dayjs';
import React from 'react';
import { TransactionsPrintList } from 'pages/app/Transactions/TransactionsPrintList';
import GetAllEventTransactions from './gql/get-all-event-transactions';

const PrintButton = ({ data, event }) => {
  if (!data.getAllEventTransactions) return false;

  return (
    <TransactionsPrintList
      transactions={data.getAllEventTransactions.results}
      date={
        event.isMultiDay
          ? `${event.fullMonth} ${event.listDates}, ${dayjs(
              event.end_date
            ).format('YYYY')} `
          : event.fullDate
      }
      event={event}
      total={data.getAllEventTransactions.count}
      text="Print List"
    />
  );
};

export default GetAllEventTransactions(PrintButton);
