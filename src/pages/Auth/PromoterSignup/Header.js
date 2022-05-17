import React from 'react';
import MediaQuery from 'react-responsive';
import styled from 'styled-components';
import Spacer from 'components/Spacer';
import Images from 'images';
import 'react-phone-number-input/style.css';
import './../../../index.css';

const LogoTicketHoss = styled.img`
  width: 417px;
  height: 160px;
`;

const LogoSpacer = styled.div`
  text-align: center;
  margin: 60px 0;
`;

export default ({ isSignup }) => {
  return isSignup ? (
    <>
      <MediaQuery query="(min-width: 768px)">
        <div
          style={{
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <LogoTicketHoss
            style={{
              width: !isSignup ? '150px' : '417px',
              height: !isSignup ? '80px' : '160px',
            }}
            src={Images.logoTickethossHorizontal}
          />
          <span
            style={{
              color: 'white',
              fontSize: !isSignup ? 25 : 50,
              textAlign: 'center',
              display: 'block',
              fontWeight: 'bold',
              alignSelf: 'center',
              fontFamily: 'Barlow Condensed',
              marginBottom: 10,
              width: 175,
            }}
          >
            TRACK <br /> SIGN UP
          </span>
          <Spacer size={30} />
        </div>
      </MediaQuery>
      <MediaQuery query="(max-width: 768px)">
        <div
          style={{
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <LogoSpacer>
            <LogoTicketHoss
              style={{
                width: !isSignup ? '60px' : '180px',
                height: '100%',
              }}
              src={Images.logoTickethossHorizontal}
            />
          </LogoSpacer>
          <span
            style={{
              color: 'white',
              fontSize: !isSignup ? 20 : 35,
              textAlign: 'center',
              display: 'block',
              fontWeight: 'bold',
              alignSelf: 'center',
              fontFamily: 'Barlow Condensed',
              marginBottom: 10,
            }}
          >
            TRACK <br /> SIGN UP
          </span>
          <Spacer size={30} />
        </div>
      </MediaQuery>
    </>
  ) : (
    <></>
  );
};
