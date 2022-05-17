import React from 'react';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { compose } from 'recompose';

import UpdateSeriesType from '../gql/mutations/update-series-type';
import CreateSeriesType from '../gql/mutations/create-series-type';

import { Button } from 'components/Button';
import { Drawer } from 'components/Drawer';
import { DrawerPadding } from 'components/Drawer';
import { Input } from 'components/Form/Input';
const formValues = ['name'];

const TypeEdit = ({
  isVisible,
  handleOutClick,
  currentSeriesType,
  updateSeriesType,
  createSeriesType
}) => {
  const successMessage = () =>
    toast.success(
      currentSeriesType ? 'Series Type Updated' : 'Series Type Created'
    );
  const errorMessage = response =>
    toast.error(
      currentSeriesType
        ? response.global
          ? 'Error Updating Series Type'
          : "There were errors with your submission check the form's field for errors."
        : 'Error Creating Series Type'
    );

  return (
    <Drawer
      title={
        currentSeriesType ? 'Edit Series Details' : 'New Series Type Details'
      }
      isVisible={isVisible}
      handleOutClick={handleOutClick}
    >
      <Formik
        enableReinitialize={true}
        initialValues={formValues.reduce((acc, value) => {
          if (currentSeriesType && currentSeriesType['name']) {
            if (currentSeriesType['name']) {
              acc[value] = currentSeriesType['name'];
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

          if (currentSeriesType) {
            response = await updateSeriesType({
              id: currentSeriesType.id,
              ...values
            });
          } else {
            response = await createSeriesType(values.name);
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
                label="Series Type"
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

export default compose(UpdateSeriesType, CreateSeriesType)(TypeEdit);
