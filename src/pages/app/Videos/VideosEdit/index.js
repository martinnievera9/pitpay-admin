import React from 'react';
import { Formik } from 'formik';
import { Button } from 'components/Button';
import { Drawer } from 'components/Drawer';
import { DrawerPadding } from 'components/Drawer';
import Spacer from 'components/Spacer';
import { toast } from 'react-toastify';
import UpdateVideo from './gql/mutations/update-video';
import CreateVideo from './gql/mutations/create-video';
import GetVideo from './gql/queries/get-video';
import { compose } from 'recompose';
import { Input } from 'components/Form/Input';
import { AutoSuggest } from 'components/Form/AutoSuggest';

const formValues = ['title', 'url', 'category'];

const customStyles = {
  control: () => ({
    lineHeight: 1.4,
    width: '100%',
    display: 'flex',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgb(204, 204, 204)',
    borderRadius: 4
  })
};

const options = [
  {
    value: 'track_admin',
    label: 'Track Admin'
  },
  {
    value: 'employee_admin',
    label: 'Employee Admin'
  }
];

const VideoEdit = ({
  isVisible,
  handleOutClick,
  createVideo,
  updateVideo,
  data,
  newVideo,
  currentVideo
}) => {
  const successMessage = () =>
    toast.success(currentVideo ? 'Video Updated' : 'Video Created');
  const errorMessage = response =>
    toast.error(
      currentVideo
        ? response.global
          ? 'Error Updating Video'
          : "There were errors with your submission check the form's field for errors."
        : 'Error Creating Video'
    );

  return (
    <Drawer
      title={!currentVideo ? 'New Video Details' : 'Edit Video Details'}
      isVisible={isVisible}
      handleOutClick={handleOutClick}
    >
      <Formik
        initialValues={formValues.reduce((acc, value) => {
          acc[value] =
            currentVideo && data.getVideo && data.getVideo[value]
              ? data.getVideo[value]
              : '';

          return acc;
        }, {})}
        validate={values => {
          let errors = {};
          if (!values.url) {
            errors.url = 'Required';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          let response;
          setSubmitting(false);

          const data = Object.entries(values).reduce((acc, entry) => {
            acc[entry[0]] = '' === entry[1] ? null : entry[1];
            return acc;
          }, {});

          if (currentVideo) {
            response = await updateVideo({
              url: data.url,
              id: currentVideo,
              category: values.category
            });
          } else {
            response = await createVideo({
              url: data.url,
              category: values.category
            });
          }

          if (!response || response.errors) {
            errorMessage(response);
            setSubmitting(false);
            return setErrors(response.errors);
          } else {
            successMessage();
            setSubmitting(false);
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
          setFieldValue,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit}>
            <DrawerPadding border>
              <Input
                label="Video URL"
                name="url"
                placeholder="Vimeo URL"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.url}
                error={errors.url && touched.url && errors.url}
              />
              <Spacer size={18} />

              <AutoSuggest
                customStyles={customStyles}
                name="category"
                label="Admin Type"
                placeholder="Admin Type"
                onChange={value => {
                  setFieldValue('category', value.value);
                }}
                onBlur={handleBlur}
                value={options.filter(
                  category => values.category === category.value
                )}
                error={errors.category && touched.category && errors.category}
                closeMenuOnSelect
                options={options}
              />
            </DrawerPadding>

            <DrawerPadding>
              <Button type="submit" disabled={isSubmitting} block>
                Save Video Details
              </Button>
            </DrawerPadding>
          </form>
        )}
      </Formik>
    </Drawer>
  );
};

export default compose(CreateVideo, GetVideo, UpdateVideo)(VideoEdit);
