import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input/input';
import styled from 'styled-components';
import { Button } from 'components/Button';
import { Input } from 'components/Form/Input';
import Spacer from 'components/Spacer';
import 'react-phone-number-input/style.css';
import './../../../index.css';
import useViewport from 'hooks/useViewport';
import storage from 'shared/storage';
import CreateAccount from '../gql/create-account';
import HelpLink from './components/HavingTrouble';

export const Logo = styled.img`
  width: 25px;
  height: 25px;
  margin: 5px;
  cursor: pointer;
  align-self: center;
`;

const AccountForm = ({
  createAccount,
  phoneNumber,
  setStep,
  phoneInputRef,
}) => {
  const [signupValues, setSignupValues] = useState({
    business_dba: '',
    legal_name: '',
    primary_contact: '',
    email: '',
    title: '',
    phone: phoneNumber,
    calling_code: '1',
    country_code: 'US',
  });

  const { width } = useViewport();
  const [errors, setErrors] = useState({});

  return (
    <>
      <div
        style={{
          backgroundColor: '#00001d',
          padding: 16,
          width: '100%',
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
          Business Details
        </span>
        <Input
          id="business_dba"
          placeholder="Track or Series Name"
          fontSize={22}
          fontWeight="500"
          onChange={(e) => {
            setSignupValues({
              ...signupValues,
              business_dba: e.target.value,
            });
          }}
          value={signupValues.business_dba}
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
          id="legal_name"
          placeholder="Legal Business Entity Name"
          fontSize={22}
          fontWeight="500"
          onChange={(e) => {
            setSignupValues({
              ...signupValues,
              legal_name: e.target.value,
            });
          }}
          value={signupValues.legal_name}
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
          id="primary_contact"
          placeholder="Primary Contact"
          fontSize={22}
          fontWeight="500"
          onChange={(e) => {
            setSignupValues({
              ...signupValues,
              primary_contact: e.target.value,
            });
          }}
          value={signupValues.primary_contact}
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
          placeholder="Financial Email (Stripe)"
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
          id="title"
          placeholder="Title"
          fontSize={22}
          fontWeight="500"
          onChange={(e) => {
            setSignupValues({
              ...signupValues,
              title: e.target.value,
            });
          }}
          value={signupValues.title}
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
        <PhoneInput
          placeholder="Phone Number"
          ref={phoneInputRef}
          style={{
            border: '1px solid #6c6c79',
            marginTop: 10,
            backgroundColor: '#00001d',
            color: 'white',
            padding: 10,
            borderRadius: 6,
            outline: 'none',
            fontFamily: 'Barlow Condensed',
            fontSize: 22,
            width: '94%',
          }}
          country="US"
          onChange={(e) => {
            setSignupValues({
              ...signupValues,
              phone: e,
            });
          }}
          value={phoneNumber}
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

          const result = await createAccount({
            ...signupValues,
          });

          if (result?.data?.createAccount) {
            storage.set('account', result.data.createAccount);
            setStep('TrackAddress');
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

export default CreateAccount(AccountForm);
