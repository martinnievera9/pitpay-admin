import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import storage from 'shared/storage';
import 'react-phone-number-input/style.css';
import './../../../index.css';
import Header from './Header';
import StepOne from './SignupStepOne';
import StepTwo from './SignupStepTwo';
import AccountSuccess from './AccountSuccess';
import StripeSetup from './StripeSetup';
import CreateUser from './CreateUser';
import CreateAccount from './CreateAccount';
import TrackAddress from './TrackAddress';
import ShippingAddress from './ShippingAddress';
import MailingAddress from './MailingAddress';

export const Logo = styled.img`
  width: 25px;
  height: 25px;
  margin: 5px;
  cursor: pointer;
  align-self: center;
`;

const flow = [
  { component: StepOne, name: 'StepOne' },
  { component: StepTwo, name: 'StepTwo' },
  { component: CreateUser, name: 'CreateUser' },
  { component: CreateAccount, name: 'CreateAccount' },
  { component: AccountSuccess, name: 'AccountSuccess' },
  { component: TrackAddress, name: 'TrackAddress' },
  { component: StripeSetup, name: 'StripeSetup' },
  { component: ShippingAddress, name: 'ShippingAddress' },
  { component: MailingAddress, name: 'MailingAddress' },
];

const PromoterSignup = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const phoneInputRef = useRef();
  const [countryCode, setCountryCode] = useState('1');
  const [account, setAccount] = useState(null);
  const [step, setStep] = useState('StepOne');

  const setCurrentStep = (step) => {
    setStep(step);
    storage.set('current-step', step);
  };

  useEffect(() => {
    if (storage.get('account')) {
      setAccount(storage.get('account'));
    }

    if (storage.get('current-step')) {
      setStep(storage.get('current-step'));
    }

    if (storage.get('promoter-user-phone')) {
      const phone = storage.get('promoter-user-phone');
      setPhoneNumber(String(phone.phone));
      setCountryCode(phone.calling_code);
    }
  }, []);

  const currentComponent = flow.find((flow) => flow.name === step);

  return (
    <>
      <>
        <Header isSignup={'StepOne' === step || 'StepTwo' === step} />
        {React.createElement(currentComponent.component, {
          setPhoneNumber: setPhoneNumber,
          phoneNumber: phoneNumber,
          phoneInputRef: phoneInputRef,
          countryCode: countryCode,
          setStep: setCurrentStep,
          account,
        })}
      </>
    </>
  );
};

export default PromoterSignup;
