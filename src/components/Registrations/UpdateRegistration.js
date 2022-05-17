import dayjs from 'dayjs';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import * as yup from 'yup';
import { Button } from 'components/Button';
import { Checkbox } from 'components/Form/Checkbox';
import { DatePicker } from 'components/Form/DatePicker';
import { Input } from 'components/Form/Input';
import { Select } from 'components/Form/Select';
import Icon from 'components/Icon';
import { TransactionModal } from 'components/Modal';
import { ModalSectionHeaderContainer } from 'components/Modal/styles';
import Spacer from 'components/Spacer';
import Text from 'components/Text';
import { updateSuccessMessage, updateErrorMessage } from 'shared/alerts';
import { formatTimestamp } from 'shared/formatters';
import { useGetRegistrationFields, useUpdateRegistration } from './gql';
import { ModalContainer, DataRow, Header } from './style';

export const UpdateRegistration = ({
  currentTransaction,
  close,
  isVisible,
}) => {
  const { id, data, user, purchase_date, registration } =
    currentTransaction ?? {};
  const { name: userName } = user ?? {};
  const { name: registrationName, price } = registration ?? {};
  const { data: fieldsData } = useGetRegistrationFields(id, { skip: !id });
  const updateRegistration = useUpdateRegistration();

  const fields = fieldsData?.getRegistration.fields ?? [];

  if (!data || fields.length < 1) return null;

  const fieldSchema = fields.reduce((schema, field) => {
    const { label, name, required, type, items } = field;
    const isCheckbox = type === 'checkbox';
    const isSelect = type === 'radio';
    const validationType = isCheckbox
      ? yup.boolean()
      : isSelect
      ? yup.string().oneOf(
          items.map((item) => item.value),
          `Please select a ${name.toLowerCase()} option`
        )
      : yup.string();
    const errorMessage = isCheckbox
      ? 'Please accept these terms and conditions'
      : isSelect
      ? `Please select a ${name.toLowerCase()} option`
      : `Please enter a ${label.toLowerCase()}`;
    const requiredType = required
      ? isCheckbox
        ? validationType.required(errorMessage).oneOf([true], errorMessage)
        : isSelect
        ? validationType.required(errorMessage)
        : validationType.required(errorMessage)
      : validationType;
    return {
      ...schema,
      [name]: requiredType,
    };
  }, {});

  const validationSchema = yup.object().shape({
    id: yup.number().required(),
    fields: yup.object().shape(fieldSchema),
  });

  return (
    <TransactionModal
      maxWidth={600}
      isVisible={isVisible}
      hideModal={close}
      noHeader
      modalStyle={{
        overflow: 'scroll',
        textAlign: 'left',
        whiteSpace: 'normal',
      }}
    >
      <ModalContainer>
        <>
          <Header>
            <Text type="heading">Registration Information</Text>
            <Icon
              icon="close"
              size={18}
              color={'#fa4616'}
              onClick={() => {
                close();
              }}
            />
          </Header>
          <DataRow>
            <Text type="bold" color="#707273" inlineStyle={{ width: '40%' }}>
              Purchased By:
            </Text>
            <Text
              type="bold"
              fontWeight="600"
              inlineStyle={{
                width: '60%',
                whiteSpace: 'normal',
                marginLeft: 10,
              }}
            >
              {userName ?? ''}
            </Text>
          </DataRow>
          <Spacer size={15} />
          <DataRow>
            <Text type="bold" color="#707273" inlineStyle={{ width: '40%' }}>
              Date:
            </Text>
            <Text
              type="bold"
              fontWeight="600"
              inlineStyle={{
                width: '60%',
                whiteSpace: 'normal',
                marginLeft: 10,
              }}
            >
              {formatTimestamp(purchase_date, 'MMM DD - YYYY h:mm a')}
            </Text>
          </DataRow>
          <Spacer size={15} />
          <DataRow>
            <Text type="bold" color="#707273" inlineStyle={{ width: '40%' }}>
              Registration:
            </Text>
            <Text
              type="bold"
              fontWeight="600"
              inlineStyle={{
                width: '60%',
                whiteSpace: 'normal',
                marginLeft: 10,
              }}
            >
              {registrationName}
            </Text>
          </DataRow>
          <Spacer size={15} />
          <DataRow>
            <Text type="bold" color="#707273" inlineStyle={{ width: '40%' }}>
              Price:
            </Text>
            <Text
              type="bold"
              fontWeight="600"
              inlineStyle={{
                width: '60%',
                whiteSpace: 'normal',
                marginLeft: 10,
              }}
            >
              {price}
            </Text>
          </DataRow>
          <Spacer size={15} />
          <ModalSectionHeaderContainer>
            <Text type="heading">Registration Info</Text>
          </ModalSectionHeaderContainer>
        </>
        <Formik
          enableReinitialize
          // validateOnChange={false}
          // validateOnBlur={false}
          validationSchema={validationSchema}
          initialValues={{
            id,
            fields: data.reduce((dataFields, dataField) => {
              const { name, value } = dataField;
              const fieldType = fields.find((field) => field.name === name)
                ?.type;
              const fieldValue =
                fieldType === 'checkbox'
                  ? value === 'false'
                    ? false
                    : value === 'true'
                    ? true
                    : value
                  : String(value) ?? '';
              return {
                ...dataFields,
                [name]: fieldValue,
              };
            }, {}),
          }}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            setSubmitting(true);
            const fields = Object.entries(values.fields).reduce(
              (fields, [key, value]) => fields.concat({ name: key, value }),
              []
            );
            const input = {
              id: values.id,
              fields,
            };
            const response = await updateRegistration(input);

            if (!response || response.errors) {
              updateErrorMessage('Registration', response);
              setSubmitting(false);
              return setErrors(response.errors);
            } else {
              updateSuccessMessage('Registration');
              setSubmitting(false);
              close();
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
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                {fields.map((field) => {
                  const {
                    description,
                    hide_label,
                    items,
                    label,
                    name,
                    placeholder,
                    readonly,
                    type,
                  } = field;
                  return (
                    <Fragment key={name}>
                      <Spacer size={18} />
                      {type === 'checkbox' ? (
                        <Checkbox
                          key={name}
                          name={`fields.${name}`}
                          label={hide_label ? undefined : label ?? name}
                          disabled={readonly}
                          rightText={label}
                          description={description}
                          onChange={({ target }) => {
                            handleChange({
                              target: {
                                name: `fields.${name}`,
                                value: target.checked,
                              },
                            });
                          }}
                          checked={Boolean(values.fields[name])}
                          error={
                            touched.fields?.[name] && errors.fields?.[name]
                          }
                        />
                      ) : type === 'radio' ? (
                        <Select
                          key={name}
                          id={`fields.${name}`}
                          name={`fields.${name}`}
                          label={hide_label ? undefined : label ?? name}
                          disabled={readonly}
                          description={description}
                          placeholder="-"
                          options={items}
                          onChange={({ target }) =>
                            handleChange({
                              target: {
                                name: `fields.${name}`,
                                value: target.value,
                              },
                            })
                          }
                          value={values.fields[name]}
                          error={
                            touched.fields?.[name] && errors.fields?.[name]
                          }
                        />
                      ) : type === 'datetime' ? (
                        <DatePicker
                          key={name}
                          name={`fields.${name}`}
                          type="date"
                          label={hide_label ? undefined : label}
                          disabled={readonly}
                          description={description}
                          value={values.fields[name]}
                          onBlur={({ target }) => {
                            handleBlur({
                              target: {
                                name: `fields.${name}`,
                                value: target.value,
                              },
                            });
                          }}
                          onChange={(_, value) => {
                            handleChange({
                              target: {
                                name: `fields.${name}`,
                                value: value
                                  ? dayjs(value).format('MMM DD - YYYY')
                                  : undefined,
                              },
                            });
                          }}
                          error={
                            touched.fields?.[name] && errors.fields?.[name]
                          }
                        />
                      ) : (
                        <Input
                          id={`fields.${name}`}
                          name={`fields.${name}`}
                          type={type === 'phone' ? 'tel' : type}
                          label={label ?? name}
                          disabled={readonly}
                          description={description}
                          placeholder={placeholder}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.fields[name]}
                          error={
                            touched.fields?.[name] && errors.fields?.[name]
                          }
                        />
                      )}
                    </Fragment>
                  );
                })}
                <Spacer size={18} />
                <Button type="submit" disabled={isSubmitting} block>
                  Update Registration
                </Button>
              </form>
            );
          }}
        </Formik>
      </ModalContainer>
    </TransactionModal>
  );
};
UpdateRegistration.propTypes = {
  close: PropTypes.func.isRequired,
  currentTransaction: PropTypes.shape({
    id: PropTypes.number,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.any,
      })
    ),
    purchase_date: PropTypes.string,
    registration: PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.string,
    }),
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  isVisible: PropTypes.bool.isRequired,
};
