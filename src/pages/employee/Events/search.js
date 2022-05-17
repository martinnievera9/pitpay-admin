import React from 'react';
import { Input } from 'components/Form/Input';

const SearchInput = ({
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
        backgroundColor: '#00001F',
        borderColor: 'transparent',
        height: 60,
        color: '#B7B7BB',
        fontSize: 18
      }}
      {...props}
    />
  );
};

export default SearchInput;
