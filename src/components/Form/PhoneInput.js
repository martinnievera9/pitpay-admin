import PropTypes from 'prop-types';
import React from 'react';
import 'react-phone-number-input/style.css';
import Input from 'react-phone-number-input';
import styled from 'styled-components';
import { ErrorText, Label } from './styles';

export const Container = styled.div`
  font-size: 14px;
  & .PhoneInput {
    background: ${props => props.theme.colors.white};
    border-color: ${props => props.theme.colors['border-input']};
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    padding: 0.94em 0.8em;
    box-sizing: border-box;
    & .PhoneInputInput {
      border: none;
      color: ${props => props.theme.colors.secondary};
      font-family: Roboto;
      font-size: 14px;
      margin: 0;
      padding: 0;
    }
    &.PhoneInput--focus {
      border-color: ${props => props.theme.colors.primary};
      .PhoneInputInput {
        outline: none;
      }
    }
  }
`;

export const PhoneInput = props => {
  const { className, error, inputClassName, label, ...rest } = props;
  return (
    <Container className={className}>
      {label && <Label>{label}</Label>}
      <Input
        {...rest}
        className={inputClassName}
        addInternationalOption={false}
        defaultCountry="US"
        countryOptionsOrder={['US', 'CA', 'GB', 'MX', 'AU', '|', '...']}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};
PhoneInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
  label: PropTypes.string
};
