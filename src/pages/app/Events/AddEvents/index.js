/* eslint-disable */
import { omit } from 'lodash';
import moment from 'moment';

import {
  TabContent,
  Tabs,
  AddUpdateBtn,
  Tab,
  Content,
  Header,
  EventBody,
  SectionTitle,
  CardText,
} from 'pages/app/Events/AddEvents/styles';
import EventHeader from 'components/Events/EventHeader';
import EditEventSidebar from 'components/Events/EditEventSidebar';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-grid-system';
import { toast } from 'react-toastify';
import { Button } from 'components/Button';
import {
  useCreateEvent,
  useGetEvent,
  useUpdateEvent,
} from 'components/Events/gql';
import { FaqList } from 'components/Faqs';
import { NoteList } from 'components/Notes';
import { useGetMatrices } from 'components/FeeMatrices/gql';
import { AutoSuggest } from 'components/Form/AutoSuggest';
import { Checkbox } from 'components/Form/Checkbox';
import { DatePicker } from 'components/Form/DatePicker';
import { Dropzone } from 'components/Form/Dropzone';
import { Input } from 'components/Form/Input';
import { Label, ErrorText } from 'components/Form/styles';
import RowSection from 'components/RowSection';
import { SeriesSelect } from 'components/SeriesSelect';
import Spacer from 'components/Spacer';
import DateTimeRepeater from 'pages/app/Events/EventEdit/DateTimeRepeater';
import Ownership from 'pages/app/Events/EventEdit/Dropdown/ownership';
import { EditEventTickets as Tickets } from 'pages/app/Events/EventEdit/EditEventTickets';
import { FeesRepeater } from 'pages/app/Events/EventEdit/FeesRepeater';
import Tracks from 'pages/app/Events/EventEdit/tracks';
import { WaiversRepeater } from 'pages/app/Events/EventEdit/WaiversRepeater';
import Account from '../EventEdit/Dropdown/account';

const formValues = [
  'name',
  'start_date',
  // 'added_by',
  'end_date',
  'sale_start',
  'sale_end',
  'off_sale_time',
  'status',
  'status_color',
  'admin_tickets',
  'admin_other_tickets',
  'admin_bundle_tickets',
  'admin_multiday_tickets',
  'admin_registrations',
  'image_id',
  'logo_id',
  'track_id',
  'series_ids',
  'user_id',
  'account_id',
  'faqs',
  'admin_website_url',
  'admin_schedule_url',
  // 'event_capacity',
  'facebook',
  'instagram',
  'twitter',
  'waivers',
  'about',
  'admin_times',
  'hide_fee',
  'international_fee',
  'registration_sale_start',
  'registration_sale_end',
  'registration_off_time',
  'registration_email',
  'other_fees',
  'registration_fees',
  'matrix_id',
  'marketing_fee',
];

export const DESCRIPTION_CHARACTER_LIMIT = 200;

const descriptionError = `Ticket Descriptions must be less than ${DESCRIPTION_CHARACTER_LIMIT} characters long`;

function sortByOrderField(a, b) {
  // We want faqs with no `order` to be last, not first
  return (a.order ?? Infinity) - (b.order ?? Infinity);
}

function getInitialValues(event, keys) {
  let {
    user,
    admin_times,
    admin_tickets,
    admin_other_tickets,
    admin_multiday_tickets,
    admin_bundle_tickets,
    admin_registrations,
    faqs,
    off_sale_time,
    registration_off_time,
    series,
    waivers,
    other_fees,
    registration_fees,
    matrix,
  } = event ?? {};
  const blankValues = {
    ...keys.reduce((values, key) => ({ ...values, [key]: '' }), {}),
    user_id: {
      value: '',
      label: '',
    },
    admin_times: [],
    admin_tickets: [],
    admin_bundle_tickets: [],
    admin_multiday_tickets: [],
    admin_other_tickets: [],
    admin_registrations: [],
    faqs: [],
    off_sale_time: null,
    registration_off_time: null,
    series_ids: [],
    waivers: [],
    other_fees: [],
    registration_fees: [],
    marketing_fee: true,
  };

  const initialValues = !event
    ? blankValues
    : {
        ...keys.reduce((formValues, key) => {
          return event[key]
            ? {
                ...formValues,
                [key]: event[key],
              }
            : formValues;
        }, {}),
        user_id: user
          ? {
              value: user.id,
              label: `${user.first_name} ${
                user.middle_name ? `${user.middle_name} ` : ''
              }${user.last_name}`,
            }
          : '',
        ...(Array.isArray(admin_times)
          ? {
              admin_times: admin_times.map((time) => ({
                id: time.id,
                start_time: time.start_time ? setTime(time.start_time) : null,
                gate_time: time.gate_time ? setTime(time.gate_time) : null,
                event_date: time.event_date,
              })),
            }
          : undefined),

        ...(Array.isArray(admin_tickets)
          ? {
              admin_tickets: admin_tickets
                .sort(sortByOrderField)
                .map((ticket) => ({
                  ...ticket,
                  price: ticket.price.toFixed(2),
                })),
            }
          : undefined),

        ...(Array.isArray(admin_multiday_tickets)
          ? {
              admin_multiday_tickets: admin_multiday_tickets
                .sort(sortByOrderField)
                .map((ticket) => ({
                  ...ticket,
                  price: ticket.price.toFixed(2),
                })),
            }
          : undefined),
        ...(Array.isArray(admin_other_tickets)
          ? {
              admin_other_tickets: admin_other_tickets
                .sort(sortByOrderField)
                .map((ticket) => ({
                  ...ticket,
                  price: ticket.price.toFixed(2),
                })),
            }
          : undefined),
        ...(Array.isArray(admin_bundle_tickets)
          ? {
              admin_bundle_tickets: admin_bundle_tickets
                .sort(sortByOrderField)
                .map((ticket) => ({
                  ...ticket,
                  price: ticket.price.toFixed(2),
                })),
            }
          : undefined),

        admin_registrations: admin_registrations
          .sort(sortByOrderField)
          .map((ticket) => ({
            id: ticket.id,
            start_date: ticket.start_date,
            end_date: ticket.end_date,
            name: ticket.name,
            price: ticket.price.toFixed(2),
            limit: ticket.limit,
            color_code: ticket.color_code,
            type: ticket.type,
            form_id: ticket.form_id,
          })),
        ...(faqs
          ? {
              faqs: faqs
                .sort(sortByOrderField)
                .map((faq) => omit(faq, ['__typename'])),
            }
          : []),
        ...(off_sale_time ? { off_sale_time: setTime(off_sale_time) } : null),
        ...(registration_off_time
          ? { registration_off_time: setTime(registration_off_time) }
          : null),
        series_ids: Array.isArray(series)
          ? series.map((series) => ({
              value: series.id,
              label: series.name,
            }))
          : [],
        ...(Array.isArray(waivers)
          ? {
              waivers: waivers
                .filter(Boolean)
                .reduce(
                  (allWaivers, waiver) => [
                    ...allWaivers,
                    { waiver: waiver.id },
                  ],
                  []
                ),
            }
          : []),
        other_fees: other_fees
          ? other_fees.map((fee) => {
              // eslint-disable-next-line no-unused-vars
              const { __typename, ...rest } = fee;
              return rest;
            })
          : [],
        registration_fees: registration_fees
          ? registration_fees.map((fee) => {
              // eslint-disable-next-line no-unused-vars
              const { __typename, ...rest } = fee;
              return rest;
            })
          : [],
        matrix_id: matrix
          ? {
              value: matrix.id,
              label: matrix.name,
            }
          : null,
      };
  return initialValues;
}

function getTicketValues(ticket, index) {
  const {
    id,
    name,
    start_date,
    end_date,
    color_code,
    type,
    limit,
    price,
    description,
  } = ticket;
  return {
    id,
    name,
    start_date,
    end_date,
    color_code,
    type,
    description,
    limit: limit ? parseInt(limit) : null,
    price: price ? parseFloat(price) : 0,
    order: index,
  };
}

function getBundleTicketValues(ticket, index) {
  const {
    id,
    name,
    start_date,
    end_date,
    color_code,
    type,
    limit,
    price,
    description,
    associated_tickets,
  } = ticket;
  return {
    id,
    name,
    start_date,
    end_date,
    color_code,
    type,
    description,
    limit: limit ? parseInt(limit) : null,
    price: price ? parseFloat(price) : 0,
    order: index,
    associated_tickets,
    associated_tickets,
  };
}

function getFeesInput(fees, action) {
  return fees
    .filter(
      (fee) =>
        !Object.entries(fee).reduce((allBlank, [key, value]) =>
          key === 'id' ? allBlank : value ? false : allBlank
        ),
      true
    )
    .map((fee, index) => ({
      ...Object.entries(fee).reduce(
        (properties, [key, value]) => ({
          ...properties,
          [key]: Number(value),
        }),
        {}
      ),
      ...(action !== 'update' ? { id: index } : null),
    }));
}

function getEventInput({
  data,
  currentTrack,
  currentEvent,
  currentSeries,
  action,
}) {
  return {
    ...data,
    ...(action === 'update' ? { id: parseInt(currentEvent) } : null),
    off_sale_time: data.off_sale_time ? getTimes(data.off_sale_time) : null,
    track_id: currentTrack
      ? parseInt(currentTrack, 10)
      : data.track_id
      ? data.track_id.value
      : null,
    account_id: data.account_id.value,
    admin_times: data.admin_times
      ? data.admin_times.map((time) => {
          const { id, event_date, gate_time, start_time } = time;
          return {
            id,
            event_date,
            gate_time: gate_time ? getTimes(gate_time) : null,
            start_time: start_time ? getTimes(start_time) : null,
          };
        })
      : [],
    admin_tickets: data.admin_tickets
      ? data.admin_tickets.map((ticket, index) => ({
          ...getTicketValues(ticket, index),
        }))
      : [],
    admin_multiday_tickets: data.admin_multiday_tickets
      ? data.admin_multiday_tickets.map((ticket, index) => ({
          ...getTicketValues(ticket, index),
        }))
      : [],
    admin_other_tickets: data.admin_other_tickets
      ? data.admin_other_tickets.map((ticket, index) => ({
          ...getTicketValues(ticket, index),
        }))
      : [],
    admin_bundle_tickets: data.admin_bundle_tickets
      ? data.admin_bundle_tickets.map((ticket, index) => ({
          ...getBundleTicketValues(ticket, index),
        }))
      : [],
    admin_registrations: data.admin_registrations
      ? data.admin_registrations.map((ticket, index) => ({
          ...getTicketValues(ticket, index),
          form_id: ticket.form_id ? parseFloat(ticket.form_id) : null,
        }))
      : [],
    user_id: data.user_id ? data.user_id.value : null,
    waivers: data.waivers
      ? data.waivers
          .filter(Boolean)
          .map((waiver) => parseInt(waiver.waiver, 10))
      : [],
    series_ids: data.series_ids
      ? data.series_ids.map((item) => item.value)
      : parseInt(currentSeries, 10),
    faqs: data.faqs.map((faq, index) => {
      // Destructure out the `react-sortablejs` additions
      /* eslint-disable-next-line no-unused-vars */
      const { chosen, selected, filtered, ...rest } = faq;
      return {
        ...rest,
        order: index,
      };
    }),
    ...(data.other_fees
      ? {
          other_fees: getFeesInput(data.other_fees, action),
        }
      : null),
    ...(data.registration_fees
      ? {
          registration_fees: getFeesInput(data.registration_fees, action),
        }
      : null),
    ...(data.matrix_id?.value
      ? { matrix_id: data.matrix_id.value }
      : undefined),
  };
}

function validateTicketDescriptionCharacterCounts(tickets, characterLimit) {
  if (!tickets.length) {
    return true;
  }

  const areAllValid = tickets.reduce((allValid, ticket) => {
    return typeof ticket.description === 'string' &&
      ticket.description.length > characterLimit
      ? false
      : allValid;
  }, true);
  return areAllValid;
}

const AddEvents = ({ isVisible, handleOutClick, id, newEvent, match }) => {
  const [active, setActive] = useState(0);
  const [is_multiday, setMultiDay] = useState(null);

  const [trackTitle, setTrackTitle] = useState('test');

  const location = useLocation();
  const history = useHistory();
  const params = useParams();

  const currentEvent = params.id;
  const currentTrack = params.currentTrack;
  const currentSeries = params.currentSeries;

  const successMessage = () =>
    toast.success(currentEvent ? 'Event Updated' : 'Event Created');
  const errorMessage = (response) =>
    toast.error(
      currentEvent
        ? response.global
          ? 'Error Updating Event'
          : "There were errors with your submission check the form's field for errors."
        : 'Error Creating Event'
    );

  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const { data: eventData } = useGetEvent(parseInt(currentEvent));

  if (currentEvent)
    useEffect(() => {
      if (typeof eventData !== 'undefined') {
        setMultiDay(eventData.isMultiDay);
      }
    }, [eventData]);

  const { data: matrixData } = useGetMatrices({
    variables: { input: { limit: '1000' } },
  });

  const matrices = matrixData?.getMatrices?.results ?? [];

  // if (!eventData?.getEvent && !newEvent) return null;

  const tabsConfig = [
    {
      id: 0,
      name: 'Dates and Times',
    },
    {
      id: 1,
      name: 'Tickets',
    },
    {
      id: 2,
      name: 'Event Details',
    },
    {
      id: 3,
      name: 'Waivers',
    },
    {
      id: 4,
      name: 'Financial',
    },
    // {
    //   id: 5,
    //   name: 'Registration',
    // },
    {
      id: 6,
      name: 'Lap Sponsor',
    },
    {
      id: 7,
      name: 'Payments',
    },
  ];

  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };

  return (
    <>
      <Formik
        enableReinitialize
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={getInitialValues(eventData?.getEvent, formValues)}
        validate={(values) => {
          const errors = {};

          if (!values.name) {
            errors.name = 'Required';
          }

          if (!values.start_date) {
            errors.start_date = 'Required';
          }

          if (!values.end_date) {
            errors.end_date = 'Required';
          }

          if (currentSeries && !values.track_id) {
            errors.track_id = 'Required';
          }

          const ticketsWithDescriptions = ['admin_tickets'];

          ticketsWithDescriptions.forEach((ticketType) => {
            if (
              !validateTicketDescriptionCharacterCounts(
                values[ticketType],
                DESCRIPTION_CHARACTER_LIMIT
              )
            ) {
              errors[ticketType] = descriptionError;
            }
          });

          const faqErrors = values.faqs.reduce((errors, faq, index) => {
            const { answer, question } = faq;
            const error =
              !answer || !question
                ? {
                    ...(!answer ? { answer: 'Required' } : null),
                    ...(!question ? { question: 'Required' } : null),
                  }
                : undefined;
            return {
              ...errors,
              ...(error
                ? { [index]: error } && toast.error('Please check FAQ details')
                : null),
            };
          }, {});
          if (Object.keys(faqErrors).length > 0) errors.faqs = faqErrors;

          function getFeesErrors(fees) {
            return fees.reduce((errors, fee, index) => {
              const { fee_price, fee_amount, minimum, maximum } = fee;
              const error =
                !fee_price ||
                !fee_amount ||
                (!minimum && 0 !== minimum) ||
                !maximum
                  ? {
                      ...(!fee_price ? { fee_price: 'Required' } : null),
                      ...(!fee_amount ? { fee_amount: 'Required' } : null),
                      ...(!minimum ? { minimum: 'Required' } : null),
                      ...(!maximum ? { maximum: 'Required' } : null),
                    }
                  : undefined;
              return {
                ...errors,
                // If all fields are blank, we won't throw an error
                ...(error ? { [index]: error } : null),
              };
            }, {});
          }

          const otherFeesErrors = getFeesErrors(values.other_fees);
          if (Object.keys(otherFeesErrors).length > 0) {
            errors.other_fees = otherFeesErrors;
            toast.error('Please check other fee details');
          }

          const registrationFeesErrors = getFeesErrors(
            values.registration_fees
          );
          if (Object.keys(registrationFeesErrors).length > 0) {
            errors.registration_fees = registrationFeesErrors;
            toast.error('Please check registration fee details');
          }

          if (Object.keys(errors).length) {
            toast.error('Please check event details');
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          values.admin_other_tickets = [];
          let response;
          setSubmitting(true);

          const data = Object.entries(values).reduce(
            (acc, [key, value]) => ({
              ...acc,
              [key]: value === '' ? null : value,
            }),
            {}
          );

          delete data['single_day'];
          delete data['multiday'];
          delete data['event_capacity'];
          delete data['user_id'];

          if (typeof data['admin_tickets'] !== 'undefined')
            data['admin_tickets'].map((ticket) => {
              delete ticket['type'];
            });

          if (typeof data['admin_multiday_tickets'] !== 'undefined')
            data['admin_multiday_tickets'].map((ticket) => {
              delete ticket['type'];
            });

          if (typeof data['admin_other_tickets'] !== 'undefined')
            data['admin_other_tickets'].map((ticket) => {
              delete ticket['type'];
            });
          if (typeof data['admin_bundle_tickets'] !== 'undefined')
            data['admin_bundle_tickets'].map((ticket) => {
              delete ticket['type'];

              ticket.associated_tickets.map((asso) => {
                delete asso['__typename'];
              });
            });

          if (currentEvent) {
            response = await updateEvent(
              getEventInput({
                data,
                currentTrack,
                currentEvent,
                currentSeries,
                action: 'update',
              })
            );
          } else {
            response = await createEvent(
              getEventInput({
                data,
                currentTrack,
                currentEvent,
                currentSeries,
                action: 'create',
              }),
              //this is for the mutation to know how to update the store
              currentTrack ? 'track' : currentSeries ? 'series' : '',
              currentTrack ? currentTrack : currentSeries
            );
          }

          if (!response || response.errors) {
            errorMessage(response);
            setSubmitting(false);
            return setErrors(response.errors);
          } else {
            successMessage();
            setSubmitting(false);
            history.push('/admin/events');
            handleOutClick();
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          setFieldError,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div>
                <Header>
                  <EventHeader
                    values={values}
                    ENHandleChange={handleChange}
                    ENHandleBlur={handleBlur}
                    ENValues={values.name}
                    ENErrors={errors.name}
                    ENTrack={trackTitle}
                    EDSetFieldValue={setFieldValue}
                    SDValue={values.start_date}
                    SDErrors={errors.start_date}
                    EDValue={values.end_date}
                    EDErrors={errors.end_date}
                    eventId={parseInt(currentEvent)}
                    status_color={values.status_color}
                    editCheck={currentEvent}
                    isMultiDay={is_multiday}
                    trackTitle={trackTitle}
                    statusValues={values.status}
                  />
                </Header>
                <EventBody>
                  <TabContent>
                    <Tabs>
                      {tabsConfig.map((tab) => (
                        <Tab
                          onClick={(e) => handleClick(e)}
                          active={active === tab.id}
                          id={tab.id}
                        >
                          {tab.name}
                        </Tab>
                      ))}

                      <AddUpdateBtn
                        type="submit"
                        style={{}}
                        disabled={isSubmitting}
                        block
                      >
                        {currentEvent ? 'Update Event' : 'Add Event'}
                      </AddUpdateBtn>
                    </Tabs>
                    <>
                      <Content active={active === 0}>
                        <Row>
                          <Col>
                            <SectionTitle>Event Date</SectionTitle>
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <div style={{ display: 'flex' }}>
                              <div style={{ marginRight: '35px' }}>
                                <Checkbox
                                  name="single_day"
                                  className="singleDay"
                                  checked={
                                    is_multiday === null ? false : !is_multiday
                                  }
                                  onChange={(event) => {
                                    const value = event.target?.checked;
                                    handleChange({
                                      target: {
                                        name: 'single_day',
                                        value,
                                      },
                                    });
                                    if (value) {
                                      handleChange({
                                        target: {
                                          name: 'multiday',
                                          value: false,
                                        },
                                      });
                                      setMultiDay(false);
                                    }
                                  }}
                                  onBlur={handleBlur}
                                  error={
                                    errors.hide_fee &&
                                    touched.hide_fee &&
                                    errors.hide_fee
                                  }
                                  rightText="Single Day Event"
                                />
                              </div>
                              <div>
                                <Checkbox
                                  name="multiday"
                                  checked={is_multiday}
                                  onChange={(event) => {
                                    const value = event.target?.checked;
                                    handleChange({
                                      target: {
                                        name: 'multiday',
                                        value,
                                      },
                                    });
                                    if (value) {
                                      handleChange({
                                        target: {
                                          name: 'single_day',
                                          value: false,
                                        },
                                      });
                                      setMultiDay(true);
                                    } else {
                                      setMultiDay(false);
                                    }
                                  }}
                                  onBlur={handleBlur}
                                  error={
                                    errors.hide_fee &&
                                    touched.hide_fee &&
                                    errors.hide_fee
                                  }
                                  rightText="Multi Day Event"
                                />
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <Spacer size={15} />
                        <Row>
                          <Col>
                            {is_multiday !== null && (
                              <DatePicker
                                id="start_date"
                                name="start_date"
                                label="Event Start Date"
                                type="date"
                                is_multiday={is_multiday}
                                test
                                onChange={setFieldValue}
                                value={values.start_date}
                                error={errors.start_date}
                              />
                            )}
                          </Col>
                          <Col>
                            <div
                              onClick={
                                values.start_date === ''
                                  ? () =>
                                      toast.error(
                                        'Event start date is not selected'
                                      )
                                  : null
                              }
                            >
                              {is_multiday && (
                                <DatePicker
                                  id="end_date"
                                  name="end_date"
                                  label="Event End Date"
                                  type="date"
                                  onChange={setFieldValue}
                                  value={values.end_date}
                                  error={errors.end_date}
                                  disabled={
                                    values.start_date === '' ? true : false
                                  }
                                />
                              )}
                            </div>
                          </Col>
                          <Col></Col>
                          <Col></Col>
                        </Row>
                        {is_multiday !== null && (
                          <>
                            <Spacer size={15} />
                            <SectionTitle>On Sale Information</SectionTitle>
                            <Row>
                              <Col>
                                <DatePicker
                                  id="sale_start"
                                  name="sale_start"
                                  label="Ticket Sales Start"
                                  type="date"
                                  test
                                  onChange={setFieldValue}
                                  value={values.sale_start}
                                  error={
                                    errors.sale_start &&
                                    touched.sale_start &&
                                    errors.sale_start
                                  }
                                />
                              </Col>
                              <Col>
                                <div
                                  onClick={
                                    values.sale_start === ''
                                      ? () =>
                                          toast.error(
                                            'Ticket sales start date is not selected'
                                          )
                                      : null
                                  }
                                >
                                  <DatePicker
                                    id="sale_end"
                                    name="sale_end"
                                    label="Ticket Sales End"
                                    type="date"
                                    onChange={setFieldValue}
                                    value={values.sale_end}
                                    error={
                                      errors.sale_end &&
                                      touched.sale_end &&
                                      errors.sale_end
                                    }
                                    disabled={
                                      values.sale_start === '' ? true : false
                                    }
                                  />
                                </div>
                              </Col>
                              <Col>
                                <DatePicker
                                  id={'off_sale_time'}
                                  type="time"
                                  label={`Ticket Off Sale Time`}
                                  name="off_sale_time"
                                  value={values.off_sale_time}
                                  onChange={(name, event) => {
                                    handleChange({
                                      target: {
                                        name,
                                        value: event.target.value,
                                      },
                                    });
                                  }}
                                />
                              </Col>
                            </Row>
                            <Spacer size={18} />
                            <Row>
                              <Col>
                                <DatePicker
                                  id="registration_sale_start"
                                  name="registration_sale_start"
                                  label="Registration Sales Start"
                                  type="date"
                                  test
                                  onChange={setFieldValue}
                                  value={values.registration_sale_start}
                                  error={
                                    errors.registration_sale_start &&
                                    touched.registration_sale_start &&
                                    errors.registration_sale_start
                                  }
                                />
                              </Col>
                              <Col>
                                <div
                                  onClick={
                                    values.registration_sale_start === ''
                                      ? () =>
                                          toast.error(
                                            'Registration sales start date is not selected'
                                          )
                                      : null
                                  }
                                >
                                  <DatePicker
                                    id="registration_sale_end"
                                    name="registration_sale_end"
                                    label="Registration Sales End"
                                    type="date"
                                    onChange={setFieldValue}
                                    value={values.registration_sale_end}
                                    error={
                                      errors.registration_sale_end &&
                                      touched.registration_sale_end &&
                                      errors.registration_sale_end
                                    }
                                    disabled={
                                      values.registration_sale_start === ''
                                        ? true
                                        : false
                                    }
                                  />
                                </div>
                              </Col>
                              <Col>
                                <DatePicker
                                  id={'registration_off_time'}
                                  type="time"
                                  label={`Registration Off Sale Time`}
                                  name="registration_off_time"
                                  value={values.registration_off_time}
                                  onChange={(name, event) => {
                                    handleChange({
                                      target: {
                                        name,
                                        value: event.target.value,
                                      },
                                    });
                                  }}
                                />
                              </Col>
                            </Row>

                            <Spacer size={18} />
                            <div
                              style={{
                                width: '50%',
                              }}
                            >
                              <DateTimeRepeater
                                error={errors.admin_times}
                                dates={values.admin_times || []}
                                eventSD={values.start_date}
                                eventED={values.end_date}
                                onChange={(value) => {
                                  handleChange({
                                    target: { name: 'admin_times', value },
                                  });
                                }}
                              />
                            </div>
                          </>
                        )}
                      </Content>
                      <Content active={active === 1}>
                        <div
                          style={{
                            width: '100%',
                            display: 'flex',
                            padding: '5px',
                          }}
                        >
                          <Tickets
                            tickets={values}
                            onChange={(name, value) => {
                              typeof name === 'string' &&
                                handleChange({
                                  target: { name: name, value },
                                });
                            }}
                            handleSort={(name, value) => {
                              handleChange({
                                target: {
                                  name: name,
                                  value,
                                },
                              });
                            }}
                          />
                        </div>
                      </Content>
                      <Content active={active === 2}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                          }}
                        >
                          <div
                            style={{
                              alignSelf: 'flex-start',
                              width: '48%',
                            }}
                          >
                            <SectionTitle>General Information</SectionTitle>
                            <Input
                              id="name"
                              name="name"
                              label="Event Name"
                              placeholder="Event Name"
                              onChange={handleChange ? handleChange : ''}
                              onBlur={handleBlur ? handleBlur : ''}
                              value={values.name ? values.name : ''}
                              error={errors.name ? errors.name : ''}
                            />
                            <Spacer size={18} />
                            {currentSeries ? (
                              <Tracks
                                values={values}
                                errors={errors}
                                touched={touched}
                                setFieldValue={setFieldValue}
                                setFieldTouched={setFieldValue}
                              />
                            ) : currentTrack ? (
                              <SeriesSelect isMulti />
                            ) : (
                              <>
                                <Tracks
                                  values={values}
                                  errors={errors}
                                  touched={touched}
                                  setFieldValue={setFieldValue}
                                  setFieldTouched={setFieldValue}
                                />{' '}
                                <Spacer size={18} />
                                <SeriesSelect isMulti />
                              </>
                            )}
                            <Spacer size={18} />
                            <Dropzone
                              id="logo_id"
                              files={
                                values.logo_id
                                  ? [
                                      {
                                        name: values.logo_id,
                                        preview: values.logo,
                                      },
                                    ]
                                  : []
                              }
                              onChange={setFieldValue}
                              setError={setFieldError}
                              error={
                                errors.logo_id &&
                                touched.logo_id &&
                                errors.logo_id
                              }
                              label="Event Logo"
                            />
                            <Dropzone
                              id="image_id"
                              files={
                                values.image_id
                                  ? [
                                      {
                                        name: values.image_id,
                                        preview: values.image,
                                      },
                                    ]
                                  : []
                              }
                              onChange={setFieldValue}
                              setError={setFieldError}
                              error={
                                errors.image_id &&
                                touched.image_id &&
                                errors.image_id
                              }
                              label="Event Image"
                            />
                            <Spacer size={24} />
                            <Label>Event Socials</Label>
                            <RowSection leftText="Twitter">
                              <Input
                                id="twitter"
                                placeholder="Twitter Handle"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.twitter}
                                error={
                                  errors.twitter &&
                                  touched.twitter &&
                                  errors.twitter
                                }
                              />
                            </RowSection>
                            <Spacer size={10} />
                            <RowSection leftText="Facebook">
                              <Input
                                id="facebook"
                                placeholder="Facebook Link"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.facebook}
                                error={
                                  errors.facebook &&
                                  touched.facebook &&
                                  errors.facebook
                                }
                              />
                            </RowSection>
                            <Spacer size={10} />
                            <RowSection leftText="Instagram">
                              <Input
                                id="instagram"
                                placeholder="Instagram Handle"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.instagram}
                                error={
                                  errors.instagram &&
                                  touched.instagram &&
                                  errors.instagram
                                }
                              />
                            </RowSection>
                            <Spacer size={24} />
                            <Input
                              id="admin_website_url"
                              label="Event Website"
                              placeholder="Website URL"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.admin_website_url}
                              error={
                                errors.admin_website_url &&
                                touched.admin_website_url &&
                                errors.admin_website_url
                              }
                            />
                            <Spacer size={24} />
                            <Input
                              id="admin_schedule_url"
                              label="Event Schedule"
                              placeholder="Schedule URL"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.admin_schedule_url}
                              error={
                                errors.admin_schedule_url &&
                                touched.admin_schedule_url &&
                                errors.admin_schedule_url
                              }
                            />
                            <Spacer size={18} />
                            <Input
                              id="event_capacity"
                              label="Event Capacity"
                              placeholder="Event Capacity"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.event_capacity}
                              error={
                                errors.event_capacity &&
                                touched.capacity &&
                                errors.capacity
                              }
                            />
                          </div>
                          <div
                            style={{
                              alignSelf: 'flex-start',
                              width: '48%',
                            }}
                          >
                            <Spacer size={24} />
                            <Input
                              inputStyle={{ height: 600 }}
                              id="about"
                              as="textarea"
                              label="Description"
                              placeholder="Description"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.about}
                              error={
                                errors.about && touched.about && errors.about
                              }
                            />
                            <Spacer size={18} />
                            <FaqList />
                          </div>
                        </div>
                      </Content>
                      <Content active={active === 3}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                          }}
                        >
                          <div>
                            <WaiversRepeater
                              handleChange={handleChange}
                              handleBlur={handleBlur}
                              errors={errors}
                              values={values}
                              touched={touched}
                              setFieldValue={setFieldValue}
                              setFieldTouched={setFieldValue}
                              currentTrack={currentTrack}
                              currentSeries={currentSeries}
                              currentEvent={currentEvent}
                              id={currentEvent ?? currentTrack}
                            />
                          </div>
                        </div>
                      </Content>
                      <Content active={active === 4}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                          }}
                        >
                          <div>
                            <SectionTitle>
                              General Financial Options
                            </SectionTitle>
                            {/* <Ownership
                              values={values}
                              errors={errors}
                              touched={touched}
                              id={currentEvent ?? currentTrack}
                              setFieldValue={setFieldValue}
                              currentSeries={currentSeries}
                              currentTrack={currentTrack}
                              currentEvent={currentEvent}
                              setFieldTouched={setFieldValue}
                            />
                            <Spacer size={18} /> */}
                            <AutoSuggest
                              id="matrix_id"
                              label="Fee Matrix"
                              closeMenuOnSelect
                              isClearable
                              options={matrices.map((matrix) => ({
                                value: matrix.id,
                                label: matrix.name,
                              }))}
                              onChange={(value) =>
                                setFieldValue('matrix_id', value)
                              }
                              value={values.matrix_id}
                            />
                            {errors.matrix_id && (
                              <ErrorText fontSize={12}>
                                {errors.matrix_id}
                              </ErrorText>
                            )}
                            <Spacer size={18} />
                            <Checkbox
                              name="international_fee"
                              checked={!!values.international_fee}
                              onChange={(event) => {
                                const value = event.target?.checked;
                                handleChange({
                                  target: {
                                    name: 'international_fee',
                                    value,
                                  },
                                });
                              }}
                              onBlur={handleBlur}
                              error={
                                errors.international_fee &&
                                touched.international_fee &&
                                errors.international_fee
                              }
                              rightText="Collection International Fees?"
                            />
                            <Spacer size={10} />
                            <Checkbox
                              name="hide_fee"
                              checked={!!values.hide_fee}
                              onChange={(event) => {
                                const value = event.target?.checked;
                                handleChange({
                                  target: {
                                    name: 'hide_fee',
                                    value,
                                  },
                                });
                                if (value) {
                                  handleChange({
                                    target: {
                                      name: 'marketing_fee',
                                      value: false,
                                    },
                                  });
                                }
                              }}
                              onBlur={handleBlur}
                              error={
                                errors.hide_fee &&
                                touched.hide_fee &&
                                errors.hide_fee
                              }
                              rightText="Hide Fees at Checkout?"
                            />
                            <Spacer size={18} />
                            <Checkbox
                              name="marketing_fee"
                              checked={!!values.marketing_fee}
                              onChange={(event) => {
                                const value = event.target?.checked;
                                handleChange({
                                  target: {
                                    name: 'marketing_fee',
                                    value,
                                  },
                                });
                              }}
                              onBlur={handleBlur}
                              error={
                                errors.marketing_fee &&
                                touched.marketing_fee &&
                                errors.marketing_fee
                              }
                              rightText="Collect Marketing Fees?"
                            />
                            <Spacer size={24} />
                            <FeesRepeater
                              feeType="other"
                              error={errors.other_fees}
                              fees={values.other_fees || []}
                              onChange={(value) => {
                                handleChange({
                                  target: { name: 'other_fees', value },
                                });
                              }}
                              errors={errors.other_fees}
                            />
                            <Spacer size={24} />
                            <FeesRepeater
                              feeType="registration"
                              error={errors.registration_fees}
                              fees={values.registration_fees || []}
                              onChange={(value) => {
                                handleChange({
                                  target: { name: 'registration_fees', value },
                                });
                              }}
                              errors={errors.registration_fees}
                            />
                          </div>
                        </div>
                      </Content>
                      <Content active={active === 5}>
                        <div
                          style={{
                            width: '100%',
                          }}
                        >
                          <div style={{ width: '50%' }}>
                            <Input
                              id="registration_email"
                              name="registration_email"
                              label="Registration Email"
                              placeholder="test@email.com"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.registration_email}
                              error={errors.registration_email}
                            />
                          </div>
                          <Spacer size={18} />
                          <Tickets
                            customPadding={0}
                            tickets={values.admin_registrations || []}
                            ticketType="admin_registrations"
                            addButtonText="Add Registration"
                            onChange={(value) => {
                              handleChange({
                                target: {
                                  name: 'admin_registrations',
                                  value,
                                },
                              });
                            }}
                            error={errors.admin_registrations}
                          />
                        </div>
                      </Content>
                      <Content active={active === 6}>
                        <div
                          style={{
                            width: '100%',
                          }}
                        >
                          <Row>
                            <Col>
                              <Input
                                id="race_name"
                                name="race_name"
                                label="Race Name"
                                placeholder=""
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.race_name}
                                error={errors.race_name}
                              />
                            </Col>
                            <Col>
                              <Input
                                id="total_laps"
                                name="total_laps"
                                label="Total Laps"
                                placeholder=""
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.total_laps}
                                error={errors.total_laps}
                              />
                            </Col>
                            <Col>
                              <Input
                                id="price"
                                name="price"
                                label="Price"
                                placeholder=""
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.price}
                                error={errors.price}
                              />
                            </Col>
                          </Row>
                          <Row>
                            Breakdown
                            <Col>
                              <div style={{ display: 'flex' }}>
                                <Checkbox
                                  name="first"
                                  checked={!!values.first}
                                  onChange={(event) => {
                                    const value = event.target?.checked;
                                    handleChange({
                                      target: {
                                        name: 'first',
                                        value,
                                      },
                                    });
                                  }}
                                  onBlur={handleBlur}
                                  error={
                                    errors.first &&
                                    touched.first &&
                                    errors.first
                                  }
                                  rightText="1st"
                                />
                                <Input
                                  id="payout1"
                                  name="payout1"
                                  label="Payout"
                                  placeholder=""
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.payout1}
                                  error={errors.payout1}
                                />
                                <Checkbox
                                  name="second"
                                  checked={!!values.second}
                                  onChange={(event) => {
                                    const value = event.target?.checked;
                                    handleChange({
                                      target: {
                                        name: 'second',
                                        value,
                                      },
                                    });
                                  }}
                                  onBlur={handleBlur}
                                  error={
                                    errors.second &&
                                    touched.second &&
                                    errors.second
                                  }
                                  rightText="2nd"
                                />
                                <Input
                                  id="payout2"
                                  name="payout2"
                                  label="Payout"
                                  placeholder=""
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.payout2}
                                  error={errors.payout2}
                                />
                                <Checkbox
                                  name="third"
                                  checked={!!values.third}
                                  onChange={(event) => {
                                    const value = event.target?.checked;
                                    handleChange({
                                      target: {
                                        name: 'third',
                                        value,
                                      },
                                    });
                                  }}
                                  onBlur={handleBlur}
                                  error={
                                    errors.third &&
                                    touched.third &&
                                    errors.third
                                  }
                                  rightText="3rd"
                                />
                                <Input
                                  id="payout3"
                                  name="payout3"
                                  label="Payout"
                                  placeholder=""
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.payout3}
                                  error={errors.payout3}
                                />
                              </div>
                            </Col>
                          </Row>
                          <Spacer size={18} />
                        </div>
                      </Content>
                      <Content active={active === 7}>
                        <div style={{ display: 'flex' }}>
                          <div style={{ width: '40%' }}>
                            <Account
                              values={values}
                              errors={errors}
                              touched={touched}
                              id={currentEvent ?? currentTrack}
                              setFieldValue={setFieldValue}
                              currentSeries={currentSeries}
                              currentTrack={currentTrack}
                              currentEvent={currentEvent}
                              setFieldTouched={setFieldValue}
                            />
                            <Spacer size={20}></Spacer>
                            <Checkbox
                              name="hide_fee"
                              checked={!!values.hide_fee}
                              onChange={(event) => {
                                const value = event.target?.checked;
                                handleChange({
                                  target: {
                                    name: 'hide_fee',
                                    value,
                                  },
                                });
                              }}
                              onBlur={handleBlur}
                              error={
                                errors.hide_fee &&
                                touched.hide_fee &&
                                errors.hide_fee
                              }
                              rightText="Promoter Absorbs Fees"
                            />
                            <Spacer size={20}></Spacer>
                            <Checkbox
                              name="international_fee"
                              checked={!!values.international_fee}
                              onChange={(event) => {
                                const value = event.target?.checked;
                                handleChange({
                                  target: {
                                    name: 'international_fee',
                                    value,
                                  },
                                });
                              }}
                              onBlur={handleBlur}
                              error={
                                errors.international_fee &&
                                touched.international_fee &&
                                errors.international_fee
                              }
                              rightText="Collect Int'l Fees"
                            />
                            <Spacer size={20}></Spacer>
                            <Checkbox
                              name="marketing_fee"
                              checked={!!values.marketing_fee}
                              onChange={(event) => {
                                const value = event.target?.checked;
                                handleChange({
                                  target: {
                                    name: 'marketing_fee',
                                    value,
                                  },
                                });
                              }}
                              onBlur={handleBlur}
                              error={
                                errors.marketing_fee &&
                                touched.marketing_fee &&
                                errors.marketing_fee
                              }
                              rightText="1% Cash Back"
                            />
                          </div>
                          <div style={{ width: '20%' }}></div>
                          <div style={{ width: '40%' }}>
                            <NoteList />
                            <Spacer size={20} />
                            {currentEvent && values.added_by && (
                              <h2>Created By : {values.added_by}</h2>
                            )}
                            <Spacer size={10} />
                            {currentEvent && values.updated_by && (
                              <h2>Updated By : {values.updated_by}</h2>
                            )}
                            <Spacer size={20} />
                          </div>
                        </div>
                      </Content>
                    </>
                  </TabContent>
                  {/* <EditEventSidebar
                    addedByValues={values.added_by}
                    addedByErrors={errors}
                    addedByTouched={touched}
                    addedBySetFieldValue={setFieldValue}
                    addedByCurrentSeries={currentSeries}
                    addedSetFieldTouched={setFieldValue}
                    statusOptions={[
                      { label: 'Draft', value: 'draft' },
                      { label: 'Published', value: 'published' },
                      { label: 'Postponed', value: 'postponed' },
                      { label: 'Cancelled', value: 'cancelled' },
                    ]}
                    statusValues={values.status}
                    statusHandleChange={handleChange}
                    statusHandleBlur={handleBlur}
                    currentEvent={currentEvent}
                    isSubmitting={isSubmitting}
                  /> */}
                </EventBody>
              </div>
            </form>
          );
        }}
      </Formik>
    </>
  );
};

function getTimes(date) {
  if (!date) return;
  return moment(date).format('HH:mm:ss');
}

function setTime(value) {
  if (!value) {
    const defaultTime = new Date();
    defaultTime.setHours(18);
    defaultTime.setMinutes(0);
    return defaultTime;
  }

  if (Object.prototype.toString.call(value) === '[object Date]') {
    return value;
  }

  const pieces = value.split(':');

  const date = new Date();

  date.setHours(parseInt(pieces[0]));
  date.setMinutes(parseInt(pieces[1]));

  return date;
}

export default AddEvents;
