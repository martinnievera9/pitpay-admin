import React, { useState } from 'react';
import { PostponeForm } from './PostponeForm';
import { useQuery } from '@apollo/react-hooks';
import { query } from '../gql/queries/get-tickets-by-date';

const handleDate = ({ value, state }) => {
  return {
    ...state,
    different_event: null,
    newTickets: [],
    date: value,
    different_event_date: null
  };
};

const handleDifferentEvent = ({ value, state }) => {
  return {
    ...state,
    different_event: value.different_event,
    newTickets: [],
    date: null,
    tbd: null,
    different_event_date: value.different_event_date,
    same_event_date_to_move_to: null
  };
};

export const PostponeSingleDay = ({
  close,
  event,
  differentEvents,
  onSubmit
}) => {
  let [state, setState] = useState({ event, differentEvents });

  const { data } = useQuery(query, {
    variables: {
      input: {
        event_id: state.event.id,
        date: state.event.eventDates[0]
      }
    }
  });

  return (
    <PostponeForm
      close={close}
      state={state}
      initialTickets={
        data && data.getTicketsByDate ? data.getTicketsByDate : undefined
      }
      onChange={({ name, value }) => {
        let methods = {
          different_event: handleDifferentEvent,
          date: handleDate,
          tbd: ({ value, state }) => ({
            tbd: value,
            event: state.event,
            differentEvents: state.differentEvents
          })
        };

        if (methods[name]) {
          setState(methods[name]({ value, state }));
        } else setState({ ...state, [name]: value });
      }}
      onSubmit={() =>
        onSubmit({
          state,
          initialTickets:
            data && data.getTicketsByDate ? data.getTicketsByDate : undefined
        })
      }
    />
  );
};
