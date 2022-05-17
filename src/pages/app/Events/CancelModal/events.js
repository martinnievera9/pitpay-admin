import React from 'react';
import { AutoSuggest } from 'components/Form/AutoSuggest';
import GetEvents from '../gql/queries/get-events';

const Events = props => {
  let { data, value, handleChange } = props;
  if (data.loading) return <div />;
  return (
    <div>
      <AutoSuggest
        name="events"
        placeholder="Choose an existing eventss"
        value={value}
        onChange={handleChange}
        onBlur={value => {
          //         }}
        closeMenuOnSelect
        options={data.getEvents.map(item => ({
          value: item.id,
          label: item.name
        }))}
      />
    </div>
  );
};

export default GetEvents(Events);
