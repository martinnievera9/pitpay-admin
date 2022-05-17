import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';

const loadOptions = async (
  inputValue,
  callback,
  refetch,
  setNotFoundText,
  characterCount,
  queryKey,
  option,
  prepareVariables
) => {
  if (inputValue.length >= characterCount) {
    let response = await refetch(prepareVariables(inputValue));
    if (
      response &&
      response.data &&
      response.data[queryKey] &&
      response.data[queryKey].length
    ) {
      let options = response.data[queryKey].map(item => option(item));

      callback(options);
    } else {
      setNotFoundText();
      return callback([]);
    }
  } else {
    setNotFoundText();
    return callback([]);
  }
};

export const AsyncAutoSuggest = ({
  value,
  refetch,
  characterCount,
  isModal,
  NoFoundText,
  onChange,
  queryKey,
  option,
  prepareVariables
}) => {
  let [notFoundText, setNotFoundText] = useState(false);
  return (
    <div>
      <AsyncSelect
        value={value}
        isClearable
        cacheOptions
        noOptionsMessage={inputValue => {
          if (notFoundText) {
            return NoFoundText;
          }
        }}
        placeholder="Start Typing..."
        onChange={selectedOption => {
          onChange(selectedOption);
        }}
        defaultOptions={[]}
        maxMenuHeight={isModal ? 160 : undefined}
        menuPortalTarget={isModal ? document.body : undefined}
        loadOptions={(inputValue, callback) => {
          loadOptions(
            inputValue,
            callback,
            refetch,
            () => setNotFoundText(true),
            characterCount,
            queryKey,
            option,
            prepareVariables
          );
        }}
      />
    </div>
  );
};
