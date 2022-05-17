import React from 'react';
import { DatePicker } from 'components/Form/DatePicker';
import { Input } from 'components/Form/Input';
import { Select } from 'components/Form/Select';

export const ListInputTypes = {
  TextInput: 'TextInput',
  DatePicker: 'DatePicker',
  ColorPicker: 'ColorPicker'
};

export const FaqListInput = props => {
  const {
    type,
    handleChange,
    setFieldValue,
    placeholder,
    items,
    index,
    setItems
  } = props;
  const test = props.name.split('.');

  const name = test[2];

  try {
    switch (type) {
      case ListInputTypes.TextInput:
        return (
          <Input
            placeholder={placeholder}
            value={items[index][name]}
            onChange={event => {
              const newItems = items.map((item, itemIndex) =>
                itemIndex === props.index
                  ? { ...item, [name]: event.target.value }
                  : item
              );

              setItems([...newItems]);
            }}
          />
        );
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
