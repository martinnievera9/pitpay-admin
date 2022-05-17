import React from 'react';
import { useGetEventsAdmin } from 'components/Events';
import { AsyncAutoSuggest } from 'components/Form/AutoSuggest';

export const EventsAutoSuggest = ({ onChange }) => {
  const { data } = useGetEventsAdmin();
  if (!data.searchEvents) return false;

  return (
    <AsyncAutoSuggest
      data={data}
      prepareVariables={(inputValue) => ({ queryString: inputValue })}
      characterCount={4}
      isModal
      NoFoundText={'No events found'}
      onChange={onChange}
      queryKey="searchEvents"
      option={(item) => ({
        label: item.name,
        value: item.id,
        tickets: [
          ...item?.admin_tickets,
          ...item?.admin_other_tickets,
          ...item?.admin_multiday_tickets,
        ],
      })}
    />
  );
};
