import React, { useContext } from 'react';
import MediaQuery from 'react-responsive';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import Images from 'images';
import { AppContext } from 'shared/AppContext';

const LogoTicketHoss = styled.img`
  width: 417px;
  height: 160px;
  margin: 0 auto 30px auto;
`;
const Logo = styled.img`
  width: 217px;
  height: 82px;
  margin: 0 auto 30px auto;
`;

const BackgroundContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const AuthContainer = styled.div`
  background-color: #fff;
  width: 592px;
  border-radius: 5px;
  margin: 140px auto 0 auto;
  display: flex;
  flex-direction: column;
  padding: 50px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    background-color: transparent;
  }
`;
const MobileAuthContainer = styled.div`
  background-color: #fff;
  width: 100%;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 4%;
  box-sizing: border-box;
  overflow: hidden;
  justify-content: center;
`;
const LogoSpacer = styled.div`
  text-align: center;
  margin: 60px 0;
`;

const getBackgroundColor = ({ theme }) => {
  return 'tickethoss' === process.env.REACT_APP_PLATFORM
    ? 'light' === theme
      ? '#fa4616'
      : '#00001f'
    : 'white';
};

const AdminLayout = ({ children }) => {
  const { pathname } = useLocation();
  const { state } = useContext(AppContext);
  const isPromoter = pathname.includes('/promoter-signup');

  return (
    <BackgroundContainer>
      <MediaQuery query="(min-width: 768px)">
        <AuthContainer
          style={{
            position: 'relative',
            backgroundColor:
              'tickethoss' === process.env.REACT_APP_PLATFORM
                ? '#fa4616'
                : 'white',
          }}
        >
          {'tickethoss' !== process.env.REACT_APP_PLATFORM ? (
            <Logo
              src={
                'pitpay' === process.env.REACT_APP_PLATFORM
                  ? Images.logoHorizontalOrange
                  : Images.logoKartPassHorizontal
              }
              width={250}
            />
          ) : isPromoter ? (
            <></>
          ) : (
            <LogoTicketHoss src={Images.logoTickethossHorizontal} />
          )}
          {children}
        </AuthContainer>
      </MediaQuery>
      <MediaQuery query="(max-width: 768px)">
        {'tickethoss' === process.env.REACT_APP_PLATFORM ? (
          <MobileAuthContainer
            style={{
              position: 'relative',
              backgroundColor: getBackgroundColor(state),
            }}
          >
            {isPromoter ? (
              <></>
            ) : (
              <LogoSpacer>
                <Logo
                  style={{ width: '275px', height: '100%' }}
                  src={Images.logoTickethossHorizontal}
                />
              </LogoSpacer>
            )}

            {children}
          </MobileAuthContainer>
        ) : 'pitpay' === process.env.REACT_APP_PLATFORM ? (
          <>
            <LogoSpacer>
              <Logo src={Images.logoHorizontalWhite} />
            </LogoSpacer>
            {children}
          </>
        ) : (
          <>
            <LogoSpacer>
              <Logo style={{}} src={Images.logoKart} />
            </LogoSpacer>
            {children}
          </>
        )}
      </MediaQuery>
    </BackgroundContainer>
  );
};

export default AdminLayout;
