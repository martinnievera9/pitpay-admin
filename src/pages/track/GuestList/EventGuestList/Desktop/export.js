import dayjs from 'dayjs';
import React from 'react';
import styled from 'styled-components';
import { formatPhoneNumber } from 'shared/formatters';

const Container = styled.button`
  border-radius: 5px;
  background-color: #fa4616;
  color: #fff;
  box-sizing: border-box;
  padding: 15px;
  border: none;
  width: calc(100% - 20px);
  margin: 0 10px 0 10px;

  &:focus {
    outline: none;
  }

  @media (min-width: 860px) {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0 10px 0 10px;
    background-color: transparent;
    cursor: pointer;
    width: auto;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 860px) {
    margin: 0;
    border: 0;
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  span {
    color: #fff;
    font-family: Roboto;
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    text-align: center;
    font-weight: 700;
    line-height: 16px;

    @media (min-width: 860px) {
      text-align: center;
      font-size: 12px;
      color: #3c4144;
      text-align: center;
      margin-top: 10px;
    }
  }

  svg {
    fill: #fff;
    margin-right: 10px;

    @media (min-width: 860px) {
      fill: #fa4616;
      margin: 0;
    }
  }
`;

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
  );
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function renderGuests(guests, guestType) {
  return guests
    .map((guest) => {
      const { last_name, first_name, phone_number, additional_guests } = guest;
      return `"${last_name}, ${first_name}","${formatPhoneNumber(
        phone_number
      )}","${additional_guests}","${guestType}"`;
    })
    .join('\n');
}

const exportCvs = ({ guests, event }) => {
  const csv = `${
    event.start_date ? dayjs(event.start_date).format('MMM DD - YYYY') : null
  } ${
    event.end_date ? `- ${dayjs(event.end_date).format('MMM DD - YYYY')}` : null
  } - ${event.name},,
Name, Phone Number, Additional Guests, Guest Type
${renderGuests(guests.event_guests, 'Single Event')}
${renderGuests(guests.yearly_guests, 'Yearly')}
`;

  download('GuestList.csv', csv.trim());
};

const Export = ({ icon, ...props }) => {
  return (
    <Container onClick={() => exportCvs(props)}>
      <IconWrapper>
        {icon}
        <span>Export List</span>
      </IconWrapper>
    </Container>
  );
};

export default Export;
