import React from 'react';
import { SearchInput as Search } from 'components/Form/SearchInput';

const SearchInput = ({
  handleChange,
  handleBlur,
  handleKeyPress,
  ...props
}) => {
  return (
    <Search
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
