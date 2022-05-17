import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { useUpdateEventColor } from './gql';

const Wrapper = styled.span`
  & .ready-status-select__control {
    border: 1px solid transparent;
    flex-wrap: nowrap;
    justify-content: flex-start;
    min-height: auto;
    &:hover {
      background-color: ${(props) => props.theme.colors.gray['200']};
      border-color: transparent;
    }
  }
  & .ready-status-select__control--is-focused {
    border-color: ${(props) => props.theme.colors.gray['200']};
    box-shadow: none;
  }
`;

const options = [
  { label: '🔴', value: 'red' },
  { label: '🟡', value: 'yellow' },
  { label: '🟢', value: 'green' },
];

export const EventStatusColorSelect = (props) => {
  const { eventId, statusColor } = props;
  const updateEventColor = useUpdateEventColor();
  const currentValue = options.find((option) => option.value === statusColor);
  return (
    <Wrapper>
      <Select
        id="ready_status"
        classNamePrefix="ready-status-select"
        isSearchable={false}
        menuPortalTarget={document.body}
        options={options}
        placeholder="⚪️"
        onChange={({ value }) => {
          if (value !== currentValue?.value) {
            void updateEventColor(eventId, value);
          }
        }}
        value={currentValue}
        styles={{
          valueContainer: (provided) => ({
            ...provided,
            flex: 'auto',
            justifyContents: 'center',
            height: '1.5rem',
            width: '1.5rem',
            padding: 0,
            margin: 0,
            marginRight: 8,
          }),
          placeholder: (provided) => ({
            ...provided,
            marginRight: 0,
            maxWidth: 'none',
            overflow: 'visible',
            paddingRight: 8,
            textAlign: 'right',
            width: '100%',
          }),
          singleValue: (provided) => ({
            ...provided,
            marginRight: 0,
            maxWidth: 'none',
            overflow: 'visible',
            paddingRight: 8,
            textAlign: 'right',
            width: '100%',
          }),
          indicatorSeparator: (provided) => ({
            ...provided,
            width: 0,
          }),
          dropdownIndicator: (provided) => ({
            ...provided,
            padding: 'none',
          }),
        }}
      />
    </Wrapper>
  );
};
EventStatusColorSelect.propTypes = {
  eventId: PropTypes.number.isRequired,
  statusColor: PropTypes.oneOf(['red', 'yellow', 'green']),
};
