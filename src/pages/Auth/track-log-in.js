import React, { Fragment /* useState */ } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import MediaQuery from 'react-responsive';
import Login from './gql/login';
import storage from 'shared/storage';
import Anchor from 'components/Anchor';
import { Button } from 'components/Button';
import { Input } from 'components/Form/Input';
import Spacer from 'components/Spacer';

const MobileForm = styled.form`
  padding: 20px;
`;

const TrackLogIn = props => {
  // const [loggedIn, setLoggedIn] = useState(false);
  if (storage.get('user')) {
    props.history.push({
      pathname: '/stripe',
      search: '',
      state: {
        email: storage.get('user').email,
        id: storage.get('user').id
      }
    });
  }

  return (
    <Fragment>
      <Spacer size={30} />
      <Formik
        initialValues={{ cellphone: '', password: '' }}
        validate={values => {
          let errors = {};
          if (!values.cellphone) {
            errors.cellphone = 'Required';
          } else if (
            !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(
              values.cellphone
            )
          ) {
            errors.cellphone = 'Invalid phone number';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          setSubmitting(true);

          let response = await props.login(values);
          setSubmitting(false);

          if (!response || response.errors) {
            setSubmitting(false);
            return setErrors(response.errors);
          } else {
            storage.set('user', response.data.login);

            props.history.push({
              pathname: '/stripe',
              search: '',
              state: {
                email: response.data.login.email,
                id: response.data.login.id
              }
            });

            setSubmitting(false);
            // return setLoggedIn(true);
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
          touched
        }) => (
          <Fragment>
            <MediaQuery query="(min-width: 768px)">
              <form onSubmit={handleSubmit}>
                <Input
                  underlined
                  id="cellphone"
                  placeholder="Phone Number"
                  fontSize={20}
                  fontWeight="500"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.cellphone}
                  error={
                    errors.cellphone && touched.cellphone && errors.cellphone
                  }
                />
                <Spacer size={30} />

                <Input
                  underlined
                  id="password"
                  placeholder="Password"
                  fontSize={20}
                  fontWeight="500"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={errors.password && touched.password && errors.password}
                />

                <Spacer size={16} />
                <Anchor
                  fontSize={20}
                  textAlign="center"
                  fontWeight="500"
                  to="/forgot-password"
                >
                  Forgot Password
                </Anchor>
                <Spacer size={50} />
                <Button type="submit" disabled={isSubmitting} block>
                  Login
                </Button>
              </form>
            </MediaQuery>

            <MediaQuery query="(max-width: 768px)">
              <MobileForm onSubmit={handleSubmit}>
                <Input
                  underlined
                  id="cellphone"
                  placeholder="Phone Number"
                  fontSize={20}
                  fontWeight="500"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.cellphone}
                  style={{ backgroundColor: 'transparent', color: 'white' }}
                  error={
                    errors.cellphone && touched.cellphone && errors.cellphone
                  }
                />
                <Spacer size={30} />

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
                  style={{ backgroundColor: 'transparent', color: 'white' }}
                  error={errors.password && touched.password && errors.password}
                />

                <Spacer size={16} />
                <Anchor
                  fontSize={20}
                  textAlign="center"
                  fontWeight="500"
                  to="/forgot-password"
                >
                  Forgot Password
                </Anchor>
                <Spacer size={50} />
                <Button type="submit" disabled={isSubmitting} block>
                  Login
                </Button>
              </MobileForm>
            </MediaQuery>
          </Fragment>
        )}
      </Formik>
    </Fragment>
  );
};

export default Login(TrackLogIn);
