import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Input } from 'components/Form/Input';
import Icon from 'components/Icon';
import Text from 'components/Text';
import useTheme from 'hooks/useTheme';

const DefaultRemoveButton = styled.button`
  background: transparent;
  border: none;
  font-size: ${(props) => props.theme.fonts.label.fontSize}px;
  margin-left: auto;
`;

const FieldsRepeater = ({
  children,
  fields,
  setFields,
  removeButton,
  addButton,
  label,
}) => {
  const theme = useTheme();

  const RemoveButton = removeButton ?? (
    <DefaultRemoveButton type="button">
      Remove
      <Icon icon="close" size={14} color={theme.colors.primary} />
    </DefaultRemoveButton>
  );

  const addFields = () => setFields([...fields, {}]);

  const removeFields = (index) => {
    setFields(fields.filter((_, fieldIndex) => fieldIndex !== index));
  };

  const changeField = ({ name, index, value }) => {
    setFields(
      fields.map((field, fieldIndex) =>
        fieldIndex === index ? { ...field, [name]: value } : field
      )
    );
  };

  const renderField = ({ field, child, index }) => {
    const indexedName = `${child.props.name}.${index}`;
    return React.cloneElement(child, {
      index,
      id: `${child.props.id}.${index}`,
      name: indexedName,
      value: field[child.props.name] ?? '',
      onChange: (_, value) => {
        changeField({ name: child.props.name, index, value });
      },
    });
  };

  return (
    <div>
      <Text type="label" color="#000">
        {label}
      </Text>
      <div style={{ marginTop: 5 }}>
        {fields.map((field, index) => (
          <Fragment key={index}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                marginBottom: 5,
              }}
            >
              {React.cloneElement(RemoveButton, {
                onClick: () => removeFields(index),
              })}
            </div>
            {React.Children.map(children, (child) => (
              <div style={{ marginBottom: 10 }}>
                {renderField({ field, child, index })}
              </div>
            ))}
          </Fragment>
        ))}
      </div>

      {React.cloneElement(addButton, {
        onClick: addFields,
      })}
    </div>
  );
};

export const RepeatableTextInput = (props) => (
  <Input
    {...props}
    value={props.value || ''}
    onChange={(event) => props.onChange(props.name, event.target.value)}
  />
);

export default FieldsRepeater;
