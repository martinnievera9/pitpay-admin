import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import React from 'react';
import gql from 'graphql-tag';
import { AsyncAutoSuggest } from 'components/Form/AutoSuggest';

const UpcomingEventTicketFieldsFragments = gql`
  fragment upcomingEventTicketFields on EventTicket {
    id
    color_code
    end_date
    isMultiDay
    start_date
    name
    price
    date
    start_time
    gate_time
  }
`;

const SEARCH_EVENTS = gql`
  query SearchEvents($queryString: String!) {
    searchEvents(queryString: $queryString) {
      id
      name
      fullDate
      admin_tickets {
        ...upcomingEventTicketFields
      }
      admin_multiday_tickets {
        ...upcomingEventTicketFields
      }
      admin_other_tickets {
        ...upcomingEventTicketFields
      }
    }
  }
  ${UpcomingEventTicketFieldsFragments}
`;

function useSearchEvents() {
  return useQuery(SEARCH_EVENTS, {
    variables: { queryString: '' }
  });
}

export const EventsAutoSuggest = props => {
  const { onChange } = props;
  const { data, refetch } = useSearchEvents();
  if (!data?.searchEvents) return null;

  return (
    <AsyncAutoSuggest
      refetch={refetch}
      prepareVariables={inputValue => ({ queryString: inputValue })}
      characterCount={4}
      isModal
      NoFoundText={'No events found'}
      onChange={onChange}
      queryKey="searchEvents"
      option={event => ({
        label: `${event.fullDate} — ${event.name}`,
        value: event.id,
        tickets: [
          ...event?.admin_tickets,
          ...event?.admin_other_tickets,
          ...event?.admin_multiday_tickets
        ]
      })}
    />
  );
};
EventsAutoSuggest.propTypes = {
  onChange: PropTypes.func.isRequired
};
