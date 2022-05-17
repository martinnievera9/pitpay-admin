import { Field, FieldArray, useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { ReactSortable } from 'react-sortablejs';
import { Button, RemoveButton } from 'components/Button';
import {
  DraggableRow,
  IconWrapper,
  FormWrapper,
  getHighestItemOrderNumber,
  getOrderedItems,
} from 'components/Form/DraggableFields';
import { Input } from 'components/Form/Input';
import { Textarea } from 'components/Form/Textarea';
import { DragIndicatorIcon } from 'components/Icon/DragIndicatorIcon';
import Spacer from 'components/Spacer';
import { SectionTitle } from 'pages/app/Events/AddEvents/styles';

export const FaqList = (props) => {
  const { fieldName = 'faqs', label = 'FAQ', buttonText = 'FAQ' } = props;
  const { setFieldValue, values } = useFormikContext();
  const faqs = values[fieldName] ?? [];

  const faqsWithOrderNumbers = getOrderedItems(faqs);

  function setList(faqs) {
    setFieldValue(fieldName, faqs);
  }

  return (
    <div>
      <SectionTitle>{label}</SectionTitle>
      <Spacer size={5} />
      <FieldArray
        name={fieldName}
        render={(arrayHelpers) => (
          <>
            {faqsWithOrderNumbers?.length > 0 && (
              <ReactSortable list={values[fieldName]} setList={setList}>
                {faqsWithOrderNumbers.map((faq, index) => (
                  <DraggableRow key={faq.order}>
                    <IconWrapper>
                      <DragIndicatorIcon />
                    </IconWrapper>
                    <FormWrapper>
                      <RemoveButton
                        containerStyle={{ marginBottom: 5 }}
                        onClick={() => arrayHelpers.remove(index)}
                      />
                      <Field name={`${fieldName}.${index}.question`}>
                        {({ field, meta }) => {
                          const { touched, error } = meta;
                          const { value, onChange, onBlur, name } = field;
                          return (
                            <Input
                              error={touched ? error : undefined}
                              id={name}
                              name={name}
                              onChange={onChange}
                              onBlur={onBlur}
                              placeholder="Enter Question"
                              value={value}
                            />
                          );
                        }}
                      </Field>
                      <Spacer size={10} />
                      <Field name={`${fieldName}.${index}.answer`}>
                        {({ field, meta }) => {
                          const { touched, error } = meta;
                          const { value, onChange, onBlur, name } = field;
                          return (
                            <Textarea
                              error={touched ? error : undefined}
                              id={name}
                              name={name}
                              onChange={onChange}
                              onBlur={onBlur}
                              placeholder="Enter Answer"
                              value={value}
                            />
                          );
                        }}
                      </Field>
                      <Spacer size={10} />
                    </FormWrapper>
                  </DraggableRow>
                ))}
              </ReactSortable>
            )}
            <Button
              type="button"
              onClick={() =>
                arrayHelpers.push({
                  question: '',
                  answer: '',
                  order: getHighestItemOrderNumber(faqsWithOrderNumbers) + 1,
                })
              }
            >
              {`+ Add Another ${buttonText}`}
            </Button>
          </>
        )}
      />
    </div>
  );
};
FaqList.propTypes = {
  fieldName: PropTypes.string,
  label: PropTypes.string,
  buttonText: PropTypes.string,
};
