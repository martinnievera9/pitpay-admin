import React from 'react';
import Text from 'components/Text';
import { PassRow } from './styles';
import { Tickets } from './Tickets';

export const Person = ({
  person,
  setSelectedPeople,
  selectedPeople,
  index,
  employeeAdmin,
}) => {
  return (
    <PassRow key={index}>
      <Text
        inlineStyle={{
          fontWeight: '600',
          fontSize: 20,
        }}
      >
        {person.user?.name}
      </Text>
      {person.tickets.map((ticket) => {
        const selectedPerson = selectedPeople.find(
          (selectedPerson) => selectedPerson.user.id === person.user.id
        );
        const selectedTickets =
          selectedPerson && selectedPerson.tickets
            ? selectedPerson.tickets
            : [];

        return (
          <Tickets
            employeeAdmin={employeeAdmin}
            key={index + ticket.id}
            ticket={ticket}
            selectedTickets={selectedTickets}
            onChange={(tickets) => {
              if (!selectedPerson) {
                return setSelectedPeople([
                  ...selectedPeople,
                  { ...person, tickets },
                ]);
              }

              const newSelectedPeople = selectedPeople.map((selectedPerson) => {
                if (selectedPerson.user.id !== person.user.id)
                  return selectedPerson;

                return {
                  ...selectedPerson,
                  tickets,
                };
              });

              setSelectedPeople(newSelectedPeople);
            }}
          />
        );
      })}
    </PassRow>
  );
};
