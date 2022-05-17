import { Formik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { compose } from 'recompose';
import styled from 'styled-components';
import { Button } from 'components/Button';
import { Drawer, DrawerPadding } from 'components/Drawer';
import { Input } from 'components/Form/Input';
import { getUserOwnership, OwnershipInput } from 'components/Ownership';
import Spacer from 'components/Spacer';
import { createErrorMessage } from 'shared/alerts';
import CreateEmployee from '../gql/mutations/create-employee';
import UpdateEmployee from '../gql/mutations/update-employee';
import { useGetEmployee } from '../gql/queries/get-employee';
import EmployeeSearch from './employee-search';

const Label = styled.p`
  margin-bottom: 20px;
  color: #fff;
  font-weight: 600;
  font-family: 'Barlow Condensed';
  text-align: left;
  font-size: 5.4vw;
  line-height: 29px;

  @media (min-width: 700px) {
    font-size: 20px;
  }

  @media (min-width: 768px) {
    color: #000;
  }
`;

const formValues = [
  'first_name',
  'last_name',
  'cellphone',
  'email',
  'employee',
  'ownership',
];

export const EmployeeEdit = compose(
  CreateEmployee,
  UpdateEmployee
)(
  ({
    isVisible,
    handleOutClick,
    createEmployee,
    updateEmployee,
    currentEmployee,
    employeeModal,
  }) => {
    const successMessage = () =>
      toast.success(
        currentEmployee ? 'Staff Member Updated' : 'Staff Member Created'
      );
    const errorMessage = () =>
      toast.error(
        currentEmployee
          ? 'Error Updating Staff Member'
          : 'Error Creating Staff Member'
      );

    const { data } = useGetEmployee(currentEmployee);
    const employee = currentEmployee ? data?.getEmployee : null;

    const [showForm, setShowForm] = useState(false);

    function validate(values) {
      const errors = {};
      if (!values.first_name) {
        errors.first_name = 'Required';
      }

      if (!values.last_name) {
        errors.last_name = 'Required';
      }
      return errors;
    }

    const initialValues = formValues.reduce((formValues, value) => {
      const userFirstVenue = employee
        ? employee.track ?? employee.series
        : undefined;
      const ownership = userFirstVenue
        ? { label: userFirstVenue.name, value: userFirstVenue.id }
        : '';
      const initialValue =
        value === 'ownership'
          ? ownership
          : value === 'employee'
          ? {}
          : employee
          ? employee[value] ?? ''
          : '';
      return {
        ...formValues,
        [value]: initialValue,
      };
    }, {});

    async function handleSubmit(
      values,
      { setFieldError, setSubmitting, setErrors }
    ) {
      setSubmitting(true);

      if (getUserOwnership().isMultiVenueOwner) {
        if (!values.ownership || values.ownership === '') {
          setFieldError('ownership', 'Required');
          createErrorMessage();
          setSubmitting(false);
          return;
        }
      }

      const data = Object.entries(values).reduce((formValues, [key, value]) => {
        return {
          ...formValues,
          ...(value ? { [key]: value } : null),
        };
      }, {});

      const { first_name, last_name, cellphone, email, ownership } = data;

      const place_name = ownership
        ? ownership.label
        : getUserOwnership().firstVenue?.name ?? '';

      const response = employee
        ? await updateEmployee({
            first_name,
            last_name,
            cellphone,
            email,
            user_id: employee.id,
            place_name,
          })
        : await createEmployee({
            first_name,
            last_name,
            cellphone,
            email,
            place_name,
          });

      setSubmitting(false);

      if (!response || response.errors) {
        errorMessage();
        return setErrors(response.errors);
      }
      if (!currentEmployee) {
        employeeModal();
      }

      successMessage();
      handleOutClick();
    }

    return (
      <Drawer
        title={
          currentEmployee
            ? 'Edit Staff Member Details'
            : 'Create New Staff Member'
        }
        isVisible={isVisible}
        handleOutClick={handleOutClick}
      >
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isSubmitting,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                {currentEmployee ? null : (
                  <DrawerPadding border>
                    <Label style={{ color: '#00001f' }}>
                      Enter the mobile number of the staff member you wish to
                      add.
                    </Label>
                    <Label style={{ color: '#00001f' }}>
                      If they are already a Pit Pay App user, their number will
                      autopopulate and their Pit Pay profile will be updated
                      once you select their name and tap to add staff member.
                    </Label>
                    <Label style={{ color: '#00001f' }}>
                      If they are not a Pit Pay App user, you will see a form to
                      add them. Fill out the additional fields as required and
                      tap to add staff member.
                    </Label>
                    <Spacer size={18} />

                    <EmployeeSearch
                      value={values.employee}
                      showForm={(cellphone) => {
                        setFieldValue('cellphone', cellphone);
                        setShowForm(true);
                      }}
                      hideForm={() => setShowForm(false)}
                      setFieldValue={setFieldValue}
                    />
                    {getUserOwnership().isMultiVenueOwner && (
                      <Spacer size={18} />
                    )}
                    <OwnershipInput
                      label="Select a track or series"
                      placeholder="Select a track or series..."
                      value={values.ownership}
                      error={errors.ownership}
                      setFieldValue={setFieldValue}
                    />
                    <Spacer size={18} />
                  </DrawerPadding>
                )}

                {showForm || currentEmployee ? (
                  <>
                    <DrawerPadding border>
                      <Label style={{ color: '#00001f' }}>
                        {currentEmployee
                          ? 'Fill out the form to edit a staff members information'
                          : 'Fill out the form to add a new staff member'}
                      </Label>

                      <Spacer size={18} />
                      <Input
                        id="cellphone"
                        label="Phone Number"
                        placeholder="(123) 456-7890"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.cellphone}
                        error={
                          errors.cellphone &&
                          touched.cellphone &&
                          errors.cellphone
                        }
                      />
                      <Spacer size={18} />
                      <Input
                        id="first_name"
                        label="First Name"
                        placeholder="First Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.first_name}
                        error={
                          errors.first_name &&
                          touched.first_name &&
                          errors.first_name
                        }
                      />
                      <Spacer size={18} />
                      <Input
                        id="last_name"
                        label="Last Name"
                        placeholder="Last Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.last_name}
                        error={
                          errors.last_name &&
                          touched.last_name &&
                          errors.last_name
                        }
                      />
                      <Spacer size={18} />
                      <Input
                        id="email"
                        label="Email"
                        placeholder="name@email.com"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        error={errors.email && touched.email && errors.email}
                      />
                      {getUserOwnership().isMultiVenueOwner && (
                        <Spacer size={18} />
                      )}
                      <OwnershipInput
                        label="Select a track or series"
                        placeholder="Select a track or series..."
                        value={values.ownership}
                        error={errors.ownership}
                        setFieldValue={setFieldValue}
                      />
                    </DrawerPadding>
                  </>
                ) : null}
                <DrawerPadding>
                  <Button type="submit" disabled={isSubmitting} block>
                    {currentEmployee
                      ? 'Update Staff Member'
                      : 'Add Staff Member'}
                  </Button>
                </DrawerPadding>
              </form>
            );
          }}
        </Formik>
      </Drawer>
    );
  }
);
