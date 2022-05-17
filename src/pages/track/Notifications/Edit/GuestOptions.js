import React, { useState } from 'react';
import { AutoSuggest } from 'components/Form/AutoSuggest';
import { Radio } from 'components/Form/Radio';
import Spacer from 'components/Spacer';
import { YearDropdown } from 'components/YearDropdown';

const GuestOptions = ({ setEvent, setYear, events, event }) => {
  const [segment, setSegment] = useState();
  return (
    <>
      <Spacer size={25} />
      <Radio
        label="Who do you want to message?"
        options={[
          {
            label: 'Full Season Guests',
            value: 'yearly',
          },
          {
            label: 'Event Guests',
            value: 'event',
          },
        ]}
        onChange={(val) => {
          setSegment(val.target.value);
        }}
        value={segment}
      />
      {segment ? (
        <>
          <Spacer size={25} />
          <YearDropdown onSelect={(value) => setYear(value)} />
        </>
      ) : null}
      {segment && 'event' === segment ? (
        <>
          <Spacer size={25} />
          <AutoSuggest
            name="event_id"
            label="Event"
            isClearable
            placeholder="Event"
            onChange={(value) => {
              setEvent(value);
            }}
            value={event}
            closeMenuOnSelect
            options={events.map((item) => ({
              value: item.id,
              label: `${item.listDates} — ${item.name}`,
            }))}
          />
        </>
      ) : null}
    </>
  );
};

export default GuestOptions;
