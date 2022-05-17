import React from 'react';
import Icon from '../Icon';
import {
  Wrapper,
  DownArrowIcon,
  InputLabel,
  SelectInput
} from './selectStyles';
import { Description, ErrorText } from './styles';

import useTheme from 'hooks/useTheme';

export const Select = ({
  className,
  label,
  description,
  error,
  options,
  value,
  placeholder,
  variant,
  backgroundColor,
  ...props
}) => {
  const theme = useTheme();

  return (
    <Wrapper className={className} variant={variant}>
      {label && <InputLabel>{label}</InputLabel>}
      <div style={{ position: 'relative' }}>
        <DownArrowIcon>
          <Icon
            icon={variant === 'minimal' ? 'chevron' : 'circle-arrow'}
            color={theme.colors.primary}
            size={variant === 'minimal' ? 12 : 15}
          />
        </DownArrowIcon>
        <SelectInput inlineStyle={backgroundColor ? {'backgroundColor':backgroundColor} : {'backgroundColor': 'white'}} error={error} {...props} value={value} variant={variant}>
          {placeholder ? <option value={null}>{placeholder}</option> : null}
          {options.map((item, index) => (
            <option
              key={item.value || index}
              disabled={item.value === '' ? true : false}
              value={item.value}
            >
              {item.label}
            </option>
          ))}
        </SelectInput>
      </div>
      {error && <ErrorText fontSize={props.fontSize}>{error}</ErrorText>}
      {description && <Description>{description}</Description>}
      {}
    </Wrapper>
  );
};

export const SelectInputThatIsRepeatable = props => (
  <Select
    {...props}
    onChange={e => props.onChange(props.name, e.target.value)}
  />
);
