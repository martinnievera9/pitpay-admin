import { Formik } from 'formik';
import qs from 'qs';
import React, { Fragment } from 'react';
import MediaQuery from 'react-responsive';
import styled from 'styled-components';
import { Button } from 'components/Button';
import { Input } from 'components/Form/Input';
import { ErrorText } from 'components/Form/styles';
import Spacer from 'components/Spacer';
import storage from 'shared/storage';
import ChangePassword from '../../employee/SetPassword/gql/mutations/change-password';

const Title = styled.p`
  color: #fff;
  font-weight: 600;
  font-family: 'Barlow Condensed';
  text-align: left;
  font-size: 24px;
  line-height: 29px;

  @media (min-width: 768px) {
    color: rgb(0, 0, 51);
  }
`;

const Label = styled.p`
  margin-bottom: 20px;
  color: #fff;
  font-weight: 600;
  font-family: 'Barlow Condensed';
  text-align: left;
  font-size: 22px;
  line-height: 29px;

  @media (min-width: 768px) {
    color: rgb(0, 0, 51);
  }
`;

const Text = styled.p`
  margin-bottom: 20px;
  color: #fff;
  text-align: left;
  font-size: 16px;
  line-height: 29px;

  @media (min-width: 768px) {
    color: rgb(0, 0, 51);
  }
`;

const MobileForm = styled.form`
  padding: 20px;
`;

export const SetTrackPassword = ChangePassword((props) => {
  const { changePassword, history } = props;
  const token = qs.parse(props.location.search, { ignoreQueryPrefix: true });

  const formValues = ['password'];

  return (
    <Fragment>
      <Spacer size={30} />
      <Formik
        initialValues={formValues}
        validate={(values) => {
          const errors = {};
          if (!values.password) {
            errors.password = 'Required';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          setSubmitting(true);

          const response = await changePassword({
            password: values.password,
            code: token.token,
          });

          setSubmitting(false);

          if (!response || response.errors) {
            return setErrors(response.errors);
          }

          if (response.data.changePassword) {
            storage.set('user', response.data.changePassword);

            history.push({
              pathname: '/stripe',
              search: '',
              state: {
                email: response.data.changePassword.email,
                id: response.data.changePassword.id,
              },
            });
          }
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Fragment>
            <MediaQuery query="(min-width: 768px)">
              <form onSubmit={handleSubmit}>
                {errors.code && (
                  <ErrorText fontSize={16} style={{ marginBottom: 20 }}>
                    {errors.code}
                  </ErrorText>
                )}
                <Title>Welcome to Pit Pay!</Title>
                <Text>
                  You are two steps away from taking your events to the next
                  level.
                </Text>
                <Label>Create a Password</Label>
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
                  error={errors.password}
                />

                <Spacer size={16} />
                <Button type="submit" disabled={isSubmitting} block>
                  Next
                </Button>
              </form>
            </MediaQuery>

            <MediaQuery query="(max-width: 768px)">
              <MobileForm onSubmit={handleSubmit}>
                {errors.code && (
                  <ErrorText fontSize={16} style={{ marginBottom: 20 }}>
                    {errors.code}
                  </ErrorText>
                )}
                <Title>Welcome to Pit Pay!</Title>
                <Text>
                  You are two steps away from taking your events to the next
                  level.
                </Text>
                <Label>Create a Password</Label>
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
                  error={errors.password}
                />

                <Spacer size={16} />
                <Button type="submit" disabled={isSubmitting} block>
                  Next
                </Button>
              </MobileForm>
            </MediaQuery>
          </Fragment>
        )}
      </Formik>
    </Fragment>
  );
});
