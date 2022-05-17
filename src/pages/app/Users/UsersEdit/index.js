import { Formik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import { compose } from 'recompose';
import styled from 'styled-components';
import { Button } from 'components/Button';
import { Drawer, DrawerPadding } from 'components/Drawer';
import { Checkbox } from 'components/Form/Checkbox';
import { DatePicker } from 'components/Form/DatePicker';
import { Input } from 'components/Form/Input';
import { Select } from 'components/Form/Select';
import Spacer from 'components/Spacer';
import Text from 'components/Text';
import CreateUser from '../gql/mutations/create-user';
import UpdateUser from '../gql/mutations/update-user';
import GetUser from '../gql/queries/get-user';

const DataRow = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const OrphanedNotice = styled.div`
  background-color: red;
  padding: 10px 5px;
  margin-bottom: 18px;
`;

const formValues = [
  'first_name',
  'middle_name',
  'last_name',
  'suffix',
  'role',
  'birthday',
  'expiration',
  'cellphone',
  'email',
  'address',
  'password',
  'inactive',
  'message_center',
  'registrations',
  'memberships',
];

const UserEdit = ({
  isVisible,
  handleOutClick,
  createUser,
  updateUser,
  data,
  currentUser,
}) => {
  const successMessage = () =>
    toast.success(currentUser ? 'User Updated' : 'User Created');
  const errorMessage = (response) =>
    toast.error(
      currentUser
        ? response.global
          ? 'Error Updating User'
          : "There were errors with your submission check the form's field for errors."
        : 'Error Creating User'
    );

  return (
    <Drawer
      title={currentUser ? 'Edit User Details' : 'Create New User'}
      isVisible={isVisible}
      handleOutClick={handleOutClick}
    >
      <Formik
        enableReinitialize={true}
        initialValues={formValues.reduce((acc, value) => {
          if ('password' === value) {
            return acc;
          }

          acc[value] =
            currentUser && data.getUser && data.getUser[value]
              ? data.getUser[value]
              : '';

          return acc;
        }, {})}
        validate={(values) => {
          const errors = {};
          if (!values.first_name) {
            errors.first_name = 'Required';
          }

          if (!values.last_name) {
            errors.last_name = 'Required';
          }

          if (!values.role) {
            errors.role = 'Required';
          }

          if (!values.cellphone) {
            errors.cellphone = 'Required';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          let response;
          setSubmitting(true);

          const data = Object.entries(values).reduce((acc, entry) => {
            acc[entry[0]] = '' === entry[1] ? null : entry[1];
            return acc;
          }, {});

          if (currentUser) {
            response = await updateUser({
              ...data,
              user_id: currentUser,
            });
          } else {
            delete data.inactive;
            response = await createUser(data);
          }

          if (!response || response.errors) {
            errorMessage(response);
            setSubmitting(false);
            return setErrors(response.errors);
          } else {
            successMessage();
            setSubmitting(false);
            handleOutClick();
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <DrawerPadding border>
              {data?.getUser?.is_orphaned ? (
                <OrphanedNotice>
                  <p style={{ color: '#fff' }}>Orphaned Minor</p>
                </OrphanedNotice>
              ) : null}
              <Input
                id="first_name"
                label="First Name"
                placeholder="First Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.first_name}
                error={
                  errors.first_name && touched.middle_name && errors.first_name
                }
              />
              <Spacer size={18} />
              <Input
                id="middle_name"
                name="middle_name"
                label="Middle Name"
                placeholder="Middle Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.middle_name}
                error={
                  errors.middle_name &&
                  touched.middle_name &&
                  errors.middle_name
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
                  errors.last_name && touched.last_name && errors.last_name
                }
              />
              <Spacer size={18} />
              <Input
                id="suffix"
                label="Suffix"
                placeholder="Suffix"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.suffix}
                error={errors.suffix && touched.suffix && errors.suffix}
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
              <Spacer size={18} />
              <Input
                id="address"
                as="textarea"
                label="Address"
                placeholder="Enter your address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                error={errors.address && touched.address && errors.address}
              />
              <Spacer size={18} />
              <Select
                id="role"
                label="User Role"
                placeholder="User Role"
                options={[
                  {
                    label: 'Select User Role...',
                    value: '',
                  },
                  {
                    label: 'App Admin',
                    value: 'admin',
                  },
                  {
                    label: 'Track Admin',
                    value: 'track',
                  },
                  {
                    label: 'Employee',
                    value: 'employee',
                  },
                  {
                    label: 'User',
                    value: 'user',
                  },
                ]}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.role}
                error={errors.role && touched.role && errors.role}
              />
              <Spacer size={18} />
              <DatePicker
                id="birthday"
                label="Birthday"
                type="date"
                name="birthday"
                onChange={setFieldValue}
                value={values.birthday}
                error={errors.birthday && touched.birthday && errors.birthday}
              />
              <Spacer size={18} />
              <DatePicker
                id="expiration"
                label="License Expiration"
                type="date"
                name="expiration"
                onChange={setFieldValue}
                value={values.expiration}
                error={
                  errors.expiration && touched.expiration && errors.expiration
                }
              />
              <Spacer size={18} />
              <Input
                id="cellphone"
                label="Phone Number"
                placeholder="(123) 456-7890"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cellphone}
                error={
                  errors.cellphone && touched.cellphone && errors.cellphone
                }
              />
              <Spacer size={18} />
              <Checkbox
                name="memberships"
                checked={!!values.memberships}
                onChange={(event) => {
                  const value = event.target?.checked;
                  handleChange({
                    target: {
                      name: 'memberships',
                      value,
                    },
                  });
                }}
                onBlur={handleBlur}
                error={
                  errors.memberships &&
                  touched.memberships &&
                  errors.memberships
                }
                rightText="Show Memberships?"
              />
              <Spacer size={18} />
              <Checkbox
                name="message_center"
                checked={!!values.message_center}
                onChange={(event) => {
                  const value = event.target?.checked;
                  handleChange({
                    target: {
                      name: 'message_center',
                      value,
                    },
                  });
                }}
                onBlur={handleBlur}
                error={
                  errors.message_center &&
                  touched.message_center &&
                  errors.message_center
                }
                rightText="Show Message Center?"
              />
              <Spacer size={18} />
              <Checkbox
                name="registrations"
                checked={!!values.registrations}
                onChange={(event) => {
                  const value = event.target?.checked;
                  handleChange({
                    target: {
                      name: 'registrations',
                      value,
                    },
                  });
                }}
                onBlur={handleBlur}
                error={
                  errors.registrations &&
                  touched.registrations &&
                  errors.registrations
                }
                rightText="Show Registrations"
              />
              <Spacer size={18} />
              {currentUser ? null : (
                <Input
                  id="password"
                  label="Password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={errors.password && touched.password && errors.password}
                />
              )}
              {data.getUser &&
              data.getUser.parents &&
              data.getUser.parents.length
                ? data.getUser.parents.map((parent, index) => (
                    <>
                      <DataRow>
                        <Text inlineStyle={{ fontSize: 18, fontWeight: 600 }}>
                          {`Parent #${index + 1}`}
                        </Text>
                      </DataRow>
                      <Spacer size={10} />
                      <DataRow>
                        <Text
                          inlineStyle={{
                            fontSize: 16,
                            fontWeight: 600,
                            marginRight: 10,
                          }}
                        >
                          Name:
                        </Text>
                        <Text
                          inlineStyle={{
                            fontSize: 16,
                            fontWeight: 400,
                            color: '#707273',
                          }}
                        >
                          {` ${parent.first_name} ${parent.last_name}`}
                        </Text>
                      </DataRow>
                      <Spacer size={10} />
                      <DataRow>
                        <Text
                          inlineStyle={{
                            fontSize: 16,
                            fontWeight: 600,
                            marginRight: 10,
                          }}
                        >
                          Phone:
                        </Text>
                        <Text
                          inlineStyle={{
                            fontSize: 16,
                            fontWeight: 400,
                            color: '#707273',
                          }}
                        >
                          {parent.cellphone}
                        </Text>
                      </DataRow>
                      <Spacer size={18} />
                    </>
                  ))
                : null}
              {currentUser && (
                <Select
                  id="inactive"
                  name="inactive"
                  label="User status"
                  placeholder="User status"
                  options={[
                    {
                      label: 'Active',
                      value: 'active',
                    },
                    {
                      label: 'Inactive',
                      value: 'inactive',
                    },
                  ]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.inactive}
                  error={errors.inactive && touched.inactive && errors.inactive}
                />
              )}
            </DrawerPadding>

            <DrawerPadding>
              <Button type="submit" disabled={isSubmitting} block>
                {currentUser ? 'Update User' : 'Create User'}
              </Button>
            </DrawerPadding>
          </form>
        )}
      </Formik>
    </Drawer>
  );
};

export default compose(CreateUser, UpdateUser, GetUser)(UserEdit);
