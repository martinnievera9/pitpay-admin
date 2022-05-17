import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { HideOnMobile, HideOnDesktop } from 'components/Card/cardStyle';
import Icon from 'components/Icon';
import { SearchableListContainer } from 'components/SearchableListContainer';
import { Table } from 'components/Table';
import { formatPhoneNumber } from 'shared/formatters';
import { EmployeeEdit } from './EmployeeEdit';
import Modal from './employeeModal';
import DeleteEmployee from './gql/mutations/delete-employee';
import GetEmployees from './gql/queries/get-employees.js';
import { Name } from './style';

const Employees = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [employeeModal, setEmployeeModal] = useState(false);

  const handleOutClick = () => {
    setIsVisible(!isVisible);
    setCurrentEmployee(null);
  };

  if (!props.data.getEmployees) return null;

  const columns = [
    {
      label: 'Name',
      key: 'name',
    },
    {
      label: 'Email',
      key: 'email',
    },
    {
      label: 'Phone',
      key: 'cellphone',
    },
    {
      label: '',
      key: 'actions',
    },
  ];

  function renderRows(employee) {
    const {
      id,
      first_name,
      middle_name,
      last_name,
      suffix,
      email,
      cellphone,
    } = employee;
    return {
      name: `${last_name ? `${last_name}, ` : ''}${first_name} ${
        middle_name ? middle_name : ''
      } ${suffix ? `, ${suffix}` : ''}`,
      email,
      cellphone: formatPhoneNumber(cellphone),
      actions: (
        <>
          <Icon
            icon="edit"
            size={18}
            color={props.theme.colors.primary}
            onClick={async () => {
              setCurrentEmployee(id);
              setIsVisible(!isVisible);
            }}
            padding="0 15px 0 0"
          />
          <Icon
            icon="trash"
            size={18}
            color={props.theme.colors.primary}
            onClick={async () => {
              if (
                window.confirm('Are you sure you want to delete this user?')
              ) {
                props.deleteEmployee(id);
              }
            }}
          />
        </>
      ),
    };
  }

  return props.data.loading ? (
    <div />
  ) : (
    <>
      <SearchableListContainer
        onAddClick={() => setIsVisible(!isVisible)}
        pageCount={props.data.getEmployees.count}
        paginated
        searchInputPlaceholder="Search Staff"
        title="Staff"
      >
        <HideOnMobile>
          <Table
            items={props.data.getEmployees.results}
            columns={columns}
            renderRows={renderRows}
          />
        </HideOnMobile>
        <HideOnDesktop>
          {props.data.getEmployees.results.map((item) => (
            <Link
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                textDecoration: 'none',
                marginBottom: 20,
              }}
              to={`/admin-track/employees/${item.id}`}
            >
              <Name as="div">
                {`${item.last_name ? `${item.last_name}, ` : ''}${
                  item.first_name
                } ${item.middle_name ? item.middle_name : ''} ${
                  item.suffix ? `, ${item.suffix}` : ''
                }`}
              </Name>

              <div style={{ transform: 'rotate(-90deg)' }}>
                <Icon size={22} icon="chevron" color="#fa4616" />
              </div>
            </Link>
          ))}
        </HideOnDesktop>
      </SearchableListContainer>
      <EmployeeEdit
        isVisible={isVisible}
        handleOutClick={handleOutClick}
        currentEmployee={currentEmployee}
        employeeModal={() => {
          setEmployeeModal(true);
        }}
      />
      {employeeModal ? (
        <Modal closeModal={() => setEmployeeModal(false)} />
      ) : null}
    </>
  );
};

export default compose(GetEmployees, DeleteEmployee)(withTheme(Employees));
