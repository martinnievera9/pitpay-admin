import React, { useRef, useState } from 'react';
import { Route, MemoryRouter, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from 'components/Button';
import Icon from 'components/Icon';
import { ModalHeaderContainer } from 'components/Modal/styles';
import GetTicketsByDate from '../gql/queries/get-tickets-by-date';
import {
  useCancelEvent,
  useDeleteEvent,
  usePostponeEvent,
} from './CancelModal.mutations';
import {
  Container,
  ModalContainer,
  Heading,
  OptionsWrapper,
  Option,
  Wrapper,
  ButtonWrapper,
} from './style';

const BaseModal = (props) => {
  const {
    close,
    selectedEvent,
    allEvents,
    data,
    showCancelModal,
    currentType,
    objectId,
    noDelete,
    adminTrack,
  } = props;

  const ref = useRef();
  const [overflow, setOverflow] = useState();
  const postponeEvent = usePostponeEvent();
  const cancelEvent = useCancelEvent();
  const deleteEvent = useDeleteEvent();

  if (!data && !data.getTicketsByDate) return false;
  const { loading } = data;

  //
  return (
    <Container showCancelModal={showCancelModal}>
      <ModalContainer
        ref={ref}
        onClick={(e) => e.stopPropagation()}
        overflow={overflow}
      >
        <DeleteModal
          adminTrack={adminTrack}
          close={close}
          selectedEvent={selectedEvent}
          allEvents={allEvents}
          data={data}
          loading={loading}
          postponeEvent={postponeEvent}
          cancelEvent={cancelEvent}
          deleteEvent={deleteEvent}
          currentType={currentType}
          objectId={objectId}
          noDelete={noDelete || adminTrack}
          setOverflow={(value) => {
            setOverflow(value);
          }}
        />
      </ModalContainer>
    </Container>
  );
};

export const CancelModal = GetTicketsByDate(BaseModal);

const DeleteModal = (props) => {
  const {
    close,
    selectedEvent,
    data,
    postponeEvent,
    cancelEvent,
    deleteEvent,
    currentType,
    objectId,
    noDelete,
    loading,
    adminTrack,
  } = props;

  if (!data && !data.getTicketsByDate) return false;

  return (
    <MemoryRouter>
      <Route
        path="/"
        exact
        render={(props) => (
          <DeleteEventHeader
            {...props}
            close={close}
            selectedEvent={selectedEvent}
            data={data}
            noDelete={noDelete}
            loading={loading}
            adminTrack={adminTrack}
          />
        )}
      />
      {/* <Route
        path="/postpone"
        render={props => (
          <PostponeSingleDay
            setOverflow={setOverflow}
            props={props}
            close={close}
            event={selectedEvent}
            differentEvents={allEvents}
            onSubmit={async ({ state, initialTickets }) => {
              try {
                let items = '';
                if (!state.tbd) {
                  items = initialTickets.map((ticket, index) => ({
                    old_id: ticket.id,
                    new_id: state.newTickets[index]
                  }));
                }


                let response = await postponeEvent({
                  tbd: state.tbd ? true : false,
                  date: state.different_event_date
                    ? null
                    : state.date
                    ? moment(state.date).format('MM-DD-YYYY')
                    : state.event.start_date,
                  event_id: state.event.id,
                  new_event_id: state.tbd
                    ? null
                    : state.different_event
                    ? state.different_event.id
                    : null,
                  post_date: state.tbd
                    ? null
                    : state.date
                    ? null
                    : moment(state.different_event_date.value).format(
                        'MM-DD-YYYY'
                      ),
                  tickets: state.different_event_date ? items : null
                });


                if (!response.errors) {
                  toast.success('Event postponed successfully');
                  close();
                } else {
                  toast.error(`Cannot postpone events.`);
                }
              } catch (e) {
                                toast.error(`Cannot postpone event, ${e}`);
              }
            }}
          />
        )}
      />
      <Route
        path="/postpone-multiday-event"
        render={props => (
          <PostponeMultiday
            props={props}
            setOverflow={setOverflow}
            close={close}
            event={selectedEvent}
            differentEvents={allEvents}
            onSubmit={async ({ state, initialTickets }) => {
              try {

                let items = initialTickets.map((ticket, index) => ({
                  old_id: ticket.id,
                  new_id: state.newTickets[index]
                }));

                let response = await postponeEvent({
                  tbd: state.tbd,
                  event_id: state.event.id,
                  new_event_id: state.tbd
                    ? null
                    : state.different_event
                    ? state.different_event.id
                    : state.same_event_date_to_move_to
                    ? state.event.id
                    : null,
                  post_date: moment(state.start_date, 'YYYY-MM-DD').format(
                    'MM-DD-YYYY'
                  ),
                  tickets:
                    state.different_event || state.same_event_date_to_move_to
                      ? items
                      : null
                });


                if (!response.errors) {
                  toast.success('Event postponed successfully');
                  close();
                } else {
                  toast.error(`Cannot postpone events.`);
                }
              } catch (e) {
                                toast.error(`Cannot postpone event, ${e}`);
              }
            }}
          />
        )}
      /> */}
      <Route
        path="/postpone"
        render={(props) => (
          <Postpone
            {...props}
            close={close}
            selectedEvent={selectedEvent}
            postponeEvent={postponeEvent}
          />
        )}
      />
      <Route
        path="/cancel"
        render={(props) => (
          <CancelEvent
            {...props}
            close={close}
            selectedEvent={selectedEvent}
            cancelEvent={cancelEvent}
          />
        )}
      />

      <Route
        path="/delete"
        render={(props) => (
          <DeleteEvent
            {...props}
            close={close}
            selectedEvent={selectedEvent}
            deleteEvent={deleteEvent}
            currentType={currentType}
            objectId={objectId}
          />
        )}
      />
    </MemoryRouter>
  );
};

const DeleteEventHeader = (props) => {
  const { close, noDelete } = props;
  //   if (loading) return <Loading />;

  return (
    <>
      <ModalHeaderContainer>
        <Heading>Do you want to cancel or postpone this entire event?</Heading>
        <Icon
          icon="close"
          size={18}
          color={'#fa4616'}
          onClick={() => {
            close();
          }}
        />
      </ModalHeaderContainer>
      <Wrapper>
        <OptionsWrapper>
          <Option>
            <Link to={`/cancel`}>CANCEL</Link>
          </Option>

          <Option>
            <Link to={`/postpone`}>POSTPONE</Link>
          </Option>

          {noDelete ? null : (
            <Option>
              <Link to={`/delete`}>DELETE</Link>
            </Option>
          )}
        </OptionsWrapper>
      </Wrapper>
    </>
  );
};

const Postpone = (props) => {
  const { close, postponeEvent, selectedEvent } = props;

  const handleSubmit = async () => {
    try {
      const response = await postponeEvent(selectedEvent.id);

      //
      if (!response.errors) {
        toast.success('Event Postponed');
        close();
      } else {
        toast.error('Cannot postpone event at this time');
      }
    } catch (e) {
      toast.error(`Cannot postpone event, ${e}`);
    }
  };

  return (
    <div>
      <ModalHeaderContainer>
        <Link to={'/'}>
          <Icon icon="left-arrow" size={22} color={'#fa4616'} />
        </Link>
        <Heading>POSTPONE the event and STOP PASS SALES?</Heading>

        <Icon
          icon="close"
          size={18}
          color={'#fa4616'}
          onClick={() => {
            close();
          }}
        />
      </ModalHeaderContainer>
      <Wrapper>
        <ButtonWrapper>
          <Button
            type="button"
            onClick={() => {
              handleSubmit();
            }}
          >
            Yes, POSTPONE
          </Button>

          <Link to={`/`} style={{ marginLeft: 20 }}>
            <Button type="button">NO</Button>
          </Link>
        </ButtonWrapper>
      </Wrapper>
    </div>
  );
};

const CancelEvent = (props) => {
  const { close, cancelEvent, selectedEvent } = props;

  const handleSubmit = async () => {
    try {
      const response = await cancelEvent(selectedEvent.id);

      //
      if (!response.errors) {
        toast.success('Event Cancelled');
        close();
      } else {
        toast.error('Cannot cancel event at this time');
      }
    } catch (e) {
      toast.error(`Cannot cancel event, ${e}`);
    }
  };

  return (
    <div>
      <ModalHeaderContainer>
        <Link to={'/'}>
          <Icon icon="left-arrow" size={22} color={'#fa4616'} />
        </Link>
        <Heading>CANCEL the event and STOP PASS SALES?</Heading>

        <Icon
          icon="close"
          size={18}
          color={'#fa4616'}
          onClick={() => {
            close();
          }}
        />
      </ModalHeaderContainer>
      <Wrapper>
        <ButtonWrapper>
          <Button
            type="button"
            onClick={() => {
              handleSubmit();
            }}
          >
            YES, CANCEL
          </Button>

          <Link to={`/`} style={{ marginLeft: 20 }}>
            <Button type="button">NO</Button>
          </Link>
        </ButtonWrapper>
      </Wrapper>
    </div>
  );
};

const DeleteEvent = (props) => {
  const { close, deleteEvent, selectedEvent, currentType, objectId } = props;

  const handleSubmit = async () => {
    try {
      const response = await deleteEvent(
        { id: selectedEvent.id },
        currentType,
        objectId
      );

      //
      if (!response.errors) {
        toast.success('Event Deleted');
        close();
      } else {
        toast.error('Cannot delete event at this time');
      }
    } catch (e) {
      toast.error(`Cannot delete event, ${e}`);
    }
  };

  return (
    <div>
      <ModalHeaderContainer>
        <Link to={'/'}>
          <Icon icon="left-arrow" size={22} color={'#fa4616'} />
        </Link>
        <Heading>Are you sure you want to delete the event?</Heading>

        <Icon
          icon="close"
          size={18}
          color={'#fa4616'}
          onClick={() => {
            close();
          }}
        />
      </ModalHeaderContainer>
      <Wrapper>
        <ButtonWrapper>
          <Button
            type="button"
            onClick={() => {
              handleSubmit();
            }}
          >
            Yes, Delete
          </Button>

          <Link to={`/`} style={{ marginLeft: 20 }}>
            <Button type="button">No</Button>
          </Link>
        </ButtonWrapper>
      </Wrapper>
    </div>
  );
};
