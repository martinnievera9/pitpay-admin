import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'components/Button';
import { Input } from 'components/Form/Input';
import Spacer from 'components/Spacer';
import 'react-phone-number-input/style.css';
import './../../../index.css';
import useViewport from 'hooks/useViewport';
import storage from 'shared/storage';
import AddAddress from '../gql/add-address';
import HelpLink from './components/HavingTrouble';

export const Logo = styled.img`
  width: 25px;
  height: 25px;
  margin: 5px;
  cursor: pointer;
  align-self: center;
`;

const validateForm = (values) => {
  return Object.keys(values).reduce((acc, key) => {
    if (!acc) {
      return acc;
    }
    if (!values[key] && key !== 'address_line_2') {
      return false;
    }
    return acc;
  }, true);
};

const TrackAddressForm = ({ addAddress, setStep }) => {
  const [signupValues, setSignupValues] = useState({
    name: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    zipcode: '',
  });
  const [errors, setErrors] = useState({});
  const { width } = useViewport();

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
          Track Address
        </span>
        <Input
          id="name"
          placeholder="Name"
          fontSize={22}
          fontWeight="500"
          onChange={(e) => {
            setSignupValues({
              ...signupValues,
              name: e.target.value,
            });
          }}
          value={signupValues.name}
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
          id="address_line_1"
          placeholder="Street*"
          fontSize={22}
          fontWeight="500"
          onChange={(e) => {
            setSignupValues({
              ...signupValues,
              address_line_1: e.target.value,
            });
          }}
          value={signupValues.address_line_1}
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
          id="address_line_2"
          placeholder="Street"
          fontSize={22}
          fontWeight="500"
          onChange={(e) => {
            setSignupValues({
              ...signupValues,
              address_line_2: e.target.value,
            });
          }}
          value={signupValues.address_line_2}
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
          id="city"
          placeholder="City*"
          fontSize={22}
          fontWeight="500"
          onChange={(e) => {
            setSignupValues({ ...signupValues, city: e.target.value });
          }}
          value={signupValues.city}
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
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Input
            id="state"
            placeholder="State / Province*"
            fontSize={22}
            fontWeight="500"
            onChange={(e) => {
              setSignupValues({
                ...signupValues,
                state: e.target.value,
              });
            }}
            value={signupValues.state}
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
              width: '95%',
              display: 'flex',
              // marginRight: '4px',
            }}
            errorColor={'darkmagenta'}
          />
          <Input
            id="zipcode"
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
              width: '95%',
              display: 'flex',
            }}
            errorColor={'darkmagenta'}
          />
        </div>
      </div>

      <Spacer size={16} />
      <Button
        block
        small={true}
        buttonColor={
          validateForm(signupValues)
            ? 768 > width
              ? '#fa4616'
              : '#00001d'
            : '#6c6c79'
        }
        textColor={'#fff'}
        onClick={async () => {
          if (!validateForm(signupValues)) {
            return;
          }

          const account = storage.get('account');

          const result = await addAddress({
            ...signupValues,
            type: 'track',
            account_id: account.id,
          });

          if (result?.data?.addAddress) {
            storage.set('account', { ...account, trackAddress: signupValues });
            setStep('ShippingAddress');
          } else {
            setErrors(result.errors);
          }
        }}
        buttonStyle={{
          width: '65%',
          alignSelf: 'center',
          backgroundColor: 768 < width ? '#fa4616' : '#00001d',
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

export default AddAddress(TrackAddressForm);
