import React from 'react';
import { Link } from 'react-router-dom';
import { withTheme } from 'styled-components';
import Icon from 'components/Icon';
import LineHeightText from 'components/LineHeightText';
import { SearchableListContainer } from 'components/SearchableListContainer';
import { Table } from 'components/Table';
import { formatPhoneNumber } from 'shared/formatters';
import Export from '../../app/Users/exportAllUsers';
import { useGetCustomers } from './gql/queries/get-customers';

const Users = ({ theme }) => {
  const { data } = useGetCustomers();

  const columns = [
    {
      label: 'User Name',
      key: 'name',
    },
    {
      label: 'User Email',
      key: 'email',
    },
    {
      label: 'Mobile Phone',
      key: 'cellphone',
    },
  ];

  function renderRows(user) {
    const { id, last_name, first_name, middle_name, suffix, email, cellphone } =
      user;
    return {
      name: (
        <Link
          to={`/admin-track/users/transactions/${id}`}
          style={{
            color: theme.colors.primary,
          }}
        >
          <LineHeightText>{`${last_name ? `${last_name}, ` : ''}${first_name} ${
            middle_name ? middle_name : ''
          } ${suffix ? `, ${suffix}` : ''}`}</LineHeightText>
        </Link>
      ),
      email,
      cellphone: formatPhoneNumber(cellphone),
    };
  }

  return !data?.getCustomers ? (
    <div />
  ) : (
    <>
      <Export icon={<Icon icon="Export-Icon" size={40} />} />
      <SearchableListContainer
        pageCount={data.getCustomers.count}
        paginated
        title="Customers"
        searchInputPlaceholder="Cellphone Lookup"
      >
        <Table
          items={data.getCustomers.results}
          columns={columns}
          renderRows={renderRows}
        />
      </SearchableListContainer>
    </>
  );
};

export default withTheme(Users);
