import React, { useState } from 'react';
import { PostponeForm } from './PostponeForm';
import { useLazyQuery } from '@apollo/react-hooks';
import { query } from '../gql/queries/get-tickets-by-date';

const handleStartDate = ({ value, state, runTicketsQuery }) => {
  runTicketsQuery({
    variables: {
      input: {
        event_id: state.event.id,
        date: value
      }
    }
  });

  return {
    event: state.event,
    differentEvents: state.differentEvents,
    start_date: value
  };
};

const handleSameEventDate = ({ value, state }) => {
  return {
    ...state,
    same_event_date_to_move_to: value,
    newTickets: [],
    different_event: null
  };
};

const handleDifferentEvent = ({ value, state }) => {
  return {
    ...state,
    different_event: value.different_event,
    newTickets: [],
    different_event_date: value.different_event_date,
    same_event_date_to_move_to: null
  };
};

export const PostponeMultiday = ({
  close,
  event,
  differentEvents,
  onSubmit,
  setOverflow,
  props
}) => {
  let [state, setState] = useState({ event, differentEvents });

  const [runTicketsQuery, { data }] = useLazyQuery(query, {});

  return (
    <PostponeForm
      props={props}
      setOverflow={setOverflow}
      close={close}
      state={state}
      initialTickets={
        data && data.getTicketsByDate ? data.getTicketsByDate : undefined
      }
      onChange={({ name, value }) => {
        let methods = {
          start_date: handleStartDate,
          different_event: handleDifferentEvent,
          same_event_date_to_move_to: handleSameEventDate
        };

        if (methods[name]) {
          setState(methods[name]({ value, state, runTicketsQuery }));
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
