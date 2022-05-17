import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header, Heading, Wrapper, Or } from '../CancelModal/style';
import Icon from 'components/Icon';
import { ChooseDate } from './ChooseDate';
import MoveTicketOptions from '../CancelModal/moveTicketOptions';
import { Button } from 'components/Button';
import { Checkbox } from 'components/Form/Checkbox';
import { ErrorText } from 'components/Form/inputStyles';

const isDisabled = state => {
  return !(state.newTickets && state.newTickets.length);
};

export const PostponeForm = ({
  initialTickets,
  close,
  state,
  onChange,
  onSubmit,
  setOverflow,
  props
}) => {
  useEffect(() => {
    if (state.start_date) {
      setOverflow(true);
    }
  }, [state.start_date]);

  return (
    <div>
      <Header>
        <Link to={'/'} onClick={() => setOverflow(false)}>
          <Icon icon="left-arrow" size={22} color={'#fa4616'} />
        </Link>
        <Heading>Postpone multiday event</Heading>

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
        {initialTickets && !initialTickets.length ? (
          <ErrorText fontSize={14}>
            You cannot postpone an event with no tickets.
          </ErrorText>
        ) : null}
        <ChooseDate
          state={state}
          onChange={value => onChange({ name: 'start_date', value })}
        />

        {state.start_date && initialTickets && initialTickets.length > 0 ? (
          <div>
            <MoveTicketOptions
              onChange={onChange}
              initialTickets={initialTickets}
              allEvents={state.differentEvents}
              state={state}
            />
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
          </div>
        ) : null}
      </Wrapper>
    </div>
  );
};
