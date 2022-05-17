import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Drawer } from './Drawer';
import { DrawerPadding } from './DrawerPadding';

export const DrawerForm = (props) => {
  const {
    children,
    initialValues,
    onCloseClick,
    onSubmit,
    shouldDisplay,
    title,
    validate,
    validateOnChange,
    validateOnBlur,
  } = props;
  return (
    <Drawer
      title={title}
      isVisible={shouldDisplay}
      handleOutClick={onCloseClick}
    >
      <DrawerPadding>
        {shouldDisplay && (
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={onSubmit}
            validateOnChange={validateOnChange}
            validateOnBlur={validateOnBlur}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit} noValidate>
                {children}
              </form>
            )}
          </Formik>
        )}
      </DrawerPadding>
    </Drawer>
  );
};
DrawerForm.propTypes = {
  title: PropTypes.string.isRequired,
  shouldDisplay: PropTypes.bool.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  validate: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  validateOnChange: PropTypes.bool,
  validateOnBlur: PropTypes.bool,
};
