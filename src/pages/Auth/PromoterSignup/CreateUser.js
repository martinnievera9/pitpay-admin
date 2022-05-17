import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'components/Button';
import { Input } from 'components/Form/Input';
import Spacer from 'components/Spacer';
import 'react-phone-number-input/style.css';
import './../../../index.css';
import useViewport from 'hooks/useViewport';
import storage from 'shared/storage';
import Signup from '../gql/signup';
import HelpLink from './components/HavingTrouble';

export const Logo = styled.img`
  width: 25px;
  height: 25px;
  margin: 5px;
  cursor: pointer;
  align-self: center;
`;

const CreateUser = ({ promoterSignup, countryCode, phoneNumber, setStep }) => {
  const [signupValues, setSignupValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    zipcode: '',
  });
  const { width } = useViewport();
  const [errors, setErrors] = useState({});

  return (
    <>
      <div
        style={{
          backgroundColor: '#00001d',
          padding: '16px 16px 26px 16px',
          width: '90%',
          alignSelf: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontSize: 25,
            textAlign: 'left',
            display: 'block',
            color: '#fff',
            fontFamily: 'Barlow Condensed Semi',
            marginBottom: '30px',
            marginTop: '10px',
          }}
        >
          Create Your Account
        </span>
        <Input
          id="first_name"
          placeholder="First Name*"
          fontSize={22}
          fontWeight="500"
          onChange={(e) => {
            setSignupValues({
              ...signupValues,
              first_name: e.target.value,
            });
          }}
          value={signupValues.first_name}
          inputStyle={{
            border: '1px solid #6c6c79',
            backgroundColor: '#00001d',
            color: 'white',
            padding: 10,
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
            outline: 'none',
            fontFamily: 'Barlow Condensed',
          }}
          errorColor={'darkmagenta'}
        />
        <Input
          id="last_name"
          placeholder="Last Name*"
          fontSize={22}
          fontWeight="500"
          onChange={(e) => {
            setSignupValues({
              ...signupValues,
              last_name: e.target.value,
            });
          }}
          value={signupValues.last_name}
          inputStyle={{
            border: '1px solid #6c6c79',
            marginTop: 10,
            backgroundColor: '#00001d',
            color: 'white',
            padding: 10,
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
            outline: 'none',
            fontFamily: 'Barlow Condensed',
          }}
          errorColor={'darkmagenta'}
        />
        <Input
          id="email"
          placeholder="Email Address*"
          fontSize={22}
          fontWeight="500"
          onChange={(e) => {
            setSignupValues({ ...signupValues, email: e.target.value });
          }}
          value={signupValues.email}
          inputStyle={{
            border: '1px solid #6c6c79',
            marginTop: 10,
            backgroundColor: '#00001d',
            color: 'white',
            padding: 10,
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
            outline: 'none',
            fontFamily: 'Barlow Condensed',
          }}
          //   errorColor={'darkmagenta'}
          error={errors.email}
        />
        <Input
          id="zipCode"
          placeholder="Zip Code*"
          fontSize={22}
          fontWeight="500"
          onChange={(e) => {
            setSignupValues({
              ...signupValues,
              zipcode: e.target.value,
            });
          }}
          value={signupValues.zipcode}
          inputStyle={{
            border: '1px solid #6c6c79',
            marginTop: 10,
            backgroundColor: '#00001d',
            color: 'white',
            padding: 10,
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
            outline: 'none',
            fontFamily: 'Barlow Condensed',
          }}
          errorColor={'darkmagenta'}
        />
      </div>

      <Spacer size={16} />
      <Button
        block
        small={true}
        buttonColor={
          !Object.values(signupValues).includes('')
            ? 768 > width
              ? '#fa4616'
              : '#00001d'
            : '#6c6c79'
        }
        textColor={'#fff'}
        onClick={async () => {
          if (Object.values(signupValues).includes('')) {
            return;
          }

          const result = await promoterSignup({
            ...signupValues,
            cellphone: phoneNumber,
            calling_code: countryCode,
            country_code: countryCode,
          });

          if (result?.data?.promoterSignup) {
            storage.set('user', result.data.promoterSignup);
            setStep('CreateAccount');
          } else {
            setErrors(result.errors);
          }
        }}
        buttonStyle={{
          width: '65%',
          alignSelf: 'center',
          backgroundColor: 768 < width ? '#fa4616' : '#00001f',
        }}
        style={{
          fontSize: 30,
          padding: 20,
        }}
      >
        Continue
      </Button>
      <Spacer size={50} />
      <HelpLink />
    </>
  );
};

export default Signup(CreateUser);
