import React from 'react';
import styled, { withTheme } from 'styled-components';

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

function exportCsv(transactions) {
  const headers = `Participant,Purchaser,Ticket Name,Ticket Type,Promo,Refunded,transfer,charge,cost,fee,International${'\n'}`;

  const sortedTransactions = transactions.sort((a, b) => {
    const aName = `${a.participant.last_name}${a.participant.first_name}`.toLowerCase();
    const bName = `${b.participant.last_name}${b.participant.first_name}`.toLowerCase();
    return aName > bName ? 1 : bName > aName ? -1 : 0;
  });

  const transactionRows = sortedTransactions
    .map(transaction => {
      const {
        participant,
        purchaser,
        ticket,
        type,
        promo,
        refunded,
        transfer,
        charge,
        cost,
        fee,
        international_fee
      } = transaction;
      return `"${participant}","${purchaser}","${ticket}","${type}","${promo}","${refunded}","${transfer}","${charge}","${cost}","${fee}","${
        international_fee ? 'Yes' : 'No'
      }"`;
    })
    .join('\n');

  const csv = `${headers}${transactionRows}`;

  download('TransactionsList.csv', csv.trim());
}

const Export = ({ icon, transactions }) => {
  return (
    <Container onClick={() => exportCsv(transactions)}>
      <IconWrapper>
        {icon}
        <span>Export List</span>
      </IconWrapper>
    </Container>
  );
};

export default withTheme(Export);
