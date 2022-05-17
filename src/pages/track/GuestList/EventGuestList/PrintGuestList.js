/* eslint-disable */
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import React from 'react';
import { PrintButton } from 'components/PrintButton';
import { formatPhoneNumber } from 'shared/formatters';
import { Logo } from './Desktop/logo';
import dayjs from 'dayjs';

function renderTable(doc, headers, data) {
  return doc.autoTable({
    startY: 100,
    rowPageBreak: 'avoid',
    columns: [
      { dataKey: 'name', header: 'NAME' },
      { dataKey: 'phone_number', header: 'PHONE NUMBER' },
      { dataKey: 'adidtional_guests', header: 'ADDITIONAL GUESTS' },
      { dataKey: 'guest_type', header: 'GUEST TYPE' },
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
      },
      phone_number: {
        cellWidth: 100,
      },
      additional_guests: {
        cellWidth: 100,
      },
      guest_type: {
        cellWidth: 100,
      },
    },
  });
}

export const PrintGuestList = ({ guests, event, buttonLabel }) => {
  const date = event.start_date;
  const { event_guests, yearly_guests } = guests;

  function buildPdf() {
    const unit = 'pt';
    const size = 'A4'; // Use A1, A2, A3 or A4
    const orientation = 'landscape'; // portrait or landscape

    const doc = new jsPDF(orientation, unit, size, true);

    doc.setFontSize(15);
    doc.setFontStyle('bold');

    const title = dayjs(date, 'MM-DD-YYYY').format('MMM DD - YYYY');

    const pageSize = doc.internal.pageSize;
    const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();

    const text = doc.splitTextToSize(title, pageWidth - 650, {});
    doc.text(text, 40, 40);
    doc.text(event.name, 40, 60);

    const headers = [
      ['NAME', 'PHONE NUMBER', 'ADDITONAL GUESTS', 'GUEST TYPE'],
    ];

    const eventGuestsData = event_guests.map((guest) => {
      const { last_name, first_name, phone_number, additional_guests } = guest;
      return [
        `${last_name}, ${first_name}`,
        formatPhoneNumber(phone_number),
        additional_guests,
        'Single Event',
      ];
    });

    const yearlyGuestsData = yearly_guests.map((guest) => {
      const { last_name, first_name, phone_number, additional_guests } = guest;
      return [
        `${last_name}, ${first_name}`,
        formatPhoneNumber(phone_number),
        additional_guests,
        'Yearly',
      ];
    });

    doc.text(`Guests Guests (${event_guests.length})`, 40, 80);
    doc.text('Guest List', 640, 70);
    doc.addImage(Logo, 'PNG', 760, 40, 50, 50, '', 'FAST');
    renderTable(doc, headers, [...eventGuestsData, ...yearlyGuestsData]);

    doc.setProperties({
      title: 'Guest List',
      subject: 'Guest List',
      author: 'Pit Pay',
    });
    return doc;
  }

  return (
    <PrintButton buildPdf={buildPdf} text={buttonLabel} variant="minimal" />
  );
};
