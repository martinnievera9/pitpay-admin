import React from 'react';
import styled from 'styled-components';
import { getDriverName } from './RegistrationsDesktop';

const Container = styled.button`
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
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
    color: ${(props) => props.theme.colors.white};
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
    fill: ${(props) => props.theme.colors.white};
    margin-right: 10px;

    @media (min-width: 860px) {
      fill: ${(props) => props.theme.colors.primary};
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

const getHeaderItems = (transactions) => {
  return transactions[0].data.reduce(
    (headers, field) => {
      return [...headers, field.label];
    },
    ['Name', 'Purchaser Name', 'Registration Name', 'Promo']
  );
};

const formatRegistrationData = (transactions, headers) => {
  return transactions
    .map((transaction) => {
      const { user, promo, registration, data } = transaction;
      const { first_name, last_name } = user;
      const purchaserName = `${last_name ? `${last_name}, ` : ''}${first_name}`;
      const driverName = getDriverName(data);
      const { name: ticketName } = registration ?? { name: '' };

      return headers
        .map((header) => {
          const fieldData = [
            { value: driverName, label: 'Name' },
            { value: ticketName, label: 'Registration Name' },
            { value: purchaserName, label: 'Purchaser Name' },
            { value: promo?.name ?? '', label: 'Promo' },
          ]
            .concat(data)
            .find((item) => item.label === header);
          return fieldData ? fieldData.value : '';
        })
        .map((item) =>
          true === item
            ? 'Yes'
            : false === item
            ? 'No'
            : item.replace(/,/g, ' ')
        );
    })
    .map((data) => data.join(', '));
};

const exportCvs = ({ transactions, event, total, date }) => {
  const headers = getHeaderItems(transactions);

  const csv = `${date}${'\n'}${
    event.name
  }${'\n'}Registrations (${total})${'\n'},,,,,,,
${headers.join(', ')}
${formatRegistrationData(transactions, headers).join('\n')}
`;

  download('RegistrationsList.csv', csv.trim());
};

export const ExportRegistrations = ({ icon, ...props }) => {
  return (
    <Container
      onClick={() => (props.transactions.length < 1 ? null : exportCvs(props))}
    >
      <IconWrapper>
        {icon}
        <span>Export List</span>
      </IconWrapper>
    </Container>
  );
};
