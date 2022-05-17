import { Field, FieldArray, useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { ReactSortable } from 'react-sortablejs';
import { Button, RemoveButton } from 'components/Button';
import {
  DraggableRow,
  FormWrapper,
  getHighestItemOrderNumber,
  getOrderedItems
} from 'components/Form/DraggableFields';
import { Input } from 'components/Form/Input';
import Spacer from 'components/Spacer';
import Text from 'components/Text';

export const NoteList = props => {
  const { fieldName = 'notes', label = 'NOTE', buttonText = 'NOTE' } = props;
  const { setFieldValue, values } = useFormikContext();
  const notes = values[fieldName] ?? [];

  const notesWithOrderNumbers = getOrderedItems(notes);

  function setList(notes) {
    setFieldValue(fieldName, notes);
  }

  return (
    <div>
      <Text type="label" color="#000">
        {label}
      </Text>
      <Spacer size={5} />
      <FieldArray
        name={fieldName}
        render={arrayHelpers => (
          <>
           <Button
              type="button"
              onClick={() =>
                arrayHelpers.push({
                  note: '',
                  order: getHighestItemOrderNumber(notesWithOrderNumbers) + 1
                })
              }
            >
              {`+ Add Another ${buttonText}`}
            </Button>
            {notesWithOrderNumbers?.length > 0 && (
              <ReactSortable list={values[fieldName]} setList={setList}>
                {notesWithOrderNumbers.map((note, index) => (
                  <DraggableRow key={note.order}>
                    {/* <IconWrapper>
                      <DragIndicatorIcon />
                    </IconWrapper> */}
                    <FormWrapper>
                      <RemoveButton
                        containerStyle={{ marginBottom: 5 }}
                        onClick={() => arrayHelpers.remove(index)}
                      />
                      <Field name={`${fieldName}.${index}.note`}>
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
                              placeholder="Enter Note"
                              value={value}
                            />
                          );
                        }}
                      </Field>
                    </FormWrapper>
                  </DraggableRow>
                ))}
              </ReactSortable>
            )}
          </>
        )}
      />
    </div>
  );
};
NoteList.propTypes = {
  fieldName: PropTypes.string,
  label: PropTypes.string,
  buttonText: PropTypes.string
};
