import React from 'react';
import { AutoSuggest } from 'components/Form/AutoSuggest';
import { Label } from '../CancelModal/style';
import moment from 'moment';

export const ChooseDate = ({ state, onChange }) => {
  return (
    <div>
      <Label style={{ marginTop: 20, marginBottom: 20 }}>
        Which day do you want to postpone?
      </Label>

      <AutoSuggest
        name="events"
        isSearchable={false}
        placeholder="Choose a date"
        value={state.date}
        onChange={value => onChange(value.value)}
        closeMenuOnSelect
        options={state.event.eventDates.map(item => ({
          value: item,
          label: moment(item).format('ddd, MMM DD, YYYY')
        }))}
      />
    </div>
  );
};
