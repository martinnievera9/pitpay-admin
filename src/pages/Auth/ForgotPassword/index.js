import React, { Fragment } from 'react';
import { Formik } from 'formik';
import styled, { createGlobalStyle } from 'styled-components';
import MediaQuery from 'react-responsive';
import ForgotPassword from './gql/forgot-password';
import { Button } from 'components/Button';
import Text from 'components/Text';
import { Input } from 'components/Form/Input';
import Spacer from 'components/Spacer';

const GlobalStyle = createGlobalStyle`
  body {
  }
`;

const MainPadding = styled.div`
  @media (max-width: 768px) {
    padding: 20px;
    background-color: white !important;
    margin: 20px;
    border-radius: 8px;
  }
  text-align: center;
`;

const Auth = props => {
  let { forgotPassword } = props;
  return (
    <Fragment>
      {/* <TopBar>
        <div style={{ marginLeft: 20 }} onClick={goBack}>
          <Icon icon="left-arrow" color="white" size={20} />
        </div>
        <Text color="white" fontSize={20}>
          FORGOT PASSWORD
        </Text>
        <div style={{ marginLeft: 20 }} />
      </TopBar> */}
      <Formik
        initialValues={{ phoneNumber: '' }}
        validate={values => {
          let errors = {};
          if (!values.phoneNumber) {
            errors.phoneNumber = 'Required';
          } else if (
            !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(
              values.phoneNumber
            )
          ) {
            errors.phoneNumber = 'Invalid phone number';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          setSubmitting(true);

          let response = await forgotPassword(values.phoneNumber);
          setSubmitting(false);

          if (!response || response.errors) {
            return setErrors(response.errors);
          }

          if (response.data.forgotPassword) {
            props.history.push('/set-password');
            // return <Redirect to="/set-password" />;
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
        }) => (
          <MainPadding>
            {/* <MediaQuery query="(min-width: 768px)"> */}
            <Text
              textAlign="center"
              fontSize={24}
              lineHeight={30}
              fontWeight="600"
            >
              Forgot Your Password?
            </Text>
            <Spacer size={10} />
            {/* </MediaQuery> */}

            <Text
              textAlign="center"
              fontSize={20}
              lineHeight={30}
              color="light"
            >
              No problem! We will text you a code
              <MediaQuery query="(min-width: 768px)">
                <br />
              </MediaQuery>
              to verify your account.
            </Text>
            <Spacer size={50} />

            <form onSubmit={handleSubmit}>
              <Input
                underlined
                id="phoneNumber"
                placeholder="Phone Number"
                fontSize={20}
                fontWeight="500"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber}
                error={
                  errors.phoneNumber &&
                  touched.phoneNumber &&
                  errors.phoneNumber
                }
              />

              <Spacer size={50} />
              <Button type="submit" disabled={isSubmitting} block>
                Send
              </Button>
            </form>
          </MainPadding>
        )}
      </Formik>
      <MediaQuery query="(max-width: 768px)">
        <GlobalStyle />
      </MediaQuery>
    </Fragment>
  );
};

export default ForgotPassword(Auth);
