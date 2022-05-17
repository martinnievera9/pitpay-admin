import React, { useState } from 'react';
import PhoneInput, { getCountryCallingCode } from 'react-phone-number-input';
import { Button } from 'components/Button';
import Spacer from 'components/Spacer';
import 'react-phone-number-input/style.css';
import './../../../index.css';
import storage from 'shared/storage';
import RequestCode from '../gql/request-code';
import HelpLink from './components/HavingTrouble';

const StepOne = ({
  requestCode,
  setPhoneNumber,
  phoneNumber,
  phoneInputRef,
  setStep,
}) => {
  const [phoneNumberFull, setPhoneNumberFull] = useState('');
  const [countryCode, setCountryCode] = useState('1');

  return (
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
        style={{
          textAlign: 'center',
          backgroundColor: '#00001d',
          color: 'white',
          borderColor: '#00001d',
          fontSize: 25,
          borderRadius: 6,
          fontFamily: 'Barlow Condensed',
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
      <Spacer size={16} />
      <Button
        block
        buttonColor={'#00001d'}
        textColor={'#fff'}
        onClick={async () => {
          const result = await requestCode({
            phone: phoneNumber,
            calling_code: countryCode,
          });

          if (result?.data?.requestCode) {
            storage.set('promoter-user-phone', {
              phone: phoneNumber,
              calling_code: countryCode,
            });
            setStep('StepTwo');
          }
        }}
        buttonStyle={{}}
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

export default RequestCode(StepOne);
