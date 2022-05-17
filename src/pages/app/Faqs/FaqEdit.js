import { Formik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import { Button } from 'components/Button';
import { Drawer, DrawerPadding } from 'components/Drawer';
import { useUpdateFaq, useCreateFaq } from 'components/Faqs';
import { Input } from 'components/Form/Input';
import { Select } from 'components/Form/Select';
import Spacer from 'components/Spacer';

const formValues = ['question', 'answer', 'platform'];

export const FaqEdit = ({ isVisible, handleOutClick, currentFaq }) => {
  const createFaq = useCreateFaq();
  const updateFaq = useUpdateFaq();

  const successMessage = () =>
    toast.success(currentFaq ? 'FAQ Updated' : 'FAQ Created');

  return (
    <Drawer
      title={currentFaq ? 'Edit FAQ Details' : 'New FAQ Details'}
      isVisible={isVisible}
      handleOutClick={handleOutClick}
    >
      <Formik
        enableReinitialize={true}
        initialValues={formValues.reduce((acc, value) => {
          if (currentFaq && currentFaq[value]) {
            if (currentFaq[value]) {
              acc[value] = currentFaq[value];
              return acc;
            }
          }

          acc[value] = '';
          return acc;
        }, {})}
        validate={(values) => {
          const errors = {};
          if (!values.question) {
            errors.question = 'Required';
          }

          if (!values.answer) {
            errors.answer = 'Required';
          }

          if (!values.platform) {
            errors.platform = 'Required';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          let response;
          setSubmitting(true);

          if (currentFaq) {
            response = await updateFaq({
              id: currentFaq.id,
              ...values,
            });
          } else {
            response = await createFaq({ ...values });
          }

          if (response) {
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
        }) => (
          <form onSubmit={handleSubmit}>
            <DrawerPadding border>
              <Input
                label="Question"
                name="question"
                placeholder="Your question?"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.question}
                error={errors.question && touched.question && errors.question}
              />
              <Spacer size={18} />
              <Input
                as="textarea"
                label="Answer"
                name="answer"
                placeholder="Your answer to your question"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.answer}
                error={errors.answer && touched.answer && errors.answer}
              />
              <Spacer size={18} />
              <Select
                id="platform"
                name="platform"
                label="Faq Platform"
                options={[
                  {
                    label: 'Select a platform...',
                    value: ' ',
                  },
                  {
                    label: 'App Admin',
                    value: 'app',
                  },
                  {
                    label: 'Track Admin',
                    value: 'admin',
                  },
                  {
                    label: 'Staff Admin',
                    value: 'employee',
                  },
                ]}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.platform}
                error={errors.platform && touched.platform && errors.platform}
              />
            </DrawerPadding>

            <DrawerPadding>
              <Button type="submit" disabled={isSubmitting} block>
                Save FAQ
              </Button>
            </DrawerPadding>
          </form>
        )}
      </Formik>
    </Drawer>
  );
};
