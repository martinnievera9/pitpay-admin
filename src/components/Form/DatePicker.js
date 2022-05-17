/* eslint-disable */
import dayjs from 'dayjs';
import React from 'react';
import styled from 'styled-components';
import DatePickerComponent from 'react-datepicker';
import Icon from 'components/Icon';
import useTheme from 'hooks/useTheme';
import { Description, ErrorText as Error } from './styles';
import 'react-datepicker/dist/react-datepicker.css';
import './datePicker.css';
import moment from 'moment';

export const Wrapper = styled.div.attrs((props) => ({
  style: props.inlineStyle,
}))`
  font-size: 14px;
  line-height: 1.3em;
  position: relative;
  border: none;
  box-sizing: border-box;
  width: 100%;
  text-align: start;
  /* z-index:9; */
`;

export const InputLabel = styled.label.attrs((props) => ({
  style: props.inlineStyle,
}))`
  color: black;
  font-weight: 500;
  margin-bottom: 6px;
  font-size: 16px;
  display: block;
  text-align: start;
`;

export const ErrorText = styled(Error).attrs((props) => ({
  style: props.inlineStyle,
}))`
  margin-top: 5px;
  font-size: ${(props) => props.fontSize || 14}px;
  color: ${(props) => props.theme.colors.error};
`;

export const InputText = styled(DatePickerComponent).attrs((props) => ({
  style: props.inlineStyle,
}))`
  outline: 0;
  line-height: normal;
  border-color: ${(props) =>
    props.error ? props.theme.colors.error : '#DCDCDC'};
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  padding: 0.94em 0.8em 0.94em 3em;
  box-sizing: border-box;
  background: white;
  word-break: normal;
  overflow-wrap: break-word;
  word-wrap: break-word;
  appearance: none;
  font-size: ${(props) => props.fontSize || 14}px;
  font-weight: ${(props) => props.fontWeight || 400};
  width: 100%;
  z-index: 2;
  margin: 0;
  color: ${(props) => props.theme.colors.secondary};
  min-height: ${(props) => (props.as === 'textarea' ? '120px' : 'auto')};

  &::placeholder {
    color: ${(props) => (props.error ? props.theme.colors.error : '#727279')};
  }

  &:focus {
    box-shadow: 0 0 0 0 ${(props) => props.theme.colors.secondary}BF;
  }
`;

export const DatePicker = ({
  description,
  is_multiday,
  disabled,
  error,
  id,
  isClearable,
  label,
  name,
  onBlur,
  onChange,
  test,
  type,
  value,
  fontSize,
  ...props
}) => {
  const theme = useTheme();

  return (
    <Wrapper>
      {label && <InputLabel>{label}</InputLabel>}
      <div style={{ position: 'relative' }}>
        {'date' === type ? (
          <>
            <InputText
              autoComplete="no"
              disabled={disabled}
              placeholderText="Select Date"
              minDate={new Date()}
              isClearable={isClearable}
              onBlur={onBlur}
              selected={
                value
                  ? dayjs(value, ['MM-DD-YYYY', 'YYYY-MM-DD', 'YYYY']).toDate()
                  : null
              }
              onChange={(value) => {
                onChange(name, value ? moment(value).format('MM-DD-YYYY') : '');
                typeof is_multiday !== 'undefined' && is_multiday === false
                  ? onChange(
                      'end_date',
                      value ? moment(value).format('MM-DD-YYYY') : ''
                    )
                  : '';
              }}
              id={id}
              {...props}
            />
          </>
        ) : (
          <InputText
            autoComplete="no"
            disabled={disabled}
            selected={value}
            onChange={(value) => {
              const result = { target: { value, id } };
              onChange(name, result);
            }}
            showTimeSelect
            showTimeSelectOnly
            dateFormat="h:mm aa"
            timeCaption="Time"
            timeIntervals={5}
            id={id}
            {...props}
          />
        )}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 10,
            height: 20,
            margin: 'auto',
          }}
        >
          <Icon
            icon={type === 'date' ? 'calendar' : 'time'}
            size={15}
            color={theme.colors.primary}
          />
        </div>
      </div>
      {error && <ErrorText fontSize={fontSize}>{error}</ErrorText>}
      {description && <Description>{description}</Description>}
    </Wrapper>
  );
};
