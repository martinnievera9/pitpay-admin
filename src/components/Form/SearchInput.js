import React from 'react';
import { Input } from 'components/Form/Input';

export const SearchInput = ({
  handleChange,
  handleBlur,
  handleKeyPress,
  ...props
}) => {
  return (
    <Input
      name="search"
      icon="search"
      onChange={handleChange}
      value={''}
      onBlur={handleBlur}
      onKeyDown={handleKeyPress}
      inputStyle={{
        backgroundColor: '#F6F6F6',
        borderColor: 'transparent',
        height: 36,
        fontFamily: 'Roboto'
      }}
      {...props}
    />
  );
};
