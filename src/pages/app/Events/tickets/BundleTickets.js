import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { debounce } from 'throttle-debounce';
import { Input } from 'components/Form/Input';
import { Select } from 'components/Form/Select';
import { DESCRIPTION_CHARACTER_LIMIT } from '../EventEdit';
import { Col, Row } from 'react-grid-system';
import Spacer from 'components/Spacer';
import moment from 'moment';

const InputWrapper = styled.div`
  margin-top: 10px;
`;

const CharacterCount = styled.span`
  color: ${(props) => (props.overLimit ? props.theme.colors.error : 'unset')};
  margin-bottom: 6px;
`;


export const BundleTickets = ({
  handleChange,
  COLOR_CODES,
  ticket,
  tickets,
  index,
  ticketType,
}) => {

  useEffect(() => {
    [...tickets.admin_tickets, ...tickets.admin_multiday_tickets, ...tickets.admin_other_tickets].map((ticket, myIndex) => {
     // console.log(tickets.admin_bundle_tickets[index])
      //  debugger
      if(typeof tickets.admin_bundle_tickets[index].associated_tickets[myIndex] === 'undefined')
        tickets.admin_bundle_tickets[index].associated_tickets.push({'name': '', 'qty': ''})

      tickets.admin_bundle_tickets[index].associated_tickets[myIndex]['name'] = ticket.name;
    });
  }, []);

  // const theme = useTheme();
const [characterCount, setCharacterCount] = useState(0);
  return (
   <>
    <div style={{display:'flex'}}>
      <InputWrapper style={{maxWidth:'70%', flex:'0 0 70%', marginRight:'15px'}}>
        <Input
          id={`${ticketType}.${index}.name`}
          name={`${ticketType}.${index}.name`}
          label="Bundle Name"
          placeholder=""
          onChange={({ target }) =>
            handleChange({
              target: {
                name: `name`,
                value: target.value,
              },
            })
          }
          value={ticket.name ?? ''}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          id={`${ticketType}.${index}.price`}
          name={`${ticketType}.${index}.price`}
          label="Ticket Price"
          type="number"
          placeholder=""
          onChange={({ target }) =>
            handleChange({
              target: {
                name: `price`,
                value: parseFloat(target.value),
              },
            })
          }
          value={ticket.price ?? ''}
        />
      </InputWrapper>
    </div>

    <div style={{display:'flex'}}>
      <InputWrapper style={{maxWidth:'70%', flex:'0 0 70%', marginRight:'15px'}}>
        <Input
          as="textarea"
          labelRight={
            <CharacterCount
              overLimit={characterCount > DESCRIPTION_CHARACTER_LIMIT}
            >
              {characterCount} characters
            </CharacterCount>
          }
          rows={4}
          inputStyle={{ minHeight: 'unset' }}
          id={`${ticketType}.${index}.description`}
          name={`${ticketType}.${index}.description`}
          label="Description"
          placeholder=""
          onChange={({ target }) => {
            typeof target.value === 'string' &&
              debounce(300, setCharacterCount(target.value.length));
            handleChange({
              target: {
                name: `description`,
                value: target.value,
              },
            });
          }}
          value={ticket.description ?? ''}
        />
      </InputWrapper>

      <InputWrapper>
        <Select
          id={`${ticketType}.${index}.color_code`}
          name={`${ticketType}.${index}.color_code`}
          label="Color Code"
          placeholder="Select a Color"
          options={COLOR_CODES}
          onChange={({ target }) =>
            handleChange({
              target: {
                name: `color_code`,
                value: target.value,
              },
            })
          }
          value={ticket.color_code}
          backgroundColor={ticket.color_code}
        />
      </InputWrapper>
    </div>

    {[...tickets.admin_tickets, ...tickets.admin_multiday_tickets, ...tickets.admin_other_tickets].map((mTicket, myIndex) => (
      <Row>
        <Col>
          <InputWrapper style={{maxWidth:'20%'}}>
            <Input
              style={{marginRight:'15px', width: '80px'}}
              id={`${ticketType}.${index}.qty`}
              name={`${ticketType}.${index}.qty`}
              label="Qty"
              type="number"
              placeholder=""
              onChange={({ target }) => {
                tickets.admin_bundle_tickets[index].associated_tickets[myIndex]['qty'] = parseInt(target.value);
              }
            }
              value={ticket.associated_tickets && ticket.associated_tickets[myIndex] ? (ticket.associated_tickets[myIndex]["qty"] ?? '') : ''}
            />
          </InputWrapper>
        </Col>
      <Col>
        <InputWrapper style={{maxWidth:'70%'}}>
          <Input
            style={{marginRight:'15px', width: '10rem'}}
            id={`${ticketType}.${index}.date`}
            name={`${ticketType}.${index}.date`}
            label=""
            type="text"
            disabled
            placeholder="Date"
            value={(moment((mTicket.start_date)).format('ddd MMM DD') ?? '') + (moment((mTicket.start_date)).format('DD') !== moment((mTicket.end_date)).format('DD') ? (' - '+moment((mTicket.end_date)).format('DD')) : '' )}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            style={{marginRight:'15px'}}
            id={`${ticketType}.${index}.associative_tickets_name`}
            name={`${ticketType}.${index}.associative_tickets_name`}
            label=""
            type="text"
            disabled
            placeholder="Name"
            value={mTicket.name ?? ''}
          />
        </InputWrapper>
        
      </Col>
      <Col>
      <Spacer size={55}/>
        <InputWrapper style={{maxWidth:'40%'}}>
            <Input
              style={{marginRight:'15px', width: '5rem'}}
              id={`${ticketType}.${index}.associative_tickets.price`}
              name={`${ticketType}.${index}.associative_tickets.price`}
              label=""
              type="text"
              disabled
              placeholder="Price"
              value={mTicket.price ?? ''}
            />
          </InputWrapper>
        </Col>
        <Col></Col>
      </Row>
    ))}
   
  </>
  );
};