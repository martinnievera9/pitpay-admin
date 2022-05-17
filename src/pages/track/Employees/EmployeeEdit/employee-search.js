import { useFormikContext } from 'formik';
import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import SearchUsers from '../gql/queries/search-users';

const loadOptions = async (
  inputValue,
  callback,
  data,
  showForm,
  setNotFoundText
) => {
  if (inputValue.length === 10) {
    const response = await data.refetch({ query: inputValue });

    if (response.data.searchUsers && response.data.searchUsers.length) {
      const options = response.data.searchUsers.map((item) => ({
        label: `${item.first_name} ${item.last_name}`,
        user_id: item.id,
        first_name: item.first_name,
        last_name: item.last_name,
        cellphone: item.cellphone,
        email: item.email,
      }));
      callback(options);
    } else {
      setNotFoundText();
      showForm(inputValue);
      return callback([]);
    }
  } else {
    setNotFoundText();
    return callback([]);
  }
};

const EmployeeSearch = ({ value, showForm, hideForm, data }) => {
  const { setValues, values } = useFormikContext();
  const [notFoundText, setNotFoundText] = useState(false);
  return (
    <div>
      <AsyncSelect
        value={value}
        isClearable
        cacheOptions
        noOptionsMessage={(_) => {
          if (notFoundText) {
            return 'No match found. Fill out the form to add a new staff member';
          }
        }}
        placeholder="Start Typing..."
        onChange={(selectedOption) => {
          const {
            label = '',
            user_id = '',
            cellphone = '',
            email = '',
            first_name = '',
            last_name = '',
          } = selectedOption ?? {};
          setValues(
            {
              first_name,
              last_name,
              cellphone,
              email,
              ownership: values.ownership ?? '',
              // Strictly for setting the value of the input itself
              employee: selectedOption
                ? {
                    label,
                    value: user_id,
                  }
                : {},
            },
            false
          );
          hideForm();
        }}
        defaultOptions={[]}
        loadOptions={(inputValue, callback) => {
          loadOptions(
            inputValue,
            callback,
            data,
            showForm,
            hideForm,
            setNotFoundText(true)
          );
        }}
      />
    </div>
  );
};

export default SearchUsers(EmployeeSearch);
