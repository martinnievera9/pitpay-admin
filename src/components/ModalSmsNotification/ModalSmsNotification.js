import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Button } from 'components/Button';
import { Input } from 'components/Form/Input';
import { Modal, modalPropTypes } from 'components/Modal';
import Spacer from 'components/Spacer';
import { useSendIndividualText } from './gql';

const formValues = { message: '' };

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;

  @media (max-width: 860px) {
    flex-direction: column;
    padding: 40px 20px;
    & > button {
      width: 100%;
      &:not(:last-of-type) {
        margin-right: 0;
        margin-bottom: 20px;
      }
    }
  }
`;

export const ModalSmsNotification = (props) => {
  const { cellphone, hideModal, onCancel, ...modalProps } = props;
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const sendIndividualText = useSendIndividualText();

  const successMessage = () => toast.success('Message Sended Successful');

  return (
    <Modal
      hideModal={hideModal}
      maxWidth={isMobile ? undefined : 600}
      modalStyle={{ height: 'auto' }}
      {...modalProps}
    >
      <Formik
        initialValues={formValues}
        validate={(values) => {
          const errors = {};

          if (!values.message) {
            errors.message = 'Required';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          await sendIndividualText({
            variables: {
              input: {
                message: values.message,
                cellphone,
              },
            },
          });

          setSubmitting(false);
          successMessage();
          resetForm();
          hideModal();
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
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Content>
                <Input
                  id="Message"
                  as="textarea"
                  name="message"
                  label="Message"
                  placeholder="Enter a message for notification"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.message}
                  error={errors.message && touched.message && errors.message}
                />
                <Spacer size={18} />

                <Button type="submit" disabled={isSubmitting} block>
                  Send Message
                </Button>
                <Spacer size={8} />
                <Button onClick={onCancel ?? hideModal} outlined block>
                  Close
                </Button>
              </Content>
            </form>
          );
        }}
      </Formik>
    </Modal>
  );
};
ModalSmsNotification.propTypes = {
  ...modalPropTypes,

  onCancel: PropTypes.func,
};
