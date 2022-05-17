import React, { useState, useContext } from 'react';
import ReactInputVerificationCode from 'react-input-verification-code';
import { Input } from 'components/Form/Input';
import Spacer from 'components/Spacer';
import useTheme from 'hooks/useTheme';
import Images from 'images';
import { AppContext } from 'shared/AppContext';
import storage from 'shared/storage';
import 'react-phone-number-input/style.css';
import './../../../index.css';
import VerifyCode from '../gql/verify-code';
import HelpLink from './components/HavingTrouble';
import { Logo } from './index';

const StepTwo = ({
  verifyCode,
  phoneNumber,
  setPhoneNumber,
  setStep,
  setShowConfirmation,
}) => {
  const theme = useTheme();
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState([]);
  const { dispatch } = useContext(AppContext);

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
          marginBottom: 20,
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
            fontWeight: '500',
            color: '#ccccd2',
            fontFamily: 'Barlow Condensed',
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
              border: '1px solid #6c6c79',
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
                const result = await verifyCode(e);

                if (!result.errors) {
                  if (result?.data?.verifyCode) {
                    storage.set('user', result.data.verifyCode);
                    dispatch({
                      type: 'SET_THEME',
                      theme: 'dark',
                    });
                    setStep('CreateAccount');
                  } else {
                    dispatch({
                      type: 'SET_THEME',
                      theme: 'dark',
                    });
                    setStep('CreateUser');
                  }
                } else {
                  setError(result.errors.code);
                }
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
              color: theme.colors.error,
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

      <Spacer size={50} />
      <HelpLink />
    </>
  );
};

export default VerifyCode(StepTwo);
