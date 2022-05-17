import { Formik } from 'formik';
import qs from 'qs';
import React, { useRef, useState } from 'react';
import ReactInputVerificationCode from 'react-input-verification-code';
import PhoneInput, { getCountryCallingCode } from 'react-phone-number-input';
import MediaQuery from 'react-responsive';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Anchor from 'components/Anchor';
import { Button } from 'components/Button';
import { Input } from 'components/Form/Input';
import Spacer from 'components/Spacer';
import Images from 'images';
import storage from 'shared/storage';
import { makeClient } from '../../apollo';
import Login, { REQUEST_CODE, VERIFY_CODE } from './gql/login';
import 'react-phone-number-input/style.css';
import './../../index.css';

const MobileForm = styled.form`
  padding: 20px;
`;
const Logo = styled.img`
  width: 25px;
  height: 25px;
  margin: 5px;
  cursor: pointer;
  align-self: center;
`;
const Auth = (props) => {
  const history = useHistory();
  const defaultRedirect = '/admin/tracks';
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberFull, setPhoneNumberFull] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const phoneInputRef = useRef();
  const [countryCode, setCountryCode] = useState('1');
  const [error, setError] = useState('');

  return (
    <>
      <Spacer size={30} />
      {'tickethoss' === process.env.REACT_APP_PLATFORM ? (
        <>
          <MediaQuery query="(min-width: 768px)">
            {showConfirmation ? (
              <>
                <span
                  style={{
                    color: 'white',
                    fontSize: 20,
                    textAlign: 'center',
                    display: 'block',
                    fontFamily: 'helvetica Neue Bold',
                    marginBottom: 10,
                  }}
                >
                  Enter Verification Code
                </span>

                <div
                  style={{
                    backgroundColor: '#00001d',
                    padding: 6,
                    borderRadius: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: 18,
                      textAlign: 'left',
                      display: 'block',
                      color: '#ccccd2',
                      fontFamily: 'Barlow Condensed Semi',
                      marginBottom: '30px',
                      marginLeft: '5%',
                      marginTop: '10px',
                    }}
                  >
                    An SMS code was sent to
                  </span>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      borderColor: 'white',
                      borderWidth: 2,
                      borderRadius: 8,
                      alignSelf: 'center',
                      width: '90%',
                      marginLeft: '5%',
                      borderStyle: 'solid',
                      marginBottom: '30px',
                    }}
                  >
                    <Input
                      id="cellphone"
                      placeholder="Phone Number"
                      fontSize={35}
                      fontWeight="500"
                      readonly={true}
                      disabled={true}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                      }}
                      value={phoneNumber}
                      inputStyle={{
                        backgroundColor: '#00001d',
                        color: 'white',
                        padding: 10,
                        borderTopLeftRadius: 6,
                        borderTopRightRadius: 6,
                        outline: 'none',
                        borderWidth: 0,
                        fontFamily: 'Barlow Condensed',
                      }}
                      errorColor={'darkmagenta'}
                    />
                    <Logo
                      onClick={() => {
                        setShowConfirmation(false);
                      }}
                      src={Images.pen}
                      width={250}
                    />
                  </div>
                  <div
                    className="verificationContainer"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      backgroundColor: '#00001d',
                      padding: 6,
                      borderBottomLeftRadius: 6,
                      borderBottomRightRadius: 6,
                    }}
                  >
                    <ReactInputVerificationCode
                      length={6}
                      placeholder=""
                      onChange={async (e) => {
                        setVerificationCode(e);
                        if (e.length === 6) {
                          const client = await makeClient();

                          client
                            .mutate({
                              mutation: VERIFY_CODE,

                              variables: {
                                code: e,
                              },
                            })
                            .then((res) => {
                              if (res.data.verifyCode) {
                                if (res.data.verifyCode.role !== 'User') {
                                  storage.set('user', res.data.verifyCode);

                                  history.push(defaultRedirect);
                                } else {
                                  setError(
                                    'You are not authorized to access this site.'
                                  );
                                }
                              }
                            })
                            .catch((error) => console.warn(error));
                        }
                      }}
                      value={verificationCode}
                    />
                  </div>
                  {error.length ? (
                    <span
                      style={{
                        fontSize: 18,
                        textAlign: 'center',
                        display: 'block',
                        fontWeight: '500',
                        color: props.theme.colors.error,
                        fontFamily: 'Barlow Condensed',
                        marginBottom: '30px',
                        marginLeft: '5%',
                        marginTop: '10px',
                      }}
                    >
                      {error}
                    </span>
                  ) : (
                    <></>
                  )}
                </div>

                <Spacer size={16} />
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '18px',
                    textAlign: 'center',
                    width: '100px',
                    fontWeight: 600,
                    color: 'white',
                    display: 'block',
                    fontFamily: 'Barlow Condensed',
                    textDecoration: 'none',
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                  }}
                  href="https://promoters.pitpay.com"
                >
                  Having Trouble ?
                </a>
              </>
            ) : (
              <>
                <span
                  style={{
                    color: 'white',
                    fontSize: 20,
                    textAlign: 'center',
                    display: 'block',
                    fontFamily: 'helvetica Neue Bold',
                    marginBottom: 10,
                  }}
                >
                  Enter Your Mobile Number
                </span>

                <PhoneInput
                  placeholder="___ ___ ____"
                  ref={phoneInputRef}
                  style={{
                    textAlign: 'center',
                    backgroundColor: '#00001d',
                    padding: '0 10px',
                    color: 'white',
                    borderColor: '#00001d',
                    fontSize: 25,
                    borderRadius: 6,
                    fontFamily: 'Barlow Condensed Semi',
                  }}
                  defaultCountry={'US'}
                  onChange={(e) => {
                    if (e) {
                      setPhoneNumberFull(e);
                      setPhoneNumber(e.replace('+' + countryCode, ''));
                    }
                  }}
                  onCountryChange={(e) => {
                    if (e) {
                      setCountryCode(getCountryCallingCode(e));
                    }
                  }}
                  value={phoneNumberFull}
                />
                <span
                  style={{
                    color: 'white',
                    fontSize: 17,
                    textAlign: 'center',
                    display: 'block',
                    fontFamily: 'Barlow Condensed Semi',
                    marginTop: 10,
                  }}
                >
                  You Will Recieve a Verification Code via Text Message
                </span>
                <Spacer size={16} />
                <Button
                  block
                  buttonColor={'#00001d'}
                  textColor={'#fff'}
                  onClick={async () => {
                    const client = await makeClient();

                    client
                      .mutate({
                        mutation: REQUEST_CODE,

                        variables: {
                          input: {
                            phone: phoneNumber,
                            calling_code: countryCode,
                          },
                        },
                      })
                      .then((res) => {
                        if (res.data.requestCode) {
                          setShowConfirmation(true);
                        }
                      });
                  }}
                  buttonStyle={{}}
                  style={{
                    fontSize: 30,
                    padding: 20,
                    fontFamily: 'Barlow Condensed Semi',
                  }}
                >
                  Continue
                </Button>
                <Spacer size={16} />
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '18px',
                    textAlign: 'center',
                    width: '100px',
                    fontWeight: 500,
                    color: 'white',
                    display: 'block',
                    fontFamily: 'Helvetica Neue Bold',
                    textDecoration: 'none',
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                  }}
                  href="https://promoters.pitpay.com"
                >
                  Having Trouble ?
                </a>
              </>
            )}
          </MediaQuery>

          <MediaQuery query="(max-width: 768px)">
            {showConfirmation ? (
              <>
                <span
                  style={{
                    color: 'white',
                    fontSize: 25,
                    textAlign: 'center',
                    display: 'block',
                    fontWeight: 'bold',
                    fontFamily: 'Barlow Condensed',
                    marginBottom: 10,
                  }}
                >
                  Enter Verification Code
                </span>

                <div
                  style={{
                    backgroundColor: '#00001d',
                    padding: 6,
                    borderRadius: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: 18,
                      textAlign: 'left',
                      display: 'block',
                      color: '#ccccd2',
                      fontFamily: 'Barlow Condensed Semi',
                      marginBottom: '30px',
                      marginLeft: '5%',
                      marginTop: '10px',
                    }}
                  >
                    An SMS code was sent to
                  </span>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderColor: 'white',
                        borderWidth: 1,
                        borderRadius: 8,
                        width: '95%',
                        alignSelf: 'center',
                        borderStyle: 'solid',
                      }}
                    >
                      <Input
                        id="cellphone"
                        placeholder="Phone Number"
                        fontSize={35}
                        fontWeight="500"
                        readonly={true}
                        disabled={true}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                        }}
                        value={phoneNumber}
                        inputStyle={{
                          backgroundColor: '#00001d',
                          color: 'white',
                          padding: 10,
                          borderTopLeftRadius: 6,
                          borderTopRightRadius: 6,
                          borderWidth: 0,
                          fontFamily: 'Barlow Condensed',
                        }}
                        errorColor={'darkmagenta'}
                      />
                      <Logo
                        onClick={() => {
                          setShowConfirmation(false);
                        }}
                        src={Images.pen}
                        width={250}
                      />
                    </div>
                  </div>
                  <Spacer size={15} />
                  <div
                    className="verificationContainer"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      backgroundColor: '#00001d',
                      padding: 6,
                      marginBottom: 4,
                      borderBottomLeftRadius: 6,
                      borderBottomRightRadius: 6,
                    }}
                  >
                    <ReactInputVerificationCode
                      length={6}
                      onChange={async (e) => {
                        setVerificationCode(e);
                        if (e[e.length - 1] !== '·') {
                          const client = await makeClient();

                          client
                            .mutate({
                              mutation: VERIFY_CODE,

                              variables: {
                                code: e,
                              },
                            })
                            .then((res) => {
                              if (res.data.verifyCode) {
                                console.log(res.data.verifyCode);
                                if (res.data.verifyCode.role !== 'user') {
                                  storage.set('user', res.data.verifyCode);
                                  history.push(defaultRedirect);
                                } else {
                                  setError(
                                    'You are not authorized to access this site.'
                                  );
                                }
                              }
                            })
                            .catch((error) => console.warn(error));
                        }
                      }}
                      value={verificationCode}
                    />
                  </div>
                  {error.length ? (
                    <span
                      style={{
                        fontSize: 18,
                        textAlign: 'center',
                        display: 'block',
                        fontWeight: '500',
                        color: props.theme.colors.error,
                        fontFamily: 'Barlow Condensed',
                        marginBottom: '30px',
                        marginLeft: '5%',
                        marginTop: '10px',
                      }}
                    >
                      {error}
                    </span>
                  ) : (
                    <></>
                  )}
                </div>

                <Spacer size={16} />
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 22,
                    textAlign: 'right',
                    fontWeight: '600',
                    color: '#fff',
                    display: 'block',
                    fontFamily: 'Barlow Condensed',
                    textDecoration: 'none',
                  }}
                  href="https://promoters.pitpay.com"
                >
                  Having Trouble ?
                </a>
              </>
            ) : (
              <>
                <span
                  style={{
                    color: 'white',
                    fontSize: 25,
                    textAlign: 'center',
                    display: 'block',
                    fontWeight: 'bold',
                    fontFamily: 'Barlow Condensed',
                    marginBottom: 10,
                  }}
                >
                  Enter Your Mobile Number
                </span>

                <PhoneInput
                  placeholder="___ ___ ____"
                  ref={phoneInputRef}
                  size={25}
                  style={{
                    textAlign: 'center',
                    backgroundColor: '#00001d',
                    color: 'white',
                    borderColor: '#00001d',
                    borderRadius: 6,
                    fontFamily: 'Barlow Condensed',
                    fontSize: 25,
                  }}
                  defaultCountry={'US'}
                  onChange={(e) => {
                    if (e) {
                      setPhoneNumberFull(e);
                      setPhoneNumber(e.replace('+' + countryCode, ''));
                    }
                  }}
                  onCountryChange={(e) => {
                    if (e) {
                      setCountryCode(getCountryCallingCode(e));
                    }
                  }}
                  value={phoneNumberFull}
                />
                <span
                  style={{
                    color: 'white',
                    fontSize: 17,
                    textAlign: 'center',
                    display: 'block',
                    fontWeight: 'bold',
                    fontFamily: 'Barlow Condensed',
                    marginTop: 10,
                  }}
                >
                  You Will Recieve a Verification Code via Text Message
                </span>
                <Spacer size={20} />
                <Button
                  block
                  buttonColor={'#00001d'}
                  textColor={'#fff'}
                  onClick={async () => {
                    const client = await makeClient();

                    client
                      .mutate({
                        mutation: REQUEST_CODE,

                        variables: {
                          input: {
                            phone: phoneNumber,
                            calling_code: countryCode,
                          },
                        },
                      })
                      .then((res) => {
                        if (res.data.requestCode) {
                          setShowConfirmation(true);
                        }
                      });
                  }}
                  buttonStyle={{}}
                  style={{
                    fontSize: 30,
                    padding: 20,
                    fontFamily: 'Barlow Condensed',
                  }}
                >
                  Continue
                </Button>
                <Spacer size={16} />
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 22,
                    textAlign: 'right',
                    fontWeight: '600',
                    color: '#fff',
                    display: 'block',
                    textDecoration: 'none',
                    fontFamily: 'Barlow Condensed',
                  }}
                  href="https://promoters.pitpay.com"
                >
                  Having Trouble?
                </a>
              </>
            )}
          </MediaQuery>
        </>
      ) : (
        <Formik
          initialValues={{ cellphone: '', password: '' }}
          validate={(values) => {
            const errors = {};
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

            const response = await props.login(values);
            setSubmitting(false);

            if (!response || response.errors) {
              setSubmitting(false);
              return setErrors(response.errors);
            } else {
              storage.set('user', response.data.login);
              setSubmitting(false);
              const { redirect } = qs.parse(
                window.location.search.substring(1)
              );
              if (redirect) window.location = redirect;
              history.push(defaultRedirect);
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
            touched,
          }) => (
            <>
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
                    error={
                      errors.password && touched.password && errors.password
                    }
                  />

                  <Spacer size={16} />
                  <Anchor
                    fontSize={20}
                    textAlign="center"
                    fontWeight="500"
                    to="/forgot-password"
                    color={
                      'pitpay' === process.env.REACT_APP_PLATFORM
                        ? '#fa4616'
                        : '#00001f'
                    }
                  >
                    Forgot Password
                  </Anchor>
                  <Spacer size={50} />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    block
                    buttonColor={
                      'pitpay' === process.env.REACT_APP_PLATFORM
                        ? '#fa4616'
                        : '#C0FF02'
                    }
                    textColor={
                      'pitpay' === process.env.REACT_APP_PLATFORM
                        ? '#fff'
                        : '#00001f'
                    }
                  >
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
                    error={
                      errors.password && touched.password && errors.password
                    }
                  />

                  <Spacer size={16} />
                  <Anchor
                    fontSize={20}
                    textAlign="center"
                    fontWeight="500"
                    to="/forgot-password"
                    color={
                      'pitpay' === process.env.REACT_APP_PLATFORM
                        ? '#fa4616'
                        : '#C0FF02'
                    }
                  >
                    Forgot Password
                  </Anchor>
                  <Spacer size={50} />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    block
                    buttonColor={
                      'pitpay' === process.env.REACT_APP_PLATFORM
                        ? '#fa4616'
                        : '#C0FF02'
                    }
                    textColor={
                      'pitpay' === process.env.REACT_APP_PLATFORM
                        ? '#fff'
                        : '#00001f'
                    }
                  >
                    Login
                  </Button>
                </MobileForm>
              </MediaQuery>
            </>
          )}
        </Formik>
      )}
    </>
  );
};

export default Login(Auth);
