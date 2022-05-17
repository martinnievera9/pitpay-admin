import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import useTheme from 'hooks/useTheme';

export const InputLabel = styled.label.attrs((props) => ({
  style: props.inlineStyle,
}))`
  color: black;
  font-weight: 500;
  margin-bottom: 6px;
  font-size: 16px;
  display: block;
`;

export const AutoSuggest = ({
  setFieldValue,
  options,
  isMulti,
  isModal,
  closeMenuOnSelect,
  value,
  name,
  onChange,
  onBlur,
  label,
  labelColor,
  customStyles,
  isSearchable,
  ...props
}) => {
  const theme = useTheme();
  const handleChange = (val) => {
    // this is going to call setFieldValue and manually update values.topcis
    onChange(val);
  };

  const handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    if (onBlur) onBlur(true);
  };
  const defaultStyle = {
    dropdownIndicator: (provided) => ({
      ...provided,
      svg: {
        fill: theme.colors.primary,
      },
    }),
    control: (provided) => ({
      ...provided,
      height: 49,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'rgba(0,0,0,0.7)',
    }),
  };

  return (
    <React.Fragment>
      {label && (
        <InputLabel style={labelColor ? { color: labelColor } : null}>
          {label}
        </InputLabel>
      )}
      <Select
        {...props}
        isSearchable={isSearchable}
        options={options}
        isMulti={isMulti}
        onChange={handleChange}
        onBlur={handleBlur}
        closeMenuOnSelect={closeMenuOnSelect}
        value={value}
        styles={
          customStyles ? { ...defaultStyle, ...customStyles } : defaultStyle
        }
        maxMenuHeight={isModal ? 160 : undefined}
        menuPortalTarget={isModal ? document.body : undefined}
      />
    </React.Fragment>
  );
};
