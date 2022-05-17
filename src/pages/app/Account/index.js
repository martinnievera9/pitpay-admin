import React, { useState } from 'react';
import styled, { withTheme } from 'styled-components';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { compose } from 'recompose';

import Me from './gql/queries/me';
import UpdateSelf from './gql/mutations/update-self';

import { Button } from 'components/Button';
import Spacer from 'components/Spacer';
import Tab from 'components/Tab';
import Text from 'components/Text';
import { Input } from 'components/Form/Input';

const TabContainer = styled.div`
  background-color: white;
  padding: 0 40px;
`;

const Container = styled.div`
  margin: 55px 52px 0 52px;
  width: 400px;
`;

const formValues = [
  'first_name',
  'middle_name',
  'last_name',
  'cellphone',
  'email',
  'address',
  'new_password',
  'old_password'
];

const Account = ({ data, updateSelf }) => {
  const [currentTab, setCurrentTab] = useState(0);

  const successMessage = () => toast.success('Account Updated');
  const errorMessage = () => toast.error('Error Updating Account');

  return data.loading ? (
    <div />
  ) : (
    <div>
      <TabContainer>
        <Tab
          padding={20}
          labels={['ACCOUNT']}
          currentTab={currentTab}
          onChange={tab => setCurrentTab(tab)}
        />
      </TabContainer>
      <Container>
        <Text fontSize={20} fontWeight="500" color="#3C4144">
          Personal Information
        </Text>

        <Formik
          enableReinitialize={true}
          initialValues={formValues.reduce((acc, value) => {
            acc[value] = data.me && data.me[value] ? data.me[value] : '';

            return acc;
          }, {})}
          validate={values => {
            let errors = {};
            // if (!values.email) {
            //   errors.email = "Required";
            // }

            return errors;
          }}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            setSubmitting(true);

            const data = Object.entries(values).reduce((acc, entry) => {
              acc[entry[0]] = '' === entry[1] ? null : entry[1];
              return acc;
            }, {});

            const response = await updateSelf(data);

            setSubmitting(false);

            if (!response || response.errors) {
              errorMessage();
              return setErrors(response.errors);
            }

            successMessage();
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit}>
              <Spacer size={24} />
              <Input
                id="email"
                name="email"
                label="Email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={errors.email && touched.email && errors.email}
              />

              <Spacer size={24} />
              <Input
                id="first_name"
                name="first_name"
                label="Name"
                placeholder="First Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.first_name}
                error={
                  errors.first_name && touched.first_name && errors.first_name
                }
              />
              <Spacer size={10} />
              <Input
                id="middle_name"
                name="middle_name"
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
              <Spacer size={10} />

              <Input
                id="last_name"
                name="last_name"
                placeholder="Last Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.last_name}
                error={
                  errors.last_name && touched.last_name && errors.last_name
                }
              />

              <Spacer size={24} />
              <Input
                id="cellphone"
                name="cellphone"
                label="Phone"
                placeholder="(123) 456-7890"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cellphone}
                error={
                  errors.cellphone && touched.cellphone && errors.cellphone
                }
              />
              <Spacer size={24} />
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
              <Spacer size={24} />
              <Input
                id="old_password"
                name="old_password"
                label="Change Password"
                placeholder="Old Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.old_password}
                error={
                  errors.old_password &&
                  touched.old_password &&
                  errors.old_password
                }
              />
              <Spacer size={10} />
              <Input
                id="new_password"
                name="new_password"
                placeholder="New Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.new_password}
                error={
                  errors.new_password &&
                  touched.new_password &&
                  errors.new_password
                }
              />

              {/* <Text fontSize={20} fontWeight="500" color="#3C4144">
                Anything
              </Text>

              <Spacer size={12} />

              <Checkbox
                name="checkbox1"
                checked={values.checkbox1}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  errors.checkbox1 && touched.checkbox1 && errors.checkbox1
                }
                rightText="Some text here"
              />

              <Spacer size={8} />

              <Checkbox
                name="checkbox2"
                checked={values.checkbox2}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  errors.checkbox2 && touched.checkbox2 && errors.checkbox2
                }
                rightText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
              />

              <Spacer size={40} />

              <Radio
                name="example"
                value={radioSelect}
                options={[
                  { label: 'Lorem ipsum dolor sit amet.', value: 'lorem' },
                  { label: 'Lorem ipsum dolor sit amet.', value: 'ipsum' },
                ]}
                onChange={handleChange}
              /> */}

              <Spacer size={45} />
              <Button type="submit" disabled={isSubmitting} block>
                Save
              </Button>

              <Spacer size={80} />
            </form>
          )}
        </Formik>
      </Container>
    </div>
  );
};

export default withTheme(compose(Me, UpdateSelf)(Account));
