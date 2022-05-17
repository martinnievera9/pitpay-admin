import React, { Fragment, useState } from 'react';
import { withTheme } from 'styled-components';
import ReactCodeInput from 'react-code-input';
import styled, { createGlobalStyle } from 'styled-components';
import MediaQuery from 'react-responsive';

import Anchor from 'components/Anchor';
import { Button } from 'components/Button';
import Icon from 'components/Icon';
import Text from 'components/Text';
import Spacer from 'components/Spacer';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: white!important;
  }
`;

const MainPadding = styled.div`
  @media (max-width: 768px) {
    padding: 20px;
  }
  text-align: center;
`;

const TopBar = styled.div`
  display: none;
  background-color: ${props => props.theme.colors.primary};
  height: 60px;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Auth = props => {
  const [code, setCode] = useState('');

  const checkCode = code => {
    setCode(code);
  };

  const codeProps = {
    inputStyle: {
      fontFamily: 'Roboto',
      margin: '0 7px',
      width: 75,
      fontSize: 28,
      height: 75,
      textAlign: 'center',
      borderRadius: 0,
      backgroundColor: 'transparent',
      color: props.theme.colors.text.dark,
      borderWidth: 0,
      borderBottomWidth: 2,
      borderColor: props.theme.colors.primary,
      borderStyle: 'solid'
    },
    inputStyleInvalid: {
      fontFamily: 'monospace',
      margin: '4px',
      MozAppearance: 'textfield',
      width: '15px',
      borderRadius: '3px',
      fontSize: '14px',
      height: '26px',
      paddingLeft: '7px',
      backgroundColor: 'black',
      color: 'red',
      border: '1px solid red'
    }
  };

  const goBack = () => props.history.goBack();

  return (
    <Fragment>
      <TopBar>
        <div style={{ marginLeft: 20 }} onClick={goBack}>
          <Icon icon="left-arrow" color="white" size={20} />
        </div>
        <Text color="white" fontSize={20}>
          VERIFY ACCOUNT
        </Text>
        <div style={{ marginLeft: 20 }} />
      </TopBar>

      <MainPadding>
        <MediaQuery query="(min-width: 768px)">
          <Text
            textAlign="center"
            fontSize={24}
            lineHeight={30}
            fontWeight="600"
          >
            Verify Your Account
          </Text>
        </MediaQuery>
        <Spacer size={10} />

        <Text textAlign="center" fontSize={20} lineHeight={30} color="light">
          We sent a code to (321) 297-4755
          <br />
          Enter the code below.
        </Text>
        <Spacer size={10} />

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ReactCodeInput
            fields={4}
            onChange={checkCode}
            inputMode="number"
            value={code}
            {...codeProps}
          />
        </div>

        <Spacer size={35} />
        <Button type="submit" block>
          Verify
        </Button>
        <Spacer size={12} />

        <Anchor
          fontSize={20}
          textAlign="center"
          fontWeight="500"
          to="/forgot-password"
        >
          Forgot Password
        </Anchor>
      </MainPadding>

      <MediaQuery query="(max-width: 768px)">
        <GlobalStyle />
      </MediaQuery>
    </Fragment>
  );
};

export default withTheme(Auth);
