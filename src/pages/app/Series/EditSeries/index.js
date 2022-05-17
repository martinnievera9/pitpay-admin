import { Formik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import { compose } from 'recompose';
import { Button } from 'components/Button';
import { Drawer, DrawerPadding } from 'components/Drawer';
import { AutoSuggest } from 'components/Form/AutoSuggest';
import { Dropzone } from 'components/Form/Dropzone';
import { Input } from 'components/Form/Input';
import { Select } from 'components/Form/Select';
import { Label } from 'components/Form/styles';
import RowSection from 'components/RowSection';
import Spacer from 'components/Spacer';
import CreateSeries from '../gql/mutations/create-series';
import UpdateSeries from '../gql/mutations/update-series';
import GetSeriesDetail from '../gql/queries/get-single-series';

const formValues = [
  'name',
  'short_name',
  'website',
  'schedule',
  'type_id',
  'added_by',
  'bio',
  'twitter',
  'facebook',
  'instagram',
  'status',
  'image_id',
  'logo_id',
  'image',
  'logo',
  'user_id',
];

const SeriesEdit = ({
  isVisible,
  handleOutClick,
  data,
  createSeries,
  updateSeries,
  currentSeries,
  setFieldTouched,
}) => {
  const successMessage = () =>
    toast.success(currentSeries ? 'Series Updated' : 'Series Created');
  const errorMessage = (response) =>
    toast.error(
      currentSeries
        ? response.global
          ? 'Error Updating Series'
          : "There were errors with your submission check the form's field for errors."
        : 'Error Creating Series'
    );

  if (data.loading) return <div />;

  return (
    <Drawer
      title={!currentSeries ? 'New Series Details' : 'Edit Series Details'}
      isVisible={isVisible}
      handleOutClick={handleOutClick}
    >
      <Formik
        enableReinitialize={true}
        initialValues={formValues.reduce((acc, value) => {
          acc[value] =
            currentSeries && data.getSeriesDetail && data.getSeriesDetail[value]
              ? data.getSeriesDetail[value]
              : '';

          return acc;
        }, {})}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Required';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          let response;
          setSubmitting(true);

          const data = Object.entries(values).reduce((acc, entry) => {
            acc[entry[0]] = '' === entry[1] ? null : entry[1];
            return acc;
          }, {});

          if (currentSeries) {
            delete data.logo;
            delete data.image;
            response = await updateSeries({
              ...data,
              id: currentSeries,
              type_id: data.type_id.toString(),
            });
          } else {
            delete data.logo;
            delete data.image;
            response = await createSeries({
              ...data,
              type_id: data.type_id.toString(),
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
                error={errors.logo_id && touched.logo_id && errors.logo_id}
                label="Series Logo"
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
                error={errors.image_id && touched.image_id && errors.image_id}
                label="Series Image"
              />
            </DrawerPadding>
            <DrawerPadding border>
              <Input
                id="name"
                label="Name"
                placeholder="Series Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={errors.name && touched.name && errors.name}
              />

              <Spacer size={18} />
              <Input
                id="short_name"
                label="Series Short Name"
                placeholder="Short Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.short_name}
                error={
                  errors.short_name && touched.short_name && errors.short_name
                }
              />

              <Spacer size={18} />
              <Input
                id="website"
                label="Website URL"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.website}
                error={errors.website && touched.website && errors.website}
              />
              <Spacer size={18} />
              <Input
                id="schedule"
                label="Schedule URL"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.schedule}
                error={errors.schedule && touched.schedule && errors.schedule}
              />

              <Spacer size={18} />
              <Select
                id="type_id"
                label="Series Type"
                options={data.getSeriesTypes.map((type) => ({
                  value: type.id,
                  label: type.key,
                }))}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.type_id}
                error={errors.type_id && touched.type_id && errors.type_id}
              />
              <Spacer size={18} />
              <Input
                id="bio"
                as="textarea"
                label="Series Bio"
                placeholder="Enter a short bio about the series"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.bio}
                error={errors.bio && touched.bio && errors.bio}
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
                  error={errors.twitter && touched.twitter && errors.twitter}
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
                  error={errors.facebook && touched.facebook && errors.facebook}
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
                    errors.instagram && touched.instagram && errors.instagram
                  }
                />
              </RowSection>
              <Spacer size={18} />
              {data.getAllUsers ? (
                <AutoSuggest
                  name="user_id"
                  label="Series Owner"
                  value={data.getAllUsers.map((item) => {
                    return item.id === values.user_id
                      ? {
                          value: item.id,
                          label: item.name,
                        }
                      : null;
                  })}
                  error={errors.user_id}
                  touched={touched.user_id}
                  onChange={({ value }) => {
                    setFieldValue('user_id', value);
                  }}
                  onBlur={() => ''}
                  closeMenuOnSelect
                  options={data.getAllUsers.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                />
              ) : null}
              <Spacer size={18} />

              <AutoSuggest
                name="added_by"
                label="Added By"
                value={data.getAllUsers.map((item) => {
                  return item.id === values.added_by
                    ? {
                        value: item.id,
                        label: item.name,
                      }
                    : null;
                })}
                error={errors.added_by}
                touched={touched.added_by}
                onChange={({ value }) => {
                  setFieldValue('added_by', value);
                }}
                onBlur={() => ''}
                closeMenuOnSelect
                options={data.getAllUsers.map((item) => ({
                  value: item.id,
                  label: item.name,
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
                error={errors.status && touched.status && errors.status}
              />
            </DrawerPadding>

            <DrawerPadding>
              <Button type="submit" disabled={isSubmitting} block>
                {currentSeries ? 'Update Series' : 'Create Series'}
              </Button>
            </DrawerPadding>
          </form>
        )}
      </Formik>
    </Drawer>
  );
};

export default compose(GetSeriesDetail, CreateSeries, UpdateSeries)(SeriesEdit);
