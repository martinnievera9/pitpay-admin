import React from 'react';
import { Label, Section, TicketsWrapper } from './style';
import { AutoSuggest } from 'components/Form/AutoSuggest';
import { useQuery } from '@apollo/react-hooks';
import { ErrorText } from '../../../../components/Form/inputStyles';
import { secondQuery } from '../gql/queries/get-tickets-by-date';

const TransferTickets = props => {
  let { initialTickets, state, updateTickets } = props;

  const { data: rightData } = useQuery(secondQuery, {
    variables: {
      input: {
        event_id: state.different_event
          ? state.different_event.id
          : state.event.id,
        date: state.different_event_date
          ? state.different_event_date.value
          : state.same_event_date_to_move_to
          ? state.same_event_date_to_move_to.value
          : null
      }
    }
  });

  if (
    !rightData ||
    !initialTickets ||
    !rightData.getTicketsByDate ||
    !state.newTickets
  )
    return null;

  return (
    <div>
      <Section>
        <Label>Which tickets do you want to transfer?</Label>
        {rightData && rightData.getTicketsByDate.length <= 0 ? (
          <ErrorText fontSize={14}>
            You cannot postpone to an event with no tickets.
          </ErrorText>
        ) : null}
        <TicketsWrapper>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderWidth: 1,
              borderColor: 'blue',
              paddingRight: 5,

              width: '50%'
            }}
          >
            {initialTickets.map((ticket, index) => {
              return (
                <p
                  key={index}
                  style={{
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#f2f2f2',
                    paddingLeft: 10,
                    marginBottom: 10,
                    borderRadius: 4
                  }}
                >
                  {ticket.name} ${ticket.price}
                </p>
              );
            })}
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderWidth: 1,
              borderColor: 'green',
              paddingLeft: 5,
              width: '50%'
            }}
          >
            {initialTickets.map((_, index) => {
              let array =
                rightData && rightData.getTicketsByDate
                  ? rightData.getTicketsByDate
                  : [];

              let selected = array.find(
                ticket => ticket.id === state.newTickets[index]
              );

              //
              return (
                <div style={{ marginBottom: 10 }}>
                  <AutoSuggest
                    isSearchable={false}
                    key={index}
                    name="events"
                    value={
                      selected
                        ? {
                            value: state.newTickets[index],
                            label: `${selected.name} - $${selected.price}`
                          }
                        : null
                    }
                    onChange={value => {
                      let tickets = [...(state.newTickets || [])];
                      tickets[index] = value.value;
                      updateTickets(tickets);
                    }}
                    onBlur={value => {
                      return;
                    }}
                    closeMenuOnSelect
                    options={rightData.getTicketsByDate.map(item => ({
                      value: item.id,
                      label: `${item.name} - $${item.price}`
                    }))}
                  />
                </div>
              );
            })}
          </div>
        </TicketsWrapper>
      </Section>
    </div>
  );
};

export default TransferTickets;
