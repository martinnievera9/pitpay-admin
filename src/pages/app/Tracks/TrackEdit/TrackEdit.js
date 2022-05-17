import { Formik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import { compose } from 'recompose';
import { Button } from 'components/Button';
import { Drawer, DrawerPadding } from 'components/Drawer';
import { FaqList } from 'components/Faqs';
import { AutoSuggest } from 'components/Form/AutoSuggest';
import { Dropzone } from 'components/Form/Dropzone';
import { Input } from 'components/Form/Input';
import { Select } from 'components/Form/Select';
import { Label } from 'components/Form/styles';
import RowSection from 'components/RowSection';
import Spacer from 'components/Spacer';
import States from 'shared/us-states';
import { useGetTrackEditData } from './gql';
import CreateTrack from './gql/createTrack';
import UpdateTrack from './gql/updateTrack';
import Types from './Types';

const formValues = [
  'name',
  'short_name',
  'street',
  'state',
  'city',
  'zipcode',
  'phone',
  'timezone',
  'website',
  'added_by',
  'schedule',
  'user_id',
  'type_id',
  'bio',
  'twitter',
  'facebook',
  'instagram',
  'status',
  'size',
  'image_id',
  'image',
  'logo_id',
  'logo',
  'faqs',
];

function getInitialValues(track, keys) {
  const { type, faqs } = track ?? {};
  const blankValues = {
    ...keys.reduce((values, key) => ({ ...values, [key]: '' }), {}),
    faqs: [],
  };
  const initialValues = !track
    ? blankValues
    : {
        ...keys.reduce((formValues, key) => {
          return track[key]
            ? {
                ...formValues,
                [key]: track[key],
              }
            : formValues;
        }, {}),
        type_id: type?.id ?? '',
        type: type?.key,
        faqs: faqs?.map((faq) => {
          const { __typename, order, ...rest } = faq;
          return { ...rest };
        }),
      };
  return initialValues;
}

function getTrackInput({ data, currentTrack, action }) {
  const input = {
    ...data,
    ...(action === 'update' && currentTrack ? { id: currentTrack } : null),
    ...(action === 'update' && currentTrack
      ? { type_id: String(data.type_id) }
      : null),
    user_id: data?.user_id?.value ?? data?.user_id,
    faqs: data.faqs.map((faq, index) => {
      const { chosen, selected, filtered, ...rest } = faq;
      return {
        ...rest,
        order: index,
      };
    }),
  };
  return input;
}

const TrackEdit = ({
  isVisible,
  handleOutClick,
  createTrack,
  updateTrack,
  currentTrack,
}) => {
  const successMessage = () =>
    toast.success(currentTrack ? 'Track Updated' : 'Track Created');
  const errorMessage = (response) =>
    toast.error(
      currentTrack
        ? response.global
          ? 'Error Updating Track'
          : "There were errors with your submission check the form's field for errors."
        : 'Error Creating Track'
    );

  const { data } = useGetTrackEditData(currentTrack);

  if (currentTrack && !data?.getTrack) return null;

  return (
    <Drawer
      title={!currentTrack ? 'New Track Details' : 'Edit Track Details'}
      isVisible={isVisible}
      handleOutClick={handleOutClick}
    >
      <Formik
        enableReinitialize={true}
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={getInitialValues(data?.getTrack, formValues)}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Required';
          }

          if (!values.timezone) {
            errors.timezone = 'Required';
          }

          if (!values.type_id) {
            errors.type_id = 'Required';
          }

          if (!values.street) {
            errors.street = 'Required';
          }

          if (!values.city) {
            errors.city = 'Required';
          }

          if (!values.state) {
            errors.state = 'Required';
          }

          if (!values.zipcode) {
            errors.zipcode = 'Required';
          }

          if (!values.phone) {
            errors.phone = 'Required';
          }

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
              ...(error ? { [index]: error } : null),
            };
          }, {});
          if (Object.keys(faqErrors).length > 0) errors.faqs = faqErrors;

          if (Object.keys(errors).length) {
            toast.error('Please check your form for errors.');
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          let response;
          setSubmitting(true);

          const fieldsToDelete = ['logo', 'image', 'waivers'];
          const data = Object.entries(values).reduce((acc, [key, value]) => {
            if (fieldsToDelete.includes(key)) {
              return acc;
            }

            return {
              ...acc,
              [key]: value === '' ? null : value,
            };
          }, {});

          if (currentTrack) {
            response = await updateTrack(
              getTrackInput({ data, currentTrack, action: 'update' })
            );
          } else {
            response = await createTrack(
              getTrackInput({ data, currentTrack, action: 'create' })
            );
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
          setFieldValue,
          handleChange,
          setFieldTouched,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldError,
        }) => (
          <form onSubmit={handleSubmit}>
            <DrawerPadding border>
              <Dropzone
                id="logo_id"
                files={
                  values.logo_id
                    ? [{ name: values.logo_id, preview: values.logo }]
                    : []
                }
                onChange={setFieldValue}
                setError={setFieldError}
                error={errors.logo_id || touched.logo_id}
                label="Track Logo"
              />
              <Dropzone
                id="image_id"
                files={
                  values.image_id
                    ? [{ name: values.image_id, preview: values.image }]
                    : []
                }
                onChange={setFieldValue}
                setError={setFieldError}
                error={errors.image_id || touched.image_id}
                label="Track Image"
              />
            </DrawerPadding>
            <DrawerPadding border>
              <Input
                id="name"
                label="Track Name"
                placeholder="Track Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={errors.name}
              />
              <Spacer size={18} />
              <Input
                id="short_name"
                label="Track Short Name"
                placeholder="Short Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.short_name}
                error={errors.short_name}
              />
              <Spacer size={18} />
              <Input
                id="street"
                label="Track Location"
                placeholder="Street"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.street}
                error={errors.street || touched.street}
              />
              <Spacer size={10} />
              <Input
                id="city"
                placeholder="City"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.city}
                error={errors.city || touched.city}
              />
              <Spacer size={10} />
              <Select
                id="state"
                placeholder="State"
                options={States}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.state}
                error={errors.state || touched.state}
              />
              <Spacer size={10} />
              <Input
                id="zipcode"
                placeholder="Zip Code"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.zipcode}
                error={errors.zipcode || touched.zipcode}
              />
              <Spacer size={18} />
              <Input
                id="phone"
                label="Phone Number"
                placeholder="Phone Number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                error={errors.phone || touched.phone}
              />
              <Spacer size={18} />
              <Select
                id="timezone"
                label="Time Zone"
                placeholder="Time Zone"
                options={[
                  { label: 'EST', value: 'America/New_York' },
                  { label: 'PST', value: 'America/Los_Angeles' },
                  { label: 'CST', value: 'America/Chicago' },
                  { label: 'MST', value: 'America/Denver' },
                ]}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.timezone}
                error={errors.timezone || touched.timezone}
              />
              <Spacer size={18} />
              <Input
                id="website"
                label="Website"
                placeholder="Website URL"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.website}
                error={errors.website || touched.website}
              />
              <Spacer size={10} />
              <Input
                id="schedule"
                placeholder="Schedule URL"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.schedule}
                error={errors.schedule || touched.schedule}
              />
              <Spacer size={18} />
              <Types
                name="type_id"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.type_id}
                errors={errors}
              />
              <Spacer size={10} />
              <Input
                id="size"
                placeholder="Track Size (eg. 1/2)"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.size}
                error={errors.size || touched.size}
              />
              <Spacer size={18} />
              <Input
                id="bio"
                as="textarea"
                label="Track Bio"
                placeholder="Enter a short bio about the track"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.bio}
                error={errors.bio || touched.bio}
              />
              <Spacer size={18} />
              <Label>Social</Label>
              <RowSection leftText="Twitter">
                <Input
                  id="twitter"
                  placeholder="Twitter Handle"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.twitter}
                  error={errors.twitter || touched.twitter}
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
                  error={errors.facebook || touched.facebook}
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
                  error={errors.instagram || touched.instagram}
                />
              </RowSection>
              <Spacer size={18} />

              <FaqList />
              <Spacer size={18} />
              <AutoSuggest
                name="user_id"
                label="Track Owner"
                value={data?.getAllUsers.map((item) => {
                  return item.id === values.user_id
                    ? {
                        value: item.id,
                        label: `${item.first_name} ${
                          item.middle_name ? item.middle_name : ''
                        } ${item.last_name}`,
                      }
                    : null;
                })}
                error={errors.user_id}
                touched={touched.user_id}
                onChange={({ value }) => {
                  setFieldValue('user_id', value);
                }}
                onBlur={() => setFieldTouched('user_id', true)}
                closeMenuOnSelect
                options={data?.getAllUsers.map((item) => ({
                  value: item.id,
                  label: `${item.first_name} ${
                    item.middle_name ? item.middle_name : ''
                  } ${item.last_name}`,
                }))}
              />
              <Spacer size={18} />
              <AutoSuggest
                name="added_by"
                label="Added By"
                value={data?.getAllUsers.map((item) => {
                  return item.id === values.added_by
                    ? {
                        value: item.id,
                        label: `${item.first_name} ${
                          item.middle_name ? item.middle_name : ''
                        } ${item.last_name}`,
                      }
                    : null;
                })}
                error={errors.added_by}
                touched={touched.added_by}
                onChange={({ value }) => {
                  setFieldValue('added_by', value);
                }}
                onBlur={() => setFieldTouched('added_by', true)}
                closeMenuOnSelect
                options={data?.getAllUsers.map((item) => ({
                  value: item.id,
                  label: `${item.first_name} ${
                    item.middle_name ? item.middle_name : ''
                  } ${item.last_name}`,
                }))}
              />
              <Spacer size={18} />
              <Select
                id="status"
                label="Status"
                placeholder="Status"
                options={[
                  { label: 'Draft', value: 'draft' },
                  { label: 'Published', value: 'published' },
                ]}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.status}
                error={errors.status || touched.status}
              />
            </DrawerPadding>

            <DrawerPadding>
              <Button type="submit" disabled={isSubmitting} block>
                {currentTrack ? 'Update Track' : 'Add Track'}
              </Button>
            </DrawerPadding>
          </form>
        )}
      </Formik>
    </Drawer>
  );
};

export default compose(CreateTrack, UpdateTrack)(TrackEdit);
