import { Formik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import { compose } from 'recompose';
import styled from 'styled-components';
import { Button } from 'components/Button';
import { Drawer, DrawerPadding } from 'components/Drawer';
import { Input } from 'components/Form/Input';
import Tracks from 'components/Form/Tracks';
import { SeriesSelect } from 'components/SeriesSelect';
import Spacer from 'components/Spacer';
import CreateTextList from '../gql/mutations/create-list';
import UpdateTextList from '../gql/mutations/update-list';
const formValues = ['name', 'code', 'reply_message', 'track_id', 'series_id'];

export const Or = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  position: relative;
  font-weight: bold;
  font-size: 15px;
  text-transform: uppercase;

  &:before {
    content: '';
    width: 40%;
    height: 1px;
    background-color: #e6e6e6;
    position: absolute;
    left: 0;
    top: 50%;
  }

  &:after {
    content: '';
    width: 40%;
    height: 1px;
    background-color: #e6e6e6;
    position: absolute;
    right: 0;
    top: 50%;
  }
`;

const TypeEdit = ({
  isVisible,
  handleOutClick,
  currentList,
  updateTextList,
  createTextList,
}) => {
  const successMessage = () =>
    toast.success(currentList ? 'Text List Updated' : 'Text List Created');
  const errorMessage = (response) =>
    toast.error(
      currentList
        ? response.global
          ? 'Error Updating Text List'
          : "There were errors with your submission check the form's field for errors."
        : 'Error Creating Text List'
    );

  return (
    <Drawer
      title={currentList ? 'Edit List Details' : 'New Text List Details'}
      isVisible={isVisible}
      handleOutClick={handleOutClick}
    >
      <Formik
        enableReinitialize={true}
        initialValues={formValues.reduce((acc, value) => {
          if (currentList && currentList['code']) {
            if (currentList[value]) {
              if (value === 'series_id') {
                acc[value] = {
                  value: currentList?.series?.id,
                  label: currentList?.series?.name,
                };
              } else {
                acc[value] = currentList[value];
              }

              return acc;
            }
          }

          acc[value] = '';
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

          if (currentList) {
            response = await updateTextList({
              id: currentList.id,
              ...values,
              track_id: values.track_id ? values.track_id.value : null,
              series_id: values.series_id ? values.series_id.value : null,
              reply_message: values.reply_message ? values.reply_message : null,
            });
          } else {
            response = await createTextList({
              ...values,
              track_id: values.track_id ? values.track_id.value : null,
              series_id: values.series_id ? values.series_id.value : null,
              reply_message: values.reply_message ? values.reply_message : null,
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
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <DrawerPadding border>
              <Input
                label="Name"
                name="name"
                placeholder="List Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={errors.name}
              />
              <Spacer size={18} />
              <Input
                label="Text Code"
                name="code"
                placeholder="Text Code"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.code}
                error={errors.code}
              />
              <Spacer size={18} />
              <Input
                id="reply_message"
                name="reply_message"
                as="textarea"
                label="Reply Message (Optional)"
                placeholder="Enter the text message sent to users when they opt into this list."
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.reply_message}
                error={errors.reply_message || touched.reply_message}
              />
              <Spacer size={18} />
              <Tracks
                values={values}
                errors={errors}
                touched={touched}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldValue}
                label={'Track'}
                name={'track_id'}
              />
              <Spacer size={18} />
              <Or>Or</Or>
              <SeriesSelect isMulti={false} name="series_id" />
            </DrawerPadding>

            <DrawerPadding>
              <Button type="submit" disabled={isSubmitting} block>
                Save Text List
              </Button>
            </DrawerPadding>
          </form>
        )}
      </Formik>
    </Drawer>
  );
};

export default compose(UpdateTextList, CreateTextList)(TypeEdit);
