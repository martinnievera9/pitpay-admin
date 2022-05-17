import React from 'react';
import { Link } from 'react-router-dom';
import {
  Header,
  Heading,
  Wrapper,
  Or,
  Section,
  Label
} from '../CancelModal/style';
import Icon from 'components/Icon';
import { DatePicker } from 'components/Form/DatePicker';
import MoveTicketOptions from '../CancelModal/moveTicketOptions';
import { Button } from 'components/Button';
import { Checkbox } from 'components/Form/Checkbox';

const isDisabled = state => {
  if (state.tbd) return false;
  if (state.date) return false;
  return !(state.newTickets && state.newTickets.length);
};

export const PostponeForm = ({
  initialTickets,
  close,
  state,
  onChange,
  onSubmit
}) => {
  return (
    <div>
      <Header>
        <Link to={'/'}>
          <Icon icon="left-arrow" size={22} color={'#fa4616'} />
        </Link>
        <Heading>How do you want to postpone the event?</Heading>
        <Icon
          icon="close"
          size={18}
          color={'#fa4616'}
          onClick={() => {
            close();
          }}
        />
      </Header>
      <Wrapper>
        <Section>
          <Label style={{ marginTop: 20, marginBottom: 20 }}>
            Postpone to a later date
          </Label>
          <DatePicker
            id="date"
            name="date"
            type="date"
            onChange={(name, value) => {
              onChange({ name: 'date', value });
            }}
            value={state.date}
          />
        </Section>

        <Or>or</Or>
        <Section>
          <MoveTicketOptions
            onChange={onChange}
            initialTickets={initialTickets}
            allEvents={state.differentEvents}
            state={state}
            noSameEvent
          />
        </Section>
        <Or>or</Or>
        <Checkbox
          name="tbd"
          checked={state.tbd}
          onChange={() => {
            onChange({
              name: 'tbd',
              value: !state.tbd
            });
          }}
          leftText="TBD"
        />
        <Button
          buttonStyle={{ marginTop: 20 }}
          type="button"
          onClick={onSubmit}
          disabled={isDisabled(state)}
        >
          Postpone
        </Button>
      </Wrapper>
    </div>
  );
};
