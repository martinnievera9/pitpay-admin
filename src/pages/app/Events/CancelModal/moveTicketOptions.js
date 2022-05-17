/* eslint-disable */
import React from 'react';
import { Label, Section, Or } from './style';
import { AutoSuggest } from 'components/Form/AutoSuggest';
import TransferTickets from './tickets';
import dayjs from 'dayjs';

const MoveTicketOptions = ({
  initialTickets,
  state,
  onChange,
  noSameEvent,
}) => {
  return (
    <div>
      <div>
        {!noSameEvent ? (
          <>
            <div
              style={{
                marginTop: 40,
                paddingTop: 40,
                borderTopColor: '#e6e6e6',
                borderTopWidth: 1,
                borderTopStyle: 'solid',
              }}
            ></div>
            <Section>
              <Label>
                Do you want to move this event to another day in the same event?
              </Label>
              <AutoSuggest
                isSearchable={false}
                name="events"
                placeholder="Choose an existing event"
                value={state.same_event_date_to_move_to || null}
                onChange={(value) => {
                  onChange({
                    name: 'same_event_date_to_move_to',
                    value: value,
                  });
                }}
                onBlur={() => {}}
                closeMenuOnSelect
                options={state.event.eventDates
                  .filter((date) => date !== state.start_date)
                  .map((item) => ({
                    value: item,
                    label: dayjs(item).format('MMM DD - YYYY'),
                  }))}
              />
            </Section>
            <Or>or</Or>
          </>
        ) : null}

        <Section>
          <Label>Do you want to postpone to an entirely different event?</Label>
          <AutoSuggest
            isSearchable={false}
            name="events"
            placeholder="Choose an existing event"
            value={
              state.different_event
                ? {
                    value: state.different_event.id,
                    label: state.different_event.name,
                  }
                : null
            }
            onChange={(value) => {
              let event = state.differentEvents.find(
                (event) => event.id === value.value
              );
              onChange({
                name: 'different_event',
                value: {
                  different_event: event,
                  different_event_date:
                    event.eventDates.length === 1
                      ? {
                          value: event.eventDates[0],
                          label: dayjs(event.eventDates[0]).format(
                            'MMM DD-YYYY'
                          ),
                        }
                      : null,
                },
              });
            }}
            onBlur={(value) => {}}
            closeMenuOnSelect
            options={state.differentEvents
              .filter((event) => event.id !== state.event.id)
              .map((item) => ({
                value: item.id,
                label: item.name,
              }))}
          />
        </Section>

        {state.different_event && state.different_event.isMultiDay ? (
          <Section>
            <Label>Which day in this event do you want to postpone to?</Label>
            <AutoSuggest
              isSearchable={false}
              name="events"
              placeholder="Choose an existing day from this multiday event"
              value={state.different_event_date || null}
              onChange={(value) => {
                onChange({ name: 'different_event_date', value });
              }}
              onBlur={(value) => {}}
              closeMenuOnSelect
              options={state.different_event.eventDates.map((item) => ({
                value: item,
                label: dayjs(item).format('MMM DD - YYYY'),
              }))}
            />
          </Section>
        ) : null}

        {state.same_event_date_to_move_to || state.different_event_date ? (
          <TransferTickets
            state={state}
            initialTickets={initialTickets}
            updateTickets={(value) => {
              onChange({ name: 'newTickets', value });
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default MoveTicketOptions;
