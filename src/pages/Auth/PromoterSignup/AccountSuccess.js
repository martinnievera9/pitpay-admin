import React from 'react';
import styled from 'styled-components';
import { Button } from 'components/Button';
import Spacer from 'components/Spacer';
import useViewport from 'hooks/useViewport';
import Images from 'images';
import 'react-phone-number-input/style.css';
import './../../../index.css';
import HelpLink from './components/HavingTrouble';

const LogoTicketHoss = styled.img`
  width: 417px;
  height: 160px;
`;
export const Logo = styled.img`
  width: 25px;
  height: 25px;
  margin: 5px;
  cursor: pointer;
  align-self: center;
`;

export default ({ setStep }) => {
  const { width } = useViewport();

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: width > 768 ? 'row' : 'column',
          justifyContent: 'space-between',
          marginBottom: 20,
          marginTop: width > 768 ? 0 : 20,
        }}
      >
        <span
          style={{
            color: 'white',
            fontSize: width > 768 ? 35 : 40,
            textAlign: 'center',
            display: 'block',
            fontWeight: 'bold',
            alignSelf: 'center',
            fontFamily: 'Barlow Condensed Semi',
            marginBottom: 10,
            order: width > 768 ? 0 : 1,
          }}
        >
          We are thrilled for <br />
          your partnership!
        </span>
        <LogoTicketHoss
          style={{
            width: width > 768 ? '180px' : '150px',
            height: '100%',
            alignSelf: 'center',
            order: width > 768 ? 1 : 0,
          }}
          src={Images.logoTickethossHorizontal}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginBottom: 10,
        }}
      >
        {width > 768 ? (
          <LogoTicketHoss
            style={{
              width: '100px',
              height: '100px',
            }}
            src={Images.digiSign}
          />
        ) : null}

        <span
          style={{
            color: 'white',
            fontSize: width > 768 ? 30 : 22,
            display: 'block',
            fontWeight: 'bold',
            alignSelf: 'center',
            fontFamily: 'Barlow Condensed Semi',
            marginBottom: 10,
          }}
        >
          We’ll Email You the Promoter
          <br />
          Agreement for E-Signing.
          <br />
          <br />
          Keep an eye on your email.
          <br />
          <br />
          Please Allow 1 Business Day.
          <br />
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 20,
        }}
      >
        <Button
          block
          small={true}
          buttonColor={width > 768 ? '#00001d' : '#fa4616'}
          textColor={'#fff'}
          onClick={async () => {
            setStep('StripeSetup');
          }}
          buttonStyle={{
            width: '65%',
            alignSelf: 'center',
            backgroundColor: 768 < width ? '#fa4616' : '#00001f',
          }}
          style={{
            fontSize: 30,
            padding: 20,
            fontFamily: 'Barlow Condensed Semi',
          }}
        >
          Continue
        </Button>
      </div>
      <Spacer size={50} />
      <HelpLink />
    </>
  );
};
