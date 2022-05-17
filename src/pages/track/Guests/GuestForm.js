import dayjs from 'dayjs';
import { Formik } from 'formik';
import React from 'react';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Button } from 'components/Button';
import { Drawer, DrawerPadding } from 'components/Drawer';
import { AutoSuggest } from 'components/Form/AutoSuggest';
import { DatePicker } from 'components/Form/DatePicker';
import { Input } from 'components/Form/Input';
import { PhoneInput } from 'components/Form/PhoneInput';
import { Radio } from 'components/Form/Radio';
import { ErrorText } from 'components/Form/styles';
import { OwnershipInput } from 'components/Ownership';
import { useMyOwnershipQuery } from 'components/Ownership/gql/me';
import Spacer from 'components/Spacer';
import { useCreateGuest } from './gql/useCreateGuest';
import { useGetGuestAndUserNotificationEvents } from './gql/useGetGuest';
import { useUpdateGuest } from './gql/useUpdateGuest';

const FormLabel = styled.p`
  margin-bottom: 20px;
  color: #fff;
  font-weight: 600;
  font-family: 'Barlow Condensed';
  text-align: left;
  font-size: 20px;
  line-height: 29px;

  @media (min-width: 768px) {
    color: #000;
  }
`;

const GuestInviteMessage = styled.p`
  color: ${(props) => props.theme.colors.primary};
  font-size: 1rem;
  line-height: 1.2;
`;

export const hasMoreThanOneVenue = (user) => {
  if (!user.ownership.tracks.length && !user.ownership.series.length)
    return false;

  if (user.ownership.tracks.length + user.ownership.series.length < 2)
    return false;

  return true;
};

export const GuestForm = ({
  isVisible,
  handleOutClick,
  guestId,
  guestTypeToAdd,
  queryString,
  setNewGuestData,
}) => {
  const successMessage = () =>
    toast.success(guestId ? 'Guest Updated' : 'Guest Created');
  const errorMessage = () =>
    toast.error(guestId ? 'Error Updating Guest' : 'Error Creating Guest');

  const { id: eventId } = useParams();
  const { data } = useGetGuestAndUserNotificationEvents(guestId);
  const { data: myOwnershipData } = useMyOwnershipQuery();
  const createGuest = useCreateGuest({ queryString });
  const updateGuest = useUpdateGuest();

  const guest = data?.getGuest;
  if (!guest && guestId) return null;

  const events = data?.getUserEvents.results ?? [];

  return (
    <Drawer
      title={guestId ? 'Edit Guest Details' : 'Create New Guest'}
      isVisible={isVisible}
      handleOutClick={handleOutClick}
    >
      <Formik
        enableReinitialize={true}
        initialValues={{
          first_name: guest?.first_name ?? '',
          last_name: guest?.last_name ?? '',
          phone_number: guest?.phone_number ?? '',
          year:
            guestTypeToAdd === 'yearly_guests'
              ? dayjs().format('YYYY')
              : guest?.year
              ? String(guest.year)
              : dayjs().format('YYYY'),
          event_id:
            guestTypeToAdd === 'event_guests' ? eventId : guest?.event_id ?? '',
          additional_guests: guest?.additional_guests ?? '',
          notes: guest?.notes ?? '',
          guest_type:
            guestTypeToAdd === 'event_guests'
              ? 'event_guests'
              : guestTypeToAdd === 'yearly_guests'
              ? 'yearly_guests'
              : guest?.year
              ? 'yearly_guests'
              : guest?.event_id
              ? 'event_guests'
              : '',
          ownership: guest?.ownership ?? '',
        }}
        validate={(values) => {
          const errors = {
            ...(!values.first_name ? { first_name: 'Required' } : null),
            ...(!values.last_name ? { last_name: 'Required' } : null),
            ...(values.phone_number &&
            !isPossiblePhoneNumber(values.phone_number)
              ? { phone_number: 'Please enter a valid phone number' }
              : null),
            ...(!values.guest_type ? { guest_type: 'Required' } : null),
            ...(values.guest_type === 'yearly_guests' && !values.year
              ? { guest_type: 'Required' }
              : null),
            ...(values.guest_type === 'event_guests' && !values.event_id
              ? { guest_type: 'Required' }
              : null),
            ...(values.guest_type === 'yearly_guests' &&
            hasMoreThanOneVenue(myOwnershipData?.me) &&
            (!values.ownership || values.ownership === '')
              ? { ownership: 'Required' }
              : null),
          };

          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          setSubmitting(true);

          const data = Object.entries(values).reduce(
            (fieldValues, [key, value]) => {
              const fieldValue = value === '' ? null : value;
              return {
                ...fieldValues,
                [key]: fieldValue,
              };
            },
            {}
          );

          const mutation = guestId ? updateGuest : createGuest;

          const ownedTrackOrSeries =
            myOwnershipData?.me?.ownership?.tracks?.[0]?.id ??
            myOwnershipData?.me?.ownership?.series?.[0]?.id;
          const ownership = data.ownership?.value ?? ownedTrackOrSeries;

          const input = {
            ...(guestId ? { id: Number(guestId) } : null),
            first_name: data.first_name,
            last_name: data.last_name,
            phone_number: data.phone_number,
            year:
              data.guest_type === 'yearly_guests' ? Number(data.year) : null,
            event_id:
              data.guest_type === 'event_guests' ? Number(data.event_id) : null,
            notes: data.notes,
            additional_guests: Number(data.additional_guests),
            ownership: ownership ? Number(ownership) : null,
          };

          const response = await mutation(input);
          if (response.data.createGuest) {
            setNewGuestData(response.data.createGuest);
          }

          if (response.data.createGuest) {
            setNewGuestData(response.data.createGuest);
          }

          setSubmitting(false);

          if (!response || response.errors) {
            errorMessage();
            return setErrors(response.errors);
          }

          successMessage();
          resetForm();
          handleOutClick();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          isSubmitting,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <>
                <DrawerPadding border>
                  <FormLabel style={{ color: '#00001f' }}>
                    {guestId
                      ? 'Fill out the form to edit a guests information'
                      : 'Fill out the form to add a new guest'}
                  </FormLabel>
                  <Spacer size={18} />
                  <Input
                    id="first_name"
                    label="First Name"
                    placeholder="First Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.first_name}
                    error={
                      errors.first_name &&
                      touched.first_name &&
                      errors.first_name
                    }
                  />
                  <Spacer size={18} />
                  <Input
                    id="last_name"
                    label="Last Name"
                    placeholder="Last Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.last_name}
                    error={
                      errors.last_name && touched.last_name && errors.last_name
                    }
                  />
                  <Spacer size={18} />
                  <PhoneInput
                    id="phone_number"
                    label="Mobile Phone Number"
                    placeholder="Mobile Phone Number"
                    onBlur={handleBlur}
                    onChange={(value) => {
                      setFieldValue('phone_number', value ?? '');
                    }}
                    value={values.phone_number}
                    error={touched.phone_number && errors.phone_number}
                  />
                  <Spacer size={18} />
                  <Radio
                    title="Event Guest to"
                    name="guest_type"
                    value={values.guest_type}
                    options={[
                      {
                        value: 'yearly_guests',
                        label: 'The entire year',
                      },
                      {
                        value: 'event_guests',
                        label: 'A single event',
                      },
                    ]}
                    onChange={(event) => {
                      setFieldValue('guest_type', event.target.value);
                    }}
                  />
                  {touched.guest_type && errors.guest_type && (
                    <ErrorText>{errors.guest_type}</ErrorText>
                  )}
                  {values.guest_type === 'yearly_guests' && (
                    <>
                      <Spacer size={18} />
                      <DatePicker
                        id="year"
                        name="year"
                        label="Year"
                        onChange={(name, value) => {
                          setFieldValue(
                            name,
                            value ? dayjs(value).format('YYYY') : ''
                          );
                        }}
                        onBlur={handleBlur}
                        value={values.year}
                        error={touched.year && errors.year}
                        type="date"
                        showYearPicker
                        dateFormat="yyyy"
                      />
                    </>
                  )}
                  {values.guest_type === 'event_guests' && (
                    <>
                      <Spacer size={18} />
                      <AutoSuggest
                        name="event_id"
                        id="event_id"
                        label="Event"
                        isClearable
                        placeholder="Event"
                        onChange={(value) =>
                          setFieldValue('event_id', value?.value ?? '')
                        }
                        value={
                          values.event_id
                            ? {
                                value: values.event_id,
                                label:
                                  events.find(
                                    (event) =>
                                      event.id === Number(values.event_id)
                                  )?.name ?? '',
                              }
                            : null
                        }
                        error={touched.event_id && errors.event_id}
                        closeMenuOnSelect
                        options={events.map((event) => {
                          const {
                            id,
                            date,
                            day,
                            isMultiDay,
                            listDates,
                            month,
                            name,
                          } = event;
                          return {
                            value: Number(id),
                            label: isMultiDay
                              ? `${month.toUpperCase()} ${listDates} - ${name}`
                              : `${day} ${date} - ${name}`,
                          };
                        })}
                      />
                      {touched.event_id && errors.event_id && (
                        <ErrorText>{errors.event_id}</ErrorText>
                      )}
                    </>
                  )}
                  {values.guest_type === 'yearly_guests' && (
                    <>
                      <Spacer size={18} />
                      <OwnershipInput
                        label="Select a track or series"
                        placeholder="Select a track or series..."
                        value={values.ownership}
                        error={touched.ownership && errors.ownership}
                        setFieldValue={setFieldValue}
                      />
                    </>
                  )}
                  <Spacer size={18} />
                  <Input
                    id="additional_guests"
                    label="Additional Guests Allowed"
                    placeholder="Number of Additional Guests."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.additional_guests}
                    error={
                      errors.additional_guests &&
                      touched.additional_guests &&
                      errors.additional_guests
                    }
                  />
                  <Spacer size={12} />
                  {!guestId && (
                    <GuestInviteMessage>
                      Enter the number of additional guests this person can
                      bring.
                    </GuestInviteMessage>
                  )}
                  <Spacer size={18} />
                  <Input
                    id="notes"
                    as="textarea"
                    label="Internal Guest Notes"
                    placeholder="Enter a note about this guest"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.notes}
                    error={errors.notes && touched.notes && errors.notes}
                  />
                  <Spacer size={12} />
                  {!guestId && (
                    <GuestInviteMessage>
                      If the guest's mobile number is added above, they will
                      receive a text message notifying them that they are on the
                      guest list for the season or event, and how many guests
                      that they may bring.
                    </GuestInviteMessage>
                  )}
                </DrawerPadding>
              </>
              <DrawerPadding>
                <Button type="submit" disabled={isSubmitting} block>
                  {guestId ? 'Update Guest' : 'Add and Invite'}
                </Button>
              </DrawerPadding>
            </form>
          );
        }}
      </Formik>
    </Drawer>
  );
};
