import React from 'react';
import styled, { withTheme } from 'styled-components';
import { formatPhoneNumber } from 'shared/formatters';
import GetUserExport from './gql/queries/get-users-export';

const Container = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 20px 40px 0 40px;
  padding: 0;
  width: calc(100% - 80px);

  &:focus {
    outline: none;
  }

  @media (max-width: 859px) {
    display: none;
  }
`;

const IconWrapper = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;

  span {
    color: #3c4144;
    font-family: Roboto;
    font-size: 12px;
    font-weight: 700;
    line-height: 21px;
    text-align: center;
    margin-top: 10px;
  }

  svg {
    fill: #fa4616;
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

const exportCvs = (data) => {
  const csv = `
Name, Email, Phone, Address, Role, Races Attended, Purchases, Total, # Favorites
${data.getUserExport
  .map(
    (value) =>
      `"${value.name}","${value.email}","${
        value.cellphone ? formatPhoneNumber(value.cellphone) : ''
      }","${value.address ? value.address : ''}","${value.role}","${
        value.races
      }","${value.purchases}","${value.lifetimeValue}","${
        value.favoritesCount
      }"`
  )
  .join('\n')}`;

  download('UsersList.csv', csv.trim());
};

const Export = ({ icon, data }) => {
  if (!data.getUserExport) return null;
  return (
    <Container>
      <IconWrapper onClick={() => exportCvs(data)}>
        {icon}
        <span>Export Users</span>
      </IconWrapper>
    </Container>
  );
};

export default withTheme(GetUserExport(Export));
