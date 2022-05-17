import React from 'react';
import { Checkbox } from 'components/Form/Checkbox';
import Text from 'components/Text';
import { PassItem } from './styles';

export const Tickets = ({
  ticket,
  onChange,
  selectedTickets,
  employeeAdmin,
}) => {
  return (
    <PassItem>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Checkbox
          inversed
          name="checkbox"
          check={ticket.refunded === false ? true : false}
          checked={
            !!ticket.refunded ||
            !!selectedTickets.find(
              (selectedTicket) => selectedTicket.id === ticket.id
            )
          }
          onChange={() => {
            if (employeeAdmin) return;
            if (ticket.refunded) return;
            const ticketExists = selectedTickets.find(
              (selectedTicket) => selectedTicket.id === ticket.id
            );

            if (ticketExists)
              return onChange(
                selectedTickets.filter(
                  (selectedTicket) => selectedTicket.id !== ticket.id
                )
              );

            return onChange([...(selectedTickets || []), { ...ticket }]);
          }}
          size={[36, 20, 3]}
        />
        <Text
          inlineStyle={{
            fontWeight: '600',
            fontSize: 20,
            marginLeft: 10,
            whiteSpace: 'normal',
          }}
        >
          {ticket.name}
        </Text>
      </div>
      <Text
        inlineStyle={{
          fontWeight: '600',
          fontSize: 20,
          marginLeft: 20,
        }}
      >
        {ticket.price}
      </Text>
    </PassItem>
  );
};
