import React from 'react';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { compose } from 'recompose';

import UpdateTrackType from '../gql/mutations/update-tack-type';
import CreateTrackType from '../gql/mutations/create-track-type';

import { Button } from 'components/Button';
import { Drawer } from 'components/Drawer';
import { DrawerPadding } from 'components/Drawer';
import { Input } from 'components/Form/Input';
const formValues = ['name'];

const TypeEdit = ({
  isVisible,
  handleOutClick,
  currentTrackType,
  updateTrackType,
  createTrackType
}) => {
  const successMessage = () =>
    toast.success(
      currentTrackType ? 'Track Type Updated' : 'Track Type Created'
    );
  const errorMessage = response =>
    toast.error(
      currentTrackType
        ? response.global
          ? 'Error Updating Track Type'
          : "There were errors with your submission check the form's field for errors."
        : 'Error Creating Track Type'
    );

  // if (data.loading) return <Loading />;

  return (
    <Drawer
      title={currentTrackType ? 'Edit Track Details' : 'New Track Type Details'}
      isVisible={isVisible}
      handleOutClick={handleOutClick}
    >
      <Formik
        enableReinitialize={true}
        initialValues={formValues.reduce((acc, value) => {
          if (currentTrackType && currentTrackType['name']) {
            if (currentTrackType['name']) {
              acc[value] = currentTrackType['name'];
              return acc;
            }
          }

          acc[value] = '';
          return acc;
        }, {})}
        validate={values => {
          let errors = {};
          if (!values.name) {
            errors.name = 'Required';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          let response;
          setSubmitting(true);

          if (currentTrackType) {
            response = await updateTrackType({
              id: currentTrackType.id,
              ...values
            });
          } else {
            response = await createTrackType(values.name);
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
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit}>
            <DrawerPadding border>
              <Input
                label="Track Type"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={errors.name}
              />
            </DrawerPadding>

            <DrawerPadding>
              <Button type="submit" disabled={isSubmitting} block>
                Save Track Type
              </Button>
            </DrawerPadding>
          </form>
        )}
      </Formik>
    </Drawer>
  );
};

export default compose(UpdateTrackType, CreateTrackType)(TypeEdit);
