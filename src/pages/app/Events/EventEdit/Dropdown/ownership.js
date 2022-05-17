import React from 'react';
import DropdownEvent from './eventDropdown';
import DropdownSeries from './seriesDropdown';
import DropdownTrack from './trackDropdown';

const Ownership = ({
  values,
  errors,
  touched,
  setFieldValue,
  currentSeries,
  currentTrack,
  currentEvent,
  id,
}) => {
  return (
    <React.Fragment>
      {currentSeries ? (
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
      )}
    </React.Fragment>
  );
};

export default Ownership;
