import { FieldArray } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { Button } from 'components/Button';
import Icon from 'components/Icon';
import { DatePicker } from 'components/Form/DatePicker';
import { Input } from 'components/Form/Input';
import { Select } from 'components/Form/Select';
import { ErrorText } from 'components/Form/styles';
import Spacer from 'components/Spacer';
import Text from 'components/Text';
import useTheme from 'hooks/useTheme';

const LabelRow = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 5px;
`;

const List = ({
  fields,
  fieldName,
  values,
  handleChange,
  handleBlur,
  setFieldValue,
  label,
  errors,
  touched,
  buttonText
}) => {
  const theme = useTheme();

  const emptyArray = arrayHelpers => {};

  return (
    <FieldArray
      name={fieldName}
      render={arrayHelpers => (
        <div>
          <Text type="label" color="#000">
            {label}
          </Text>
          {errors[fieldName] && (
            <ErrorText fontSize={12}>{errors[fieldName]}</ErrorText>
          )}
          <Spacer size={5} />
          {values &&
            values.length > 0 &&
            values.map((faq, index) => (
              <div key={index}>
                <LabelRow onClick={() => arrayHelpers.remove(index)}>
                  <span>
                    Remove
                    <Icon
                      icon="close"
                      size={14}
                      color={theme.colors.primary}
                      onClick={() => emptyArray(arrayHelpers)}
                    />
                  </span>
                </LabelRow>

                {fields.map(item => (
                  <div key={`${index}.${item.name}`}>
                    {item.label ? (
                      <p
                        style={{
                          color: 'black',
                          fontWeight: 500,
                          marginBottom: 6,
                          fontSize: 16,
                          display: 'block'
                        }}
                      >
                        {item.label}
                      </p>
                    ) : null}

                    <ListInput
                      name={`${fieldName}.${index}.${item.name}`}
                      value={faq[item.name]}
                      placeholder={item.placeholder}
                      onBlur={handleBlur}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                      type={
                        item.hasOwnProperty('type')
                          ? item.type
                          : ListInputTypes.TextInput
                      }
                    />

                    <Spacer size={10} />
                  </div>
                ))}
              </div>
            ))}

          <Button
            type="button"
            onClick={() => arrayHelpers.push('')} // insert an empty string at a position
          >
            {`+ Add Another ${buttonText}`}
          </Button>
        </div>
      )}
    />
  );
};

const ListInputTypes = {
  TextInput: 'TextInput',
  DatePicker: 'DatePicker',
  ColorPicker: 'ColorPicker'
};

const ListInput = props => {
  const { type, handleChange, setFieldValue } = props;

  try {
    switch (type) {
      case ListInputTypes.TextInput:
        return <Input {...props} onChange={handleChange} />;
      case ListInputTypes.DatePicker:
        return (
          <DatePicker
            {...props}
            type={'date'}
            onChange={(name, value) => {
              setFieldValue(name, value);
            }}
          />
        );
      case ListInputTypes.ColorPicker:
        return (
          <Select
            {...props}
            // id="color_code"
            // label="Color Code"
            // name="color_code"
            // placeholder="Select a Color"
            options={[
              { label: 'Red', value: '#FF0000' },
              { label: 'Burgundy', value: '#950700' },
              { label: 'Magenta', value: '#FF0067' },
              { label: 'Black', value: '#000000' },
              { label: 'Gold', value: '#887A13' },
              { label: 'Baby Blue', value: '#00BBFF' },
              { label: 'Sky Blue', value: '#00F5FF' },
              { label: 'Blue', value: '#0034FF' },
              { label: 'Navy Blue', value: '#150067' },
              { label: 'Purple', value: '#580085' },
              { label: 'Light Purple', value: '#A743FF' },
              { label: 'School Bus Yellow', value: '#FCB92A' },
              { label: 'Bright Yellow', value: '#FDFA00' },
              { label: 'Yellow', value: '#FCE603' },
              { label: 'Brown', value: '#501D1D' },
              { label: 'Charcoal', value: '#5F534D' },
              { label: 'Rust Red', value: '#A04010' },
              { label: 'Pit Pay Orange', value: '#fa4616' },
              { label: 'Pit Pay Dark Blue', value: '#00001f' },
              { label: 'Avocado Green', value: '#90A010' },
              { label: 'Green Grass', value: '#00A526' },
              { label: 'Deere Green', value: '#367C2B' },
              { label: 'Lime Green ', value: '#AEFF00' },
              { label: 'Turquoise', value: '#00ADA7' },
              { label: 'Mint Green ', value: '#43EE9E' },
              { label: 'Pink', value: '#FF8BFE' },
              { label: 'Plum Purple', value: '#620961' },
              { label: 'Grey', value: '#A7A6A7' }
            ]}
            onChange={handleChange}
          />
        );
      default:
        return <Input {...props} />;
    }
  } catch (e) {
    console.error(e);
    return <h3> List Component Type with Error! pls check console. </h3>;
  }
};

export default List;
