import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { AutoSuggest } from 'components/Form/AutoSuggest';
import { ErrorText } from 'components/Form/styles';
import { useGetSeriesAdmin } from './useGetSeriesAdmin';

export const SeriesSelect = ({ isMulti, name = 'series_ids' }) => {
  const { data, loading } = useGetSeriesAdmin();
  const { values, errors, touched, setFieldValue } = useFormikContext();

  if (loading) return <div />;

  const series =
    data &&
    data.getSeriesAdmin &&
    data.getSeriesAdmin.results &&
    Array.isArray(data.getSeriesAdmin.results)
      ? data.getSeriesAdmin.results
      : [];

  return (
    <div>
      <AutoSuggest
        name={name}
        label="Series"
        isMulti={isMulti}
        isClearable
        error={errors[name] && touched[name] && errors[name]}
        value={values[name]}
        touched={touched[name]}
        onChange={(value) => {
          setFieldValue(name, value);
        }}
        onBlur={() => {
          return;
        }}
        closeMenuOnSelect
        options={series.map((item) => ({
          value: item.id,
          label: item.name,
        }))}
      />
      {errors[name] && <ErrorText fontSize={12}>{errors[name]}</ErrorText>}
    </div>
  );
};
SeriesSelect.propTypes = {
  isMulti: PropTypes.bool,
};
