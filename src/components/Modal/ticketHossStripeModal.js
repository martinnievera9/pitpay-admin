import React from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import { Button } from 'components/Button';
import Spacer from 'components/Spacer';
import images from 'images';
import storage from 'shared/storage';
import { Modal, modalPropTypes } from '.';
const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: 'column';
  padding: 20px;

  @media (max-width: 860px) {
    flex-direction: column;
    padding: 40px 20px;
  }
`;
const LogoTicketHoss = styled.img`
  width: 417px;
  height: 160px;
`;

export const TicketHossStripeModal = (props) => {
  const { close, isVisible } = props;
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <Modal
      hideModal={false}
      maxWidth={isMobile ? undefined : 600}
      modalStyle={{ height: 'auto' }}
      noHeader={true}
      isVisible={isVisible}
    >
      <Content style={{ flexDirection: 'column', backgroundColor: '#FE5000' }}>
        <div
          style={{
            backgroundColor: '#00001d',
            padding: 10,
            marginBottom: 10,
            borderRadius: 3,
          }}
        >
          <LogoTicketHoss
            style={{
              width: isMobile ? '150px' : '417px',
              height: isMobile ? '80px' : '160px',
            }}
            src={images.logoTickethossHorizontal}
          />
          <div
            style={{
              color: 'white',
              fontSize: 30,
              display: 'block',
              fontWeight: 'bold',
              alignSelf: 'left',
              fontFamily: 'Barlow Condensed',
              marginBottom: 10,
              textAlign: 'left',
            }}
          >
            To Set Up Your Stripe Payments Account Later :
          </div>

          <div
            style={{
              color: 'white',
              fontSize: 30,
              display: 'block',
              fontWeight: 'bold',
              alignSelf: 'left',
              textAlign: 'left',
              fontFamily: 'Barlow Condensed',
              marginBottom: 10,
            }}
          >
            Log into the Ticket Hoss
            <br />
            Dashboard
            <br />
            {`> dashboard.tickethoss.com`}
            <br />• Click Stripe in the Menu
          </div>
        </div>
        <Button
          buttonColor={'#00001d'}
          textColor={'#fff'}
          onClick={() => close()}
          buttonStyle={{
            width: '65%',
            alignSelf: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
          style={{
            fontSize: 30,
            padding: 20,
          }}
        >
          OK
        </Button>
        <Spacer size={16} />
        <Button
          small={true}
          buttonColor={'#00001d'}
          textColor={'#fff'}
          onClick={() => {
            window.open(
              `https://connect.stripe.com/express/oauth/authorize?redirect_uri=${
                process.env.REACT_APP_FRONT_END_URL
              }/admin-track/stripe&client_id=${
                process.env.REACT_APP_STRIPE_CLIENT_ID
              }&stripe_user[email]=${
                storage.get('user').email
              }&suggested_capabilities[]=tax_reporting_us_1099_misc&tax_reporting_us_1099_k&stripe_user[business_type]=corporation`
            );
            close();
          }}
          buttonStyle={{
            width: '65%',
            alignSelf: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
          style={{
            fontSize: 30,
            padding: 20,
          }}
        >
          Set Up Stripe Now
        </Button>
      </Content>
    </Modal>
  );
};
TicketHossStripeModal.propTypes = {
  ...modalPropTypes,
};
