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

const exportCvs = ({ participants, event }) => {
  const csv = `${
    event.start_date ? dayjs(event.start_date).format('MMM-DD-YYYY') : null
  } ${
    event.end_date ? `- ${dayjs(event.end_date).format('MMM-DD-YYYY')}` : null
  } - ${event.name},,,,,,
Name, Duty, Age, Email, Phone, Address, Passes, Pass Price, Promo, Waiver Signed
${Object.values(participants)
  .map(
    (value) =>
      `"${value.name ?? ''}","${value.duty ?? ''}","${value.age ?? ''}","${
        value.email ?? ''
      }","${formatPhoneNumber(value.phone ?? '')}","${
        value.address ?? ''
      }","${value.tickets.reduce(
        (curr, pass) =>
          value.status === 'refunded'
            ? 'REFUNDED'
            : `${curr} ${pass.ticket_name}${'\n'}`,
        ''
      )}","${value.tickets.reduce(
        (curr, pass) =>
          value.status === 'refunded' ? '' : `${curr} $${pass.cost.toFixed(2)}`,
        ''
      )}","${value.promo_code ?? ''}","${value.has_waiver ? 'Yes' : 'No'}"`
  )
  .join('\n')}`;

  download('ParticipantsList.csv', csv.trim());
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
