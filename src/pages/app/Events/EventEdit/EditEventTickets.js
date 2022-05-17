/* eslint-disable */
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-grid-system';
import { ReactSortable } from 'react-sortablejs';
import styled from 'styled-components';
import { debounce } from 'throttle-debounce';
import { Button, RemoveButton } from 'components/Button';
import { DatePicker } from 'components/Form/DatePicker';
import {
  DraggableRow,
  FormWrapper,
  getHighestItemOrderNumber,
  getOrderedItems,
} from 'components/Form/DraggableFields';
import { Input } from 'components/Form/Input';
import { Select } from 'components/Form/Select';
import { ErrorText } from 'components/Form/styles';
import Spacer from 'components/Spacer';
import Text from 'components/Text';
import useTheme from 'hooks/useTheme';
import { DESCRIPTION_CHARACTER_LIMIT } from '.';
import { SectionTitle } from '../AddEvents/styles';
import { AdminTickets } from '../tickets/AdminTickets';
import { MultidayTickets } from '../tickets/MultidayTickets';
import { OtherTickets } from '../tickets/OtherTickets';
import { BundleTickets } from '../tickets/BundleTickets';

const COLOR_CODES = [
  { label: 'Red', value: '#FF0000' },
  { label: 'Burgundy', value: '#950700' },
  { label: 'Magenta', value: '#FF0067' },
  { label: 'Black', value: '#000000' },
  { label: 'Gold', value: '#887A13' },
  { label: 'Baby Blue', value: '#00BBFF' },
  { label: 'Sky Blue', value: '#00F5FF' },
  { label: 'Blue', value: '#0034FF' },
  { label: 'Navy Blue', value: '#150067' },
  { label: 'Purple', value: '#580085' },
  { label: 'Light Purple', value: '#A743FF' },
  { label: 'School Bus Yellow', value: '#FCB92A' },
  { label: 'Bright Yellow', value: '#FDFA00' },
  { label: 'Yellow', value: '#FCE603' },
  { label: 'Brown', value: '#501D1D' },
  { label: 'Charcoal', value: '#5F534D' },
  { label: 'Rust Red', value: '#A04010' },
  { label: 'Pit Pay Orange', value: '#fa4616' },
  { label: 'Pit Pay Dark Blue', value: '#00001f' },
  { label: 'Avocado Green', value: '#90A010' },
  { label: 'Green Grass', value: '#00A526' },
  { label: 'Deere Green', value: '#367C2B' },
  { label: 'Lime Green ', value: '#AEFF00' },
  { label: 'Turquoise', value: '#00ADA7' },
  { label: 'Mint Green ', value: '#43EE9E' },
  { label: 'Pink', value: '#FF8BFE' },
  { label: 'Plum Purple', value: '#620961' },
  { label: 'Grey', value: '#A7A6A7' },
];

const TICKET_TYPES = [
  { label: 'Tickets', value: 'ticket' },
  { label: 'Other Tickets', value: 'other' },
];

const REG_TICKET_TYPES = [{ label: 'Register Tickets', value: 'registration' }];

const TicketHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const TicketCollapse = styled.div`
  &.collapsed {
    display: none;
  }
`;

const InputWrapper = styled.div`
  margin-top: 10px;
`;

const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Label = styled.label.attrs((props) => ({
  style: props.inlineStyle,
}))`
  color: black;
  font-weight: 500;
  margin-bottom: 6px;
  font-size: 4.2vw;
  display: block;

  @media (min-width: 700px) {
    font-size: 16px;
  }
`;

const CharacterCount = styled.span`
  color: ${(props) => (props.overLimit ? props.theme.colors.error : 'unset')};
  margin-bottom: 6px;
`;
CharacterCount.propTypes = {
  overLimit: PropTypes.bool,
};

const Ticket = ({
  handleChange,
  ticket,
  index,
  tickets,
  ticketType,
  handleDelete,
  collapsed,
}) => {
  const [characterCount, setCharacterCount] = useState(0);

  const ticketLimit = (
    <InputWrapper>
      <Input
        id={`${ticketType}.${index}.limit`}
        name={`${ticketType}.${index}.limit`}
        label="Ticket Limit"
        placeholder="Ticket Limit"
        type="number"
        onChange={({ target }) =>
          handleChange({
            target: {
              name: `limit`,
              value: target.value,
            },
          })
        }
        value={ticket.limit ?? ''}
      />
    </InputWrapper>
  );

  return (
    <>
      {collapsed && <Text type="label">{ticket.name || 'New ticket'}</Text>}
      <TicketCollapse className={collapsed ? 'collapsed' : null}>
        <RemoveButton
          style={{ marginBottom: 20, marginTop: 40 }}
          onClick={handleDelete}
        />
        {ticketType === 'admin_tickets' ? (
          <AdminTickets
            COLOR_CODES={COLOR_CODES}
            handleChange={handleChange}
            ticket={ticket}
            index={index}
            ticketType={ticketType}
            handleDelete={handleDelete}
            collapsed={collapsed}
          />
        ) : ticketType === 'admin_multiday_tickets' ? (
          <MultidayTickets
            COLOR_CODES={COLOR_CODES}
            handleChange={handleChange}
            ticket={ticket}
            index={index}
            ticketType={ticketType}
            handleDelete={handleDelete}
            collapsed={collapsed}
          />
        ) : ticketType === 'admin_other_tickets' ? (
          <OtherTickets
            COLOR_CODES={COLOR_CODES}
            handleChange={handleChange}
            ticket={ticket}
            index={index}
            ticketType={ticketType}
            handleDelete={handleDelete}
            collapsed={collapsed}
          />
        ) : ticketType === 'admin_bundle_tickets' ? (
          <BundleTickets
            COLOR_CODES={COLOR_CODES}
            handleChange={handleChange}
            ticket={ticket}
            tickets={tickets}
            index={index}
            ticketType={ticketType}
            handleDelete={handleDelete}
            collapsed={collapsed}
          />
        ) : (
          <>
            <InputWrapper>
              <Input
                id={`${ticketType}.${index}.name`}
                name={`${ticketType}.${index}.name`}
                label="Ticket Name"
                placeholder="Ticket Name"
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
                placeholder="Ticket Price"
                onChange={({ target }) =>
                  handleChange({
                    target: {
                      name: `price`,
                      value: target.value,
                    },
                  })
                }
                value={ticket.price ?? ''}
              />
            </InputWrapper>
            <Row>
              <Col>
                <InputWrapper>
                  <DatePicker
                    name={`${ticketType}.${index}.start_date`}
                    type="date"
                    label="Start Date"
                    value={ticket.start_date}
                    onChange={(_, value) =>
                      handleChange({ target: { name: 'start_date', value } })
                    }
                  />
                </InputWrapper>
              </Col>
              <Col>
                <InputWrapper>
                  <DatePicker
                    name={`${ticketType}.${index}.end_date`}
                    type="date"
                    label="End Date"
                    value={ticket.end_date}
                    onChange={(_, value) =>
                      handleChange({ target: { name: 'end_date', value } })
                    }
                  />
                </InputWrapper>
              </Col>
            </Row>
            <InputWrapper>
              <Input
                id={`${ticketType}.${index}.form_id`}
                name={`${ticketType}.${index}.form_id`}
                label="Form"
                placeholder="Formstack Form ID"
                type="number"
                onChange={({ target }) =>
                  handleChange({
                    target: {
                      name: `form_id`,
                      value: target.value,
                    },
                  })
                }
                value={ticket.form_id}
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
            <>
              <InputWrapper>
                <Input
                  as="textarea"
                  labelRight={
                    <CharacterCount
                      overLimit={characterCount > DESCRIPTION_CHARACTER_LIMIT}
                    >
                      {characterCount} characters
                    </CharacterCount>
                  }
                  rows={2}
                  inputStyle={{ minHeight: 'unset' }}
                  id={`${ticketType}.${index}.description`}
                  name={`${ticketType}.${index}.description`}
                  label="Description"
                  placeholder="Ticket Description"
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
              <Spacer size={18} />
            </>
          </>
        )}
        <Spacer size={20} />
      </TicketCollapse>
      {!collapsed && <Spacer size={18} />}
    </>
  );
};

export const EditEventTickets = ({
  tickets,
  onChange,
  handleSort,
  customPadding,
}) => {
  const theme = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [ticketType, setTicketType] = useState('');
  const ticketTypeName = ticketType.split('_').slice(1).join(' ');

  const singleTicketsWithOrderNumbers = getOrderedItems(
    tickets.admin_tickets || []
  );
  const multiTicketsWithOrderNumbers = getOrderedItems(
    tickets.admin_multiday_tickets || []
  );
  const otherTicketsWithOrderNumbers = getOrderedItems(
    tickets.admin_other_tickets || []
  );
  const bundleTicketsWithOrderNumbers = getOrderedItems(
    tickets.admin_bundle_tickets || []
  );

  return (
    <div
      style={{
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 0,
        margin: 10,
        display: 'flex',
        width: '100%',
      }}
    >
      <div style={{ width: '65%' }}>
        <div
          style={{
            display: 'flex',
            flexDIrection: 'row',
          }}
        >
          <Button
            type="button"
            buttonStyle={{
              margin: '10px',
            }}
            onClick={() => {
              onChange('admin_tickets', [
                {
                  order:
                    getHighestItemOrderNumber(singleTicketsWithOrderNumbers) +
                    1,
                  type: 'admin',
                },
                ...tickets.admin_tickets,
              ]);
              // setTicketType(ticketTypeProp);
            }}
          >
            singleDay
          </Button>
          <Button
            type="button"
            buttonStyle={{
              margin: '10px',
            }}
            onClick={() => {
              onChange('admin_multiday_tickets', [
                {
                  order:
                    getHighestItemOrderNumber(multiTicketsWithOrderNumbers) + 1,
                  type: 'admin',
                },
                ...tickets.admin_multiday_tickets,
              ]);
              // setTicketType(ticketTypeProp);
            }}
          >
            MultiDay
          </Button>
          <Button
            type="button"
            buttonStyle={{
              margin: '10px',
            }}
            onClick={() => {
              onChange('admin_other_tickets', [
                {
                  order:
                    getHighestItemOrderNumber(otherTicketsWithOrderNumbers) + 1,
                  type: 'other',
                },
                ...tickets.admin_other_tickets,
              ]);
              // setTicketType(ticketTypeProp);
            }}
          >
            Other
          </Button>
          <Button
            type="button"
            buttonStyle={{
              margin: '10px',
            }}
            onClick={() => {
              onChange('admin_bundle_tickets', [
                {
                  order:
                    getHighestItemOrderNumber(bundleTicketsWithOrderNumbers) +1,
                  type: 'other',
                  associated_tickets: [{ name: '', qty: '' }],
                },
                ...tickets.admin_bundle_tickets,
              ]);
              // setTicketType(ticketTypeProp);
            }}
          >
            Bundle
          </Button>
        </div>
        <div>
          {singleTicketsWithOrderNumbers.length > 0 && (
            <div>
              {singleTicketsWithOrderNumbers.map((ticket, index) => (
                <div key={ticket.order}>
                  <FormWrapper>
                    <Ticket
                      key={ticket.order}
                      ticket={ticket}
                      ticketType={'admin_tickets'}
                      index={index}
                      handleDelete={() => {
                        const newTickets = tickets.admin_tickets.filter(
                          (_, currentIndex) => currentIndex !== index
                        );
                        onChange('admin_tickets', newTickets);
                      }}
                      handleChange={({ target }) => {
                        const newTickets = tickets.admin_tickets.map(
                          (ticket, ticketIndex) =>
                            ticketIndex === index
                              ? { ...ticket, [target.name]: target.value }
                              : ticket
                        );
                        onChange('admin_tickets', newTickets);
                      }}
                      collapsed={isCollapsed}
                    />
                  </FormWrapper>
                </div>
              ))}
            </div>
          )}
          {multiTicketsWithOrderNumbers.length > 0 && (
            <div>
              {multiTicketsWithOrderNumbers.map((ticket, index) => (
                <div key={ticket.order}>
                  <FormWrapper>
                    <Ticket
                      key={ticket.order}
                      ticket={ticket}
                      ticketType={'admin_multiday_tickets'}
                      index={index}
                      handleDelete={() => {
                        const newTickets =
                          tickets.admin_multiday_tickets.filter(
                            (_, currentIndex) => currentIndex !== index
                          );
                        onChange('admin_multiday_tickets', newTickets);
                      }}
                      handleChange={({ target }) => {
                        const newTickets = tickets.admin_multiday_tickets.map(
                          (ticket, ticketIndex) =>
                            ticketIndex === index
                              ? { ...ticket, [target.name]: target.value }
                              : ticket
                        );
                        onChange('admin_multiday_tickets', newTickets);
                      }}
                      collapsed={isCollapsed}
                    />
                  </FormWrapper>
                </div>
              ))}
            </div>
          )}
          {otherTicketsWithOrderNumbers.length > 0 && (
            <div>
              {otherTicketsWithOrderNumbers.map((ticket, index) => (
                <div key={ticket.order}>
                  <FormWrapper>
                    <Ticket
                      key={ticket.order}
                      ticket={ticket}
                      ticketType={'admin_other_tickets'}
                      index={index}
                      handleDelete={() => {
                        const newTickets = tickets.admin_other_tickets.filter(
                          (_, currentIndex) => currentIndex !== index
                        );
                        onChange('admin_other_tickets', newTickets);
                      }}
                      handleChange={({ target }) => {
                        const newTickets = tickets.admin_other_tickets.map(
                          (ticket, ticketIndex) =>
                            ticketIndex === index
                              ? { ...ticket, [target.name]: target.value }
                              : ticket
                        );
                        onChange('admin_other_tickets', newTickets);
                      }}
                      collapsed={isCollapsed}
                    />
                  </FormWrapper>
                </div>
              ))}
            </div>
          )}
          {bundleTicketsWithOrderNumbers.length > 0 && (
            <div>
              {bundleTicketsWithOrderNumbers.map((ticket, index) => (
                <div key={ticket.order}>
                  <FormWrapper>
                    <Ticket
                      key={ticket.order}
                      ticket={ticket}
                      ticketType={'admin_bundle_tickets'}
                      tickets={tickets}
                      index={index}
                      handleDelete={() => {
                        const newTickets = tickets.admin_bundle_tickets.filter(
                          (_, currentIndex) => currentIndex !== index
                        );
                        onChange('admin_bundle_tickets', newTickets);
                      }}
                      handleChange={({ target }) => {
                        const newTickets = tickets.admin_bundle_tickets.map(
                          (ticket, ticketIndex) =>
                            ticketIndex === index
                              ? { ...ticket, [target.name]: target.value }
                              : ticket
                        );
                        onChange('admin_bundle_tickets', newTickets);
                      }}
                      collapsed={isCollapsed}
                    />
                  </FormWrapper>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          marginTop: 10,
          marginBottom: 10,
          marginLeft: '60px',
          padding: '50px',
        }}
      >
        {singleTicketsWithOrderNumbers?.length > 0 && (
          <div>
            <LabelWrapper style={{ marginLeft: -20 }}>
              <Label>{'Ticket Order In App (Single Day)'}</Label>
            </LabelWrapper>
            <ReactSortable
              list={tickets.admin_tickets}
              setList={(values) => handleSort('admin_tickets', values)}
            >
              {singleTicketsWithOrderNumbers.map((ticket) => (
                <DraggableRow key={ticket.order}>
                  <InputWrapper style={{ width: '100%' }}>
                    <Input
                      inputStyle={{ minHeight: 'unset' }}
                      id={ticket.order}
                      name={ticket.name}
                      placeholder={ticket.name}
                      disabled
                      value={ticket.name ?? ''}
                    />
                  </InputWrapper>
                </DraggableRow>
              ))}
            </ReactSortable>
          </div>
        )}

        {multiTicketsWithOrderNumbers?.length > 0 && (
          <div>
            <LabelWrapper style={{ marginLeft: -20 }}>
              <Label>{'Ticket Order In App (Multiday)'}</Label>
            </LabelWrapper>
            <ReactSortable
              list={tickets.admin_multiday_tickets}
              setList={(values) => handleSort('admin_multiday_tickets', values)}
            >
              {multiTicketsWithOrderNumbers.map((ticket) => (
                <DraggableRow key={ticket.order}>
                  <InputWrapper style={{ width: '100%' }}>
                    <Input
                      inputStyle={{ minHeight: 'unset' }}
                      id={ticket.order}
                      name={ticket.name}
                      placeholder={ticket.name}
                      disabled
                      value={ticket.name ?? ''}
                    />
                  </InputWrapper>
                </DraggableRow>
              ))}
            </ReactSortable>
          </div>
        )}

        {otherTicketsWithOrderNumbers?.length > 0 && (
          <div>
            <LabelWrapper style={{ marginLeft: -20 }}>
              <Label>{'Ticket Order In App (Other)'}</Label>
            </LabelWrapper>
            <ReactSortable
              list={tickets.admin_other_tickets}
              setList={(values) => handleSort('admin_other_tickets', values)}
            >
              {otherTicketsWithOrderNumbers.map((ticket) => (
                <DraggableRow key={ticket.order}>
                  <InputWrapper style={{ width: '100%' }}>
                    <Input
                      inputStyle={{ minHeight: 'unset' }}
                      id={ticket.order}
                      name={ticket.name}
                      placeholder={ticket.name}
                      disabled
                      value={ticket.name ?? ''}
                    />
                  </InputWrapper>
                </DraggableRow>
              ))}
            </ReactSortable>
          </div>
        )}

        {bundleTicketsWithOrderNumbers?.length > 0 && (
          <div>
            <LabelWrapper style={{ marginLeft: -20 }}>
              <Label>{'Ticket Order In App (Bundle)'}</Label>
            </LabelWrapper>
            <ReactSortable
              list={tickets.admin_bundle_tickets}
              setList={(values) => handleSort('admin_bundle_tickets', values)}
            >
              {bundleTicketsWithOrderNumbers.map((ticket) => (
                <DraggableRow key={ticket.order}>
                  <InputWrapper style={{ width: '100%' }}>
                    <Input
                      inputStyle={{ minHeight: 'unset' }}
                      id={ticket.order}
                      name={ticket.name}
                      placeholder={ticket.name}
                      disabled
                      value={ticket.name ?? ''}
                    />
                  </InputWrapper>
                </DraggableRow>
              ))}
            </ReactSortable>
          </div>
        )}
      </div>
    </div>
  );
};

const ticketProp = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string,
  start_date: PropTypes.string,
  end_date: PropTypes.string,
  color_code: PropTypes.string,
  description: PropTypes.string,
  limit: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
});

const ticketTypeProp = PropTypes.oneOf([
  'admin_tickets',
  'admin_multiday_tickets',
  'admin_other_tickets',
  'admin_bundle_tickets',
  'admin_registrations',
]);

Ticket.propTypes = {
  ticket: ticketProp.isRequired,
  // ticketType: ticketTypeProp.isRequired,
  index: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

EditEventTickets.propTypes = {
  tickets: PropTypes.arrayOf(ticketProp).isRequired,
  // ticketType: ticketTypeProp.isRequired,
  onChange: PropTypes.func.isRequired,
  addButtonText: PropTypes.string.isRequired,
  error: PropTypes.string,
};
