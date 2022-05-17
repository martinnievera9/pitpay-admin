import React, { useState } from 'react';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import {
  CardText,
  Card,
  CardLabel,
  CardContent,
} from 'components/Card/cardStyle';
import Container from 'components/Container';
import Icon from 'components/Icon';
import { formatPhoneNumber } from 'shared/formatters';
import { EmployeeEdit } from '../EmployeeEdit';
import DeleteEmployee from '../gql/mutations/delete-employee';
import GetEmployees from './gql/get-employee.js';

const Employees = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const handleOutClick = () => {
    setIsVisible(!isVisible);
    setCurrentEmployee(null);
  };

  if (!props.data.getEmployee) return false;

  return props.data.loading ? (
    <div />
  ) : (
    <Container>
      <div style={{ padding: 20 }}>
        <Card key={props.data.getEmployee.id}>
          <CardText>
            <CardLabel style={{ width: '15%' }}>Name:</CardLabel>
            <CardContent
              style={{ width: '85%' }}
            >{`${props.data.getEmployee.last_name}, ${props.data.getEmployee.first_name}`}</CardContent>
          </CardText>
          <CardText>
            <CardLabel style={{ width: '15%' }}>Email:</CardLabel>{' '}
            <CardContent style={{ width: '85%' }}>
              {props.data.getEmployee.email}
            </CardContent>
          </CardText>
          <CardText>
            <CardLabel style={{ width: '15%' }}>Phone:</CardLabel>{' '}
            <CardContent style={{ width: '85%' }}>
              {formatPhoneNumber(props.data.getEmployee.cellphone)}
            </CardContent>
          </CardText>
          <Icon
            icon="edit"
            size={23}
            color={props.theme.colors.primary}
            onClick={async () => {
              setCurrentEmployee(props.data.getEmployee.id);
              setIsVisible(!isVisible);
            }}
            padding="0 15px 0 0"
          />
          <Icon
            icon="trash"
            size={23}
            color={props.theme.colors.primary}
            onClick={async () => {
              if (
                window.confirm('Are you sure you want to delete this user?')
              ) {
                props.deleteEmployee(props.data.getEmployee.id);
                props.history.push('/admin-track/employees');
              }
            }}
          />
        </Card>
      </div>
      <EmployeeEdit
        isVisible={isVisible}
        handleOutClick={handleOutClick}
        currentEmployee={currentEmployee}
      />
    </Container>
  );
};

export default compose(GetEmployees, DeleteEmployee)(withTheme(Employees));
