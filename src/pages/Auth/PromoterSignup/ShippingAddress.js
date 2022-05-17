import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'components/Button';
import { Checkbox } from 'components/Form/Checkbox';
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

const validateForm = (values, sameAsTrack) => {
  if (sameAsTrack) {
    return true;
  }

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

const getAddressValues = (sameAsTrack, account, signupValues) => {
  if (!sameAsTrack) {
    return signupValues;
  }

  if (!account) {
    const data = storage.get('account');
    return data.trackAddress;
  }

  return account.trackAddress;
};

const TrackAddressForm = ({ addAddress, phoneNumber, setStep }) => {
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
  const [sameAsTrack, setSameAsTrack] = useState(false);
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
          Shipping Address
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '80%',
            marginTop: 10,
            padding: 6,
            borderRadius: 6,
            marginBottom: 10,
          }}
        >
          <Checkbox
            checked={sameAsTrack}
            onChange={() => {
              setSameAsTrack(!sameAsTrack);
            }}
          />

          <div
            style={{
              color: '#6c6c79',
              fontSize: 18,
              display: 'block',
              fontWeight: '500',
              width: '90%',
              alignSelf: 'center',
              fontFamily: 'Barlow Condensed',
              marginLeft: 10,
            }}
          >
            Same As Track Address
          </div>
        </div>
      </div>

      <Spacer size={16} />
      <Button
        block
        small={true}
        buttonColor={
          validateForm(signupValues, sameAsTrack)
            ? 768 > width
              ? '#fa4616'
              : '#00001d'
            : '#6c6c79'
        }
        textColor={'#fff'}
        onClick={async () => {
          if (!validateForm(signupValues, sameAsTrack)) {
            return;
          }

          const account = storage.get('account');

          const data = getAddressValues(sameAsTrack, account, signupValues);

          const result = await addAddress({
            ...data,
            type: 'shipping',
            account_id: account.id,
          });

          if (result?.data?.addAddress) {
            storage.set('account', {
              ...account,
              mailingAddress: data,
            });
            setStep('MailingAddress');
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
