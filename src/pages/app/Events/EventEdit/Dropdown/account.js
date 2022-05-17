import React from 'react';
import DropdownEvent from './accEventDropdown';

const Account = ({
  values,
  errors,
  touched,
  setFieldValue,
  // currentSeries,
  // currentTrack,
  currentEvent,
  // id
}) => {
  return (
    <React.Fragment>
      <DropdownEvent
          values={values}
          errors={errors}
          touched={touched}
          id={currentEvent}
          setFieldValue={setFieldValue}
          // currentSeries={currentSeries}
          setFieldTouched={setFieldValue}
        />
      {/* {currentSeries ? (
        <DropdownSeries
          values={values}
          errors={errors}
          touched={touched}
          id={id}
          setFieldValue={setFieldValue}
          currentSeries={currentSeries}
          setFieldTouched={setFieldValue}
        />
      ) : currentTrack ? (
        <DropdownTrack
          values={values}
          errors={errors}
          touched={touched}
          id={id}
          setFieldValue={setFieldValue}
          currentSeries={currentSeries}
          setFieldTouched={setFieldValue}
        />
      ) : (
        <DropdownEvent
          values={values}
          errors={errors}
          touched={touched}
          id={currentEvent}
          setFieldValue={setFieldValue}
          // currentSeries={currentSeries}
          setFieldTouched={setFieldValue}
        />
      )} */}
    </React.Fragment>
  );
};

export default Account;
