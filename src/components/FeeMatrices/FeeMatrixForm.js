import { FieldArray, useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'components/Button';
import { DrawerSectionLine } from 'components/Drawer';
import FieldsRepeater, { RepeatableTextInput } from 'components/FieldsRepeater';
import { Input } from 'components/Form/Input';
import { ErrorText } from 'components/Form/styles';
import Text from 'components/Text';
import useTheme from 'hooks/useTheme';

function calculateRawFee(fee, ticket_price, marketing_fee = false) {
  const stripe = 0.029;
  const waiver = 0.5;
  const connect = 0.0025;
  const marketing = 0.01;
  const charge_fee = 0.3;
  const raw_fee =
    ticket_price * stripe +
    charge_fee +
    waiver +
    (marketing_fee ? ticket_price * marketing : 0) +
    ticket_price * connect +
    fee +
    stripe *
      (ticket_price * stripe +
        charge_fee +
        waiver +
        (marketing_fee ? ticket_price * marketing : 0) +
        ticket_price * connect +
        fee);

  return Math.ceil(raw_fee / 0.25) * 0.25;
}

const RawFeeLabel = ({ index, marketingFee }) => {
  const theme = useTheme();
  const { values } = useFormikContext();
  const item = values.items?.[index];
  if (!item) return null;
  const { fee, ticket_price } = item;

  const rawFee = calculateRawFee(
    Number(fee),
    Number(ticket_price),
    !!marketingFee
  );

  return (
    <Text fontSize={14} color={theme.colors.primary}>
      {`Calculated Fee${
        marketingFee ? ` (with marketing fee)` : ''
      }: ${rawFee}`}
    </Text>
  );
};

export const FeeMatrixForm = (props) => {
  const { matrix } = props;
  const theme = useTheme();
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    isSubmitting,
  } = useFormikContext();
  return (
    <>
      <Input
        id="name"
        name="name"
        label="Matrix Name"
        placeholder="Matrix Name"
        required
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        error={errors.name && touched.name}
      />
      <DrawerSectionLine />
      <FieldArray>
        <>
          <Text type="label" color={theme.colors.text.black}>
            Fees
          </Text>
          <FieldsRepeater
            fields={values.items ?? []}
            setFields={(value) => {
              setFieldValue('items', value);
            }}
            addButton={<Button type="button">Add another entry</Button>}
          >
            <RepeatableTextInput
              id="ticket_price"
              name="ticket_price"
              label="Ticket Price"
              placeholder="Ticket Price"
              required
              type="number"
              onBlur={handleBlur}
            />
            <RepeatableTextInput
              id="fee"
              name="fee"
              label="Profit"
              placeholder="Profit"
              required
              type="number"
              onBlur={handleBlur}
            />
            <RawFeeLabel />
            <RawFeeLabel marketingFee />
          </FieldsRepeater>
          {errors.items && (
            <ErrorText fontSize={16} style={{ marginBottom: 20 }}>
              {errors.items}
            </ErrorText>
          )}
        </>
      </FieldArray>
      <DrawerSectionLine />
      <Button type="submit" disabled={isSubmitting} block>
        {matrix ? 'Update Fee Matrix' : 'Add Fee Matrix'}
      </Button>
    </>
  );
};
FeeMatrixForm.propTypes = {
  matrix: PropTypes.object,
};
