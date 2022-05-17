/* eslint-disable */
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import React from 'react';
import { PrintButton } from 'components/PrintButton';
import colors from 'components/ThemeProvider/colors';
import useTheme from 'hooks/useTheme';
import checkbox from './checkbox.png';
import { CheckedInIcon } from './checkedInIcon.js';
import { Logo } from './logo';
import { RefundedIcon } from './refundedIcon.js';
import dayjs from 'dayjs';

const getTotal = (participants) => {
  const listOfCost = participants
    .map((participant) =>
      participant.status === 'active'
        ? participant.tickets.map((ticket) => ticket.cost)
        : null
    )
    .flat();

  const costs = listOfCost.filter(Boolean);

  const total = costs.reduce((a, b) => {
    return a + b;
  }, 0);

  //
  return `$${total.toFixed(2)}`;
};

export const PrintParticipants = ({
  date,
  participants,
  event,
  refunded,
  checkedIn,
  text,
}) => {
  const theme = useTheme();

  const exportPDF = () => {
    const unit = 'pt';
    const size = 'A4'; // Use A1, A2, A3 or A4
    const orientation = 'landscape'; // portrait or landscape

    const doc = new jsPDF(orientation, unit, size, true);

    doc.setFontSize(15);
    doc.setFontStyle('bold');

    const title = dayjs(date, 'YYYY-MM-DD').format('MMM DD - YYYY');

    const pageSize = doc.internal.pageSize;
    const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    const pageHeight = pageSize.height ?? pageSize.getHeight();

    const text = doc.splitTextToSize(title, pageWidth - 650, {});
    doc.text(text, 40, 40);
    doc.text(event.name, 40, 60);
    doc.text(
      `Participants (${participants.length}) - Total Sales ${getTotal(
        participants
      )}`,
      40,
      80
    );
    doc.text('Participant List', 640, 70);
    if (Logo) {
      doc.addImage(Logo, 'PNG', 760, 40, 50, 50, '', 'FAST');
    }

    const headers = [['NAME', 'AGE', 'DUTY', 'PROMO', 'PASSES', 'PASS PRICE']];

    const data = participants
      .map((participant) => {
        const { name, age, duty, promo_code, tickets } = participant;
        const areAllTicketsRefunded = tickets.reduce((allRefunded, ticket) => {
          return ticket.status !== 'refunded' ? false : allRefunded;
        }, true);
        const nonRefundedTickets = tickets.filter(
          (ticket) => ticket.status !== 'refunded'
        );
        return areAllTicketsRefunded
          ? null
          : [
              name,
              age,
              duty,
              promo_code,
              nonRefundedTickets.reduce(
                (acc, ticket) =>
                  acc.length
                    ? acc.concat(`\r\n${ticket.ticket_name.toUpperCase()}`)
                    : `${ticket.ticket_name.toUpperCase()}`,
                ''
              ),
              nonRefundedTickets.reduce(
                (acc, ticket) =>
                  acc.length
                    ? acc.concat(`\r\n$${ticket.cost.toFixed(2)}`)
                    : `$${ticket.cost.toFixed(2)}`,
                ''
              ),
            ];
      })
      // Because anyone with no non-refunded tickets will otherwise be a blank row
      .filter((participant) => !!participant);

    doc.autoTable({
      startY: 100,
      rowPageBreak: 'avoid',
      columns: [
        { dataKey: 'name', header: 'NAME' },
        { dataKey: 'age', header: 'AGE' },
        { dataKey: 'duty', header: 'DUTY' },
        { dataKey: 'promo', header: 'PROMO' },
        { dataKey: 'passes', header: 'PASSES' },
        { dataKey: 'price', header: 'PASSES PRICE' },
      ],
      head: headers,
      body: data,
      styles: {
        fontStyle: 'bold',
      },
      headStyles: {
        fillColor: '#fa4616',
      },
      columnStyles: {
        name: {
          cellWidth: 200,
          cellPadding: { top: 5, right: 5, bottom: 5, left: 20 },
          textColor: theme.colors.text.black,
        },
        age: {
          cellWidth: 50,
        },
        duty: {
          cellWidth: 100,
        },
        promo: {
          cellWidth: 100,
        },
      },
      didParseCell: function (data) {
        const hasNoWaiver = data.row.raw[6] === false;

        if (hasNoWaiver) {
          data.cell.styles.fillColor = '#feece8';
          data.cell.styles.textColor = colors.text.gray;
          data.cell.styles.opacity = 0.1;
        }
      },
      didDrawCell: function (data) {
        if (data.row.section === 'body' && data.column.dataKey === 'name') {
          const isRefunded = refunded.includes(data.cell.raw);
          const isCheckedIn = checkedIn.includes(data.cell.raw);

          if (isRefunded) {
            doc.addImage(
              RefundedIcon,
              'PNG',
              data.cell.x + 5,
              data.cell.y + 4,
              12,
              12,
              '',
              'FAST'
            );
          } else if (isCheckedIn) {
            doc.addImage(
              CheckedInIcon,
              'PNG',
              data.cell.x + 5,
              data.cell.y + 4,
              12,
              12,
              '',
              'FAST'
            );
          } else {
            doc.addImage(
              checkbox,
              'PNG',
              data.cell.x + 5,
              data.cell.y + 4,
              12,
              12,
              '',
              'FAST'
            );
          }
        }
      },
    });

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 0; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setFontStyle('normal');
      const dateTimeStamp = dayjs().format('MMM - DD - YYYY HH:mm A');
      doc.text(`Exported ${dateTimeStamp}`, pageWidth - 340, pageHeight - 20, {
        align: 'right',
      });
    }
    // Set typography back to default
    doc.setFontSize(15);
    doc.setFontStyle('bold');

    doc.setProperties({
      title: 'Participant List',
      subject: 'Participant List',
      author: 'Pit Pay',
    });
    return doc;
  };

  return <PrintButton buildPdf={exportPDF} text={text} variant="minimal" />;
};
