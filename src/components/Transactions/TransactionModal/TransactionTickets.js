import React, { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from 'components/Button';
import {
  EventsAutoSuggest,
  withEventYearFilterContext,
} from 'components/Events';
import { useGetEventsAdmin } from 'components/Events/gql';
import { AutoSuggest } from 'components/Form/AutoSuggest';
import Icon from 'components/Icon';
import { ModalSectionHeaderContainer } from 'components/Modal/styles';
import Text from 'components/Text';
import { useTransferPasses } from '..';
import {
  ModalContainer,
  Header,
  TicketsWrapper,
  Ticket,
  Wrapper,
} from './styles';

export const TransactionTickets = withEventYearFilterContext(
  ({ close, location }) => {
    const people = location.query;
    const [event, setNewEvent] = useState();
    const [newTickets, setNewTickets] = useState([]);

    const { pathname } = useLocation();
    const { id } = useParams;
    const eventType = pathname.includes('track')
      ? 'track'
      : pathname.includes('/admin/series')
      ? 'series'
      : 'events';
    const { data } = useGetEventsAdmin(eventType);
    const transferPasses = useTransferPasses();

    if (!data?.getEventsAdmin) return false;

    return (
      <ModalContainer>
        <Header>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link
              to={{
                pathname: `/`,
                query: [...people],
              }}
            >
              <Icon icon="left-arrow" size={22} color={'#fa4616'} />
            </Link>
            <Text type="heading" inlineStyle={{ marginLeft: 20 }}>
              Transfer Tickets
            </Text>
          </div>
          <Icon
            icon="close"
            size={18}
            color={'#fa4616'}
            onClick={() => {
              close();
            }}
          />
        </Header>

        <Text type="heading" inlineStyle={{ marginBottom: 10 }} fontSize={22}>
          Which event do you want to transfer to?
        </Text>
        <EventsAutoSuggest
          onChange={(value) => {
            setNewEvent({ ...value });
          }}
        />

        <>
          <ModalSectionHeaderContainer>
            <Text type="heading" inlineStyle={{ marginTop: 20 }}>
              Tickets
            </Text>
          </ModalSectionHeaderContainer>

          <TicketsWrapper>
            {people
              .filter((person) => person.tickets.length)
              .map((person, index) => (
                <Ticket
                  key={person?.id ?? index}
                  style={index === 0 ? { marginTop: 0 } : null}
                >
                  <Text
                    inlineStyle={{
                      fontWeight: '600',
                      fontSize: 20,
                    }}
                  >
                    {person.user.name}
                  </Text>
                  {person.tickets.map((ticket, index) => (
                    <Wrapper key={ticket?.id ?? index}>
                      <Text
                        inlineStyle={{
                          fontWeight: '600',
                          fontSize: 16,
                          marginTop: 10,
                        }}
                      >
                        {ticket.name}
                      </Text>

                      <AutoSuggest
                        customStyles={{
                          control: (styles) => ({
                            ...styles,
                            width: 300,
                          }),
                        }}
                        isSearchable={false}
                        name="event-tickets"
                        placeholder="Choose a ticket"
                        value={
                          newTickets[index]
                            ? event?.tickets?.find((ticket) =>
                                ticket.id === newTickets[index]
                                  ? {
                                      labe: ticket.name,
                                      value: ticket.id,
                                    }
                                  : null
                              )
                            : null
                        }
                        onChange={(value) => {
                          setNewTickets([
                            ...newTickets,
                            { pass_id: ticket.id, ticket_id: value.value },
                          ]);
                        }}
                        /* onBlur={(value) => {}} */
                        closeMenuOnSelect
                        options={event?.tickets?.map((ticket) => ({
                          value: ticket.id,
                          label: ticket.name,
                        }))}
                      />
                    </Wrapper>
                  ))}
                </Ticket>
              ))}
          </TicketsWrapper>
        </>

        <Button
          disabled={
            newTickets.length ===
            people.map((person) => person.tickets).flat().length
              ? false
              : true
          }
          buttonStyle={{ marginTop: 20, marginLeft: 0, marginRight: 0 }}
          fontSize={22}
          onClick={async () => {
            if (
              window.confirm('Are you sure you want to transfer these passes?')
            ) {
              try {
                const response = await transferPasses(
                  {
                    input: [...newTickets],
                  },
                  Number(id)
                );
                if (!response || response.errors) {
                  toast.error('Tickets could not be transfered');
                  return;
                }

                if (response.data.transferPasses) {
                  toast.success('Tickets Succesfully Transfered');
                  close();
                } else {
                  toast.error('Tickets could not be transfered');
                }
              } catch (e) {}
            }
          }}
        >
          Transfer Tickets
        </Button>
      </ModalContainer>
    );
  }
);
