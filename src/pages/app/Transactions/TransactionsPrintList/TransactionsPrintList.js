import jsPDF from 'jspdf';
import { uniq } from 'lodash';
import React from 'react';
import 'jspdf-autotable';
import styled from 'styled-components';
import { PrintButton } from 'components/PrintButton';
import checkbox from './checkbox.png';
import { KartPassLogo } from './kartpass-logo';
import { Logo } from './logo';

const ButtonContainer = styled.div`
  margin: 0 10px;
  & > button {
    width: 100%;

    @media screen and (min-width: 861px) {
      width: auto;
    }
  }
`;

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

const getTotal = (transactions) => {
  const listOfCost = transactions
    .map((transaction) =>
      transaction.users
        .map((user) =>
          user.tickets.map((ticket) => {
            return parseFloat(ticket.price.substr(1).replace(/,/g, ''));
          })
        )
        .flat()
    )
    .flat();

  const costs = listOfCost.filter(Boolean);

  const totalCosts = costs.reduce((a, b) => a + b, 0);

  const refunds = transactions.map((item) =>
    item.refund ? parseFloat(item.refund.substr(1).replace(/,/g, '')) : null
  );

  const totalRefunds = refunds.reduce((a, b) => {
    return a + b;
  }, 0);

  return totalCosts - totalRefunds;
};

const getFeeTotals = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    const fee = parseFloat(transaction.fee.substr(1).replace(/$/g, ''));
    return acc + fee;
  }, 0);
};

const getParticipantsTotal = (transactions) => {
  const usersArray = transactions.reduce((acc, transaction) => {
    if (!transaction.refund) {
      const users = transaction.users.filter((user) =>
        user.tickets.find((ticket) => 'ticket' === ticket.type)
      );
      return acc.concat(users.map((user) => user.user.id));
    } else {
      return acc;
    }
  }, []);
  return uniq(usersArray).length;
};

const setPriceLine = (transactions) => {
  const priceLines = transactions
    .map((user, index) => {
      return `${user.tickets
        .map((ticket, ticketIndex) => {
          return index === 0 && ticket.name.length > 37
            ? `${'\n'}${ticket.price}${'\n'}`
            : ticket.name.length > 37
            ? `${'\n'}${'\n'}${ticket.price}${'\n'}`
            : index === 0
            ? `${'\n'}${ticket.price}`
            : ticketIndex === 0
            ? `${'\n'}${'\n'}${ticket.price}`
            : `${'\n'}${ticket.price}`;
        })
        .join('\n')}`;
    })
    .join('\n');
  return priceLines;
};

const getHeaders = (show_fee) => {
  if (show_fee) {
    return [
      [
        'NAME',
        'TOTAL',
        'FEE',
        'DISCOUNT',
        'PROMO',
        'REFUND',
        'PASSES',
        'PRICE',
      ],
    ];
  }
  return [['NAME', 'TOTAL', 'DISCOUNT', 'PROMO', 'REFUND', 'PASSES', 'PRICE']];
};

const getColumns = (show_fee) => {
  if (show_fee) {
    return [
      { dataKey: 'name', header: 'NAME' },
      { dataKey: 'total', header: 'TOTAL' },
      { dataKey: 'fee', header: 'FEE' },
      { dataKey: 'discount', header: 'DISCOUNT' },
      { dataKey: 'promo', header: 'PROMO' },
      { dataKey: 'refund', header: 'REFUND' },
      { dataKey: 'passes', header: 'PASSES' },
      { dataKey: 'price', header: 'PRICE' },
    ];
  }
  return [
    { dataKey: 'name', header: 'NAME' },
    { dataKey: 'total', header: 'TOTAL' },
    { dataKey: 'discount', header: 'DISCOUNT' },
    { dataKey: 'promo', header: 'PROMO' },
    { dataKey: 'refund', header: 'REFUND' },
    { dataKey: 'passes', header: 'PASSES' },
    { dataKey: 'price', header: 'PRICE' },
  ];
};

const buildData = (show_fee, transactions) => {
  if (show_fee) {
    return transactions.map((transaction) => [
      transaction.user
        ? `${transaction.user.last_name}, ${transaction.user.first_name}`
        : '',
      transaction.total,
      transaction.fee,
      transaction.discount,
      transaction.users
        .map((user) => `${user.promo ? user.promo : ''}${'\n'}`)
        .join('\n'),
      transaction.refund ? `${transaction.refund}` : '',
      transaction.users
        .map(
          (user) =>
            `${user.user.name}${'\n'}${user.tickets
              .map((ticket) => `${ticket.name}${'\n'}`)
              .join('\n')}`
        )
        .join('\n'),
      setPriceLine(transaction.users),
    ]);
  }

  return transactions.map((transaction) => [
    transaction.user
      ? `${transaction.user.last_name}, ${transaction.user.first_name}`
      : '',
    transaction.total,
    transaction.discount,
    transaction.users
      .map((user) => `${user.promo ? user.promo : ''}${'\n'}`)
      .join('\n'),
    transaction.refund ? `${transaction.refund}` : '',
    transaction.users
      .map(
        (user) =>
          `${user.user.name}${'\n'}${user.tickets
            .map((ticket) => `${ticket.name}${'\n'}`)
            .join('\n')}`
      )
      .join('\n'),
    setPriceLine(transaction.users),
  ]);
};

export const TransactionsPrintList = ({
  date,
  transactions,
  event,
  text,
  total,
}) => {
  const isKartPass = 'kartpass' === process.env.REACT_APP_PLATFORM;

  const exportPDF = () => {
    const unit = 'pt';
    const size = 'A4'; // Use A1, A2, A3 or A4
    const orientation = 'landscape'; // portrait or landscape

    const totals = getTotal(transactions);
    const fees = getFeeTotals(transactions);
    const doc = new jsPDF(orientation, unit, size, true);

    doc.setFontSize(15);
    doc.setFontStyle('bold');

    const title = date.replace(',', ' -');

    const pageSize = doc.internal.pageSize;
    const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();

    const text = doc.splitTextToSize(title, pageWidth - 650, {});

    const trackOrSeriesName =
      event.track?.name ??
      (event.series?.length > 0 ? event.series[0].name : '');
    doc.text(text, 40, 40);
    doc.text(event.name, 40, 60);
    if (trackOrSeriesName) {
      doc.text(trackOrSeriesName, 40, 80);
    }

    doc.text(
      `Transactions (${total}) - ${
        event.hide_fee ? 'Gross Sales' : 'Total Sales'
      } ${currency.format(totals)}`,
      40,
      trackOrSeriesName ? 100 : 80
    );

    if (event.hide_fee) {
      doc.text(
        `Participants (${getParticipantsTotal(
          transactions
        )}) - Net Sales ${currency.format(totals - fees)}`,
        40,
        trackOrSeriesName ? 120 : 100
      );
    } else {
      doc.text(
        `Participants (${getParticipantsTotal(transactions)})`,
        40,
        trackOrSeriesName ? 120 : 100
      );
    }

    doc.text('Transactions List', 620, 70);
    if (checkbox) {
      if (isKartPass) {
        doc.addImage(KartPassLogo, 'PNG', 750, 40, 75, 50, '', 'FAST');
      } else {
        doc.addImage(Logo, 'PNG', 760, 40, 50, 50, '', 'FAST');
      }
    }

    const headers = getHeaders(event.hide_fee);

    const data = buildData(event.hide_fee, transactions);

    doc.autoTable({
      startY: trackOrSeriesName ? 140 : 120,
      rowPageBreak: 'avoid',
      columns: getColumns(event.hide_fee),
      head: headers,
      body: data,
      styles: {
        fontStyle: 'bold',
      },
      headStyles: {
        fillColor: isKartPass ? '#00001F' : '#fa4616',
      },
      columnStyles: {
        name: {
          cellWidth: 130,
        },
        discount: {
          cellWidth: 80,
        },
        total: {
          cellWidth: 80,
        },
        fee: {
          cellWidth: 50,
        },
        promo: {
          cellWidth: 80,
        },
        refund: {
          cellWidth: 80,
        },
        passes: {
          cellWidth: isKartPass ? 180 : 220,
        },
        price: {
          cellWidth: 80,
        },
      },
    });

    doc.setProperties({
      title: 'Transactions List',
      subject: 'Transactions List',
      author: 'Pit Pay',
    });
    return doc;
  };

  return (
    <ButtonContainer>
      <PrintButton
        buildPdf={exportPDF}
        text={text}
        filename="Transactions-List"
      />
    </ButtonContainer>
  );
};
