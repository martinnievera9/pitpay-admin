import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { debounce } from 'throttle-debounce';
import { Button } from 'components/Button';
import Estimate from 'components/Estimate';
import { Input } from 'components/Form/Input';
import Spacer from 'components/Spacer';

const CharacterCount = styled.span`
  color: ${(props) => (props.overLimit ? props.theme.colors.error : 'unset')};
  margin-bottom: 6px;
`;
CharacterCount.propTypes = {
  overLimit: PropTypes.bool,
};

export default ({ onSubmit, showTitle = false, estimate, type }) => {
  const [isSubmitting, setSubmitting] = useState();
  const [characterCount, setCharacterCount] = useState(0);
  const successMessage = () => toast.success('Message Created');
  const errorMessage = () => toast.error('Error Creating Message');
  const formValues = showTitle ? { title: '', message: '' } : { message: '' };

  return (
    <Formik
      initialValues={formValues}
      validate={(values) => {
        const errors = {};

        if (!values.message) {
          errors.message = 'Required';
        }

        if (showTitle && !values.title) {
          errors.message = 'Required';
        }
        return errors;
      }}
      onSubmit={async (values, { setErrors, resetForm }) => {
        setSubmitting(true);
        const response = await onSubmit(values);

        setSubmitting(false);
        if (!response || response.errors) {
          errorMessage(response);
          return setErrors(response.errors);
        }
        successMessage();
        resetForm();
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
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Spacer size={25} />
            {showTitle ? (
              <>
                <Input
                  label="Title"
                  placeholder="Title"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  error={errors.title && touched.title && errors.title}
                />
                <Spacer size={25} />
              </>
            ) : null}
            <Input
              id="Message"
              as="textarea"
              labelRight={
                <>
                  {type === 'text' && (
                    <CharacterCount overLimit={characterCount > 160}>
                      {characterCount} characters
                    </CharacterCount>
                  )}
                </>
              }
              name="message"
              label="Message"
              placeholder={
                type === 'text'
                  ? 'Type Message (There is a 160 character limit)'
                  : 'Type Message'
              }
              emojiSupport={type === 'push'}
              onChange={({ target }) => {
                typeof target.value === 'string' &&
                  debounce(300, setCharacterCount(target.value.length));
                handleChange({
                  target: {
                    name: `message`,
                    value: target.value,
                  },
                });
              }}
              onBlur={handleBlur}
              onUpdate={(value) => {
                debounce(300, setCharacterCount(value.length));
                setFieldValue('message', value);
              }}
              value={values.message}
              error={errors.message && touched.message && errors.message}
            />

            <Estimate estimate={estimate} type={type} />
            <Spacer size={25} />
            <Button type="submit" disabled={isSubmitting} block>
              Send Message
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};
