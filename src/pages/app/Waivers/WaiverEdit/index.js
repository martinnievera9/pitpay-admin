import React from 'react';
import { Formik } from 'formik';
import { Button } from 'components/Button';
import { Drawer } from 'components/Drawer';
import { DrawerPadding } from 'components/Drawer';
import { toast } from 'react-toastify';
import { compose } from 'recompose';
import { Input } from 'components/Form/Input';
import Spacer from 'components/Spacer';
import GetWaiver from '../gql/getWaiver';
import UpdateVideo from '../gql/updateWaiver';
import CreateVideo from '../gql/createWaiver';

const formValues = ['name', 'waiver_id'];

const WaiverEdit = ({
  isVisible,
  handleOutClick,
  data,
  currentWaiver,
  createWaiver,
  updateWaiver
}) => {
  const successMessage = () =>
    toast.success(currentWaiver ? 'Waiver Updated' : 'Waiver Created');
  const errorMessage = response =>
    toast.error(
      currentWaiver
        ? response.global
          ? 'Error Updating Waiver'
          : "There were errors with your submission check the form's field for errors."
        : 'Error Creating Waiver'
    );

  return (
    <Drawer
      title={!currentWaiver ? 'New Waiver Details' : 'Edit Waiver Details'}
      isVisible={isVisible}
      handleOutClick={handleOutClick}
    >
      <Formik
        enableReinitialize={true}
        initialValues={formValues.reduce((acc, value) => {
          acc[value] =
            currentWaiver && data.getWaiver && data.getWaiver[value]
              ? data.getWaiver[value]
              : '';

          return acc;
        }, {})}
        validate={values => {
          let errors = {};
          if (!values.name) {
            errors.name = 'Required';
          }

          if (!values.waiver_id) {
            errors.waiver_id = 'Required';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          let response;
          setSubmitting(false);

          // const data = Object.entries(values).reduce((acc, entry) => {
          //   acc[entry[0]] = '' === entry[1] ? null : entry[1];
          //   return acc;
          // }, {});

          if (currentWaiver) {
            response = await updateWaiver({ ...values, id: currentWaiver });
          } else {
            response = await createWaiver({ ...values });
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
                label="Waiver Name"
                name="name"
                placeholder="Waiver Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={errors.name && touched.name && errors.name}
              />
              <Spacer size={18} />
              <Input
                label="Waiver Id"
                name="waiver_id"
                placeholder="Waiver Id"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.waiver_id}
                error={
                  errors.waiver_id && touched.waiver_id && errors.uwaiver_idl
                }
              />
            </DrawerPadding>

            <DrawerPadding>
              <Button type="submit" disabled={isSubmitting} block>
                Save Waiver Details
              </Button>
            </DrawerPadding>
          </form>
        )}
      </Formik>
    </Drawer>
  );
};

export default compose(GetWaiver, CreateVideo, UpdateVideo)(WaiverEdit);
