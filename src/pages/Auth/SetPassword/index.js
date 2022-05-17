import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import storage from 'shared/storage';
import ChangePassword from './gql/mutations/change-password';
import { Button } from 'components/Button';
import { Input } from 'components/Form/Input';
import Spacer from 'components/Spacer';

const Text = styled.p`
  margin-bottom: 20px;
  color: rgb(0, 0, 51);
  font-weight: 600;
  font-family: 'Barlow Condensed';
  text-align: left;
  font-size: 24px;
  line-height: 29px;
`;

const Wrapper = styled.div`
  background-color: #fff;
  padding: 20px;
  margin: 20px;
  border-radius: 5px;
`;

const SetPassword = props => {
  let { changePassword } = props;

  return (
    <Fragment>
      <Spacer size={30} />
      <Formik
        initialValues={{ password: '' }}
        validate={values => {}}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          setSubmitting(true);

          let response = await changePassword({
            password: values.password,
            code: values.code
          });
          setSubmitting(false);

          if (!response || response.errors) {
            return setErrors(response.errors);
          }

          if (response.data.changePassword) {
            storage.clearUser();
            props.history.push('/');
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
          isSubmitting
          /* and other goodies */
        }) => (
          <Wrapper>
            <form onSubmit={handleSubmit}>
              <Text>Verification code</Text>
              <Input
                underlined
                id="code"
                placeholder="Code"
                fontSize={20}
                fontWeight="500"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.code}
                error={errors.code && touched.code && errors.code}
              />
              <Text>Set your new password</Text>
              <Input
                underlined
                id="password"
                placeholder="Password"
                fontSize={20}
                fontWeight="500"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={errors.password && touched.password && errors.password}
              />

              <Spacer size={16} />
              <Button type="submit" disabled={isSubmitting} block>
                Change Password
              </Button>
            </form>
          </Wrapper>
        )}
      </Formik>
    </Fragment>
  );
};

export default ChangePassword(SetPassword);
