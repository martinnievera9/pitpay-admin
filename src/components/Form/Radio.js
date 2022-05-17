import React from 'react';
import {
  Wrapper,
  Item,
  RadioButton,
  RadioButtonLabel,
  LabelRow,
  LabelText
} from './radioStyles';

export const Radio = ({ name, value, options, onChange, title }) => {
  return (
    <Wrapper>
      {title ? (
        <LabelText style={{ marginBottom: 20 }}>{title}</LabelText>
      ) : null}
      {options.map(item => (
        <Item key={item.value}>
          <LabelRow>
            <RadioButton
              key={item.value}
              type="radio"
              name={name}
              value={item.value}
              checked={value === item.value}
              onChange={event => onChange(event)}
            />
            <RadioButtonLabel />

            <LabelText>{item.label}</LabelText>
          </LabelRow>
        </Item>
      ))}
    </Wrapper>
  );
};
