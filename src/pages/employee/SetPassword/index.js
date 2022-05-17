import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import qs from 'qs';
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

  const token = qs.parse(props.location.search, { ignoreQueryPrefix: true });

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
            code: token.token
          });
          setSubmitting(false);

          if (!response || response.errors) {
            return setErrors(response.errors);
          }

          if (response.data.changePassword) {
            storage.clearUser();
            props.history.push('/');
          }
          // storage.set('user', response.data.login);
          // let { redirect } = qs.parse(window.location.search.substring(1));
          // if (redirect) window.location = redirect;
          // return setLoggedIn(true);
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
            {/* <MediaQuery query="(min-width: 768px)"> */}
            <form onSubmit={handleSubmit}>
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
            {/* </MediaQuery> */}
          </Wrapper>
        )}
      </Formik>
    </Fragment>
  );
};

export default ChangePassword(SetPassword);
