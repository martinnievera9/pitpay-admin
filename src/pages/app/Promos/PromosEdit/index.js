import dayjs from 'dayjs';
import { Formik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import { compose } from 'recompose';
import { Button } from 'components/Button';
import { Drawer, DrawerPadding } from 'components/Drawer';
import { Checkbox } from 'components/Form/Checkbox';
import { DatePicker } from 'components/Form/DatePicker';
import { Input } from 'components/Form/Input';
import Loading from 'components/Loading';
import { SeriesSelect } from 'components/SeriesSelect';
import Spacer from 'components/Spacer';
import Tracks from '../../Events/EventEdit/tracks';
import CreatePromo from '../gql/mutations/create-promo';
import UpdatePromo from '../gql/mutations/update-promo';
import GetPromo from '../gql/queries/get-promo';

const formValues = [
  'name',
  'dollar_amount',
  'service_discount',
  'expiration',
  'no_expiration',
  'free_ticket',
  'limit',
  'track_id',
  'series_id',
];

const PromoEdit = ({
  isVisible,
  handleOutClick,
  currentPromo,
  data,
  updatePromo,
  createPromo,
  newPromo,
}) => {
  const successMessage = () =>
    toast.success(currentPromo ? 'Promo Updated' : 'Promo Created');
  const errorMessage = (response) =>
    toast.error(
      currentPromo
        ? response.global
          ? 'Error Updating Promo'
          : "There were errors with your submission check the form's field for errors."
        : 'Error Creating Promo'
    );

  const adminTrack = window.location.pathname.indexOf('/admin-track');

  if (data.loading) return <Loading />;

  if (!data.getPromo && !newPromo) return null;

  const initial = formValues.reduce((acc, value) => {
    if (data.getPromo) {
      if (value === 'no_expiration') {
        acc[value] = data.getPromo[value] || false;
        return acc;
      }

      if (value === 'free_ticket') {
        acc[value] = data.getPromo[value] || false;
        return acc;
      }

      acc[value] = data.getPromo[value];
      return acc;
    }

    acc[value] = '';
    return acc;
  }, {});

  return (
    <Drawer
      title={currentPromo ? 'Edit Promo Code' : 'Create Promo Code'}
      isVisible={isVisible}
      handleOutClick={handleOutClick}
    >
      <Formik
        initialValues={initial}
        // initialValues={{ name: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Required';
          }

          if (!values.dollar_amount) {
            errors.dollar_amount = 'Required';
          }

          if (values.track_id && values.series_ids) {
            errors.track_id =
              'You cannot select a track and a series at the same time.';
            errors.series_ids =
              'You cannot select a track and a series at the same time.';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          let response;
          setSubmitting(true);

          const data = Object.entries(values).reduce((acc, entry) => {
            if (entry[0] === 'expiration') {
              acc[entry[0]] = entry[1]
                ? dayjs(entry[1]).format('MMM DD - YYYY')
                : null;
              return acc;
            }

            if (entry[0] === 'service_discount') {
              acc[entry[0]] = parseFloat(entry[1]);
              return acc;
            }

            if (entry[0] === 'dollar_amount') {
              acc[entry[0]] = parseFloat(entry[1]);
              return acc;
            }

            if (entry[0] === 'track_id') {
              acc[entry[0]] = entry[1];
              return acc;
            }

            if (entry[0] === 'series_ids') {
              acc['series_id'] = entry[1];
              return acc;
            }

            acc[entry[0]] = '' === entry[1] ? null : entry[1];
            return acc;
          }, {});

          if (currentPromo) {
            response = await updatePromo({
              ...data,
              expiration: values.expiration ? values.expiration : null,
              id: currentPromo,
              limit: parseInt(values.limit),
              track_id: data.track_id ? data.track_id.value : null,
              series_id: data.series_id ? data.series_id.value : null,
            });
          } else {
            response = await createPromo({
              ...data,
              expiration: values.expiration ? values.expiration : null,
              track_id: data.track_id ? data.track_id.value : null,
              series_id: data.series_id ? data.series_id.value : null,
              limit: parseInt(values.limit),
            });
          }

          setSubmitting(false);

          if (!response || response.errors) {
            errorMessage(response);
            return setErrors(response.errors);
          }

          successMessage();
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
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <DrawerPadding border>
              <Input
                label="Promo Code Name"
                name="name"
                placeholder="Promo Code Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={errors.name && touched.name && errors.name}
              />
              <Spacer size={18} />
              <Input
                label="Ticket Discount"
                name="dollar_amount"
                placeholder="25.00"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.dollar_amount}
                error={
                  errors.dollar_amount &&
                  touched.dollar_amount &&
                  errors.dollar_amount
                }
              />
              <p style={{ textAlign: 'center', fontSize: 12, marginTop: 4 }}>
                Transaction fees may apply
              </p>

              {adminTrack === 0 ? null : (
                <>
                  <Spacer size={18} />
                  <Input
                    label="Service Charge Discount"
                    name="service_discount"
                    placeholder="0 - 100"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.service_discount}
                    error={
                      errors.service_discount &&
                      touched.service_discount &&
                      errors.service_discount
                    }
                  />
                </>
              )}
              <Spacer size={18} />
              <Input
                label="Use Limit"
                name="limit"
                placeholder="Number of Times Code Can Be Used"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.limit}
                error={errors.limit && touched.limit && errors.limit}
              />
              <Spacer size={18} />
              <DatePicker
                label="Expiration Date"
                type="date"
                name="expiration"
                onChange={setFieldValue}
                value={values.expiration || ''}
              />
              <Spacer size={18} />
              <Checkbox
                name="no_expiration"
                checked={values.no_expiration}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  errors.no_expiration &&
                  touched.no_expiration &&
                  errors.no_expiration
                }
                value={values.no_expiration || ''}
                rightText="No Expiration date for this code"
              />
              <Spacer size={18} />

              {adminTrack === 0 ? (
                <div>
                  <Checkbox
                    name="free_ticket"
                    checked={values.free_ticket}
                    onChange={() => {
                      setFieldValue(
                        'service_discount',
                        true === !values.free_ticket ? 100 : 0
                      );
                      setFieldValue('free_ticket', !values.free_ticket);
                    }}
                    onBlur={handleBlur}
                    error={
                      errors.free_ticket &&
                      touched.free_ticket &&
                      errors.free_ticket
                    }
                    rightText="Waive Service Fees"
                  />
                  <Spacer size={18} />
                </div>
              ) : null}

              {adminTrack === 0 ? null : (
                <div>
                  <Tracks
                    values={values}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldValue}
                  />
                  <Spacer size={18} />
                  <SeriesSelect />
                </div>
              )}
            </DrawerPadding>

            <DrawerPadding>
              <Button type="submit" disabled={isSubmitting} block>
                Save Promo Code
              </Button>
            </DrawerPadding>
          </form>
        )}
      </Formik>
    </Drawer>
  );
};

export default compose(UpdatePromo, CreatePromo, GetPromo)(PromoEdit);
