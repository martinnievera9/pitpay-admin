import React from 'react';
import { Button, RemoveButton } from 'components/Button';
import { Input } from 'components/Form/Input';
import { ErrorText } from 'components/Form/styles';
import Spacer from 'components/Spacer';
import Text from 'components/Text';
import useTheme from 'hooks/useTheme';

export const FeeSection = (props) => {
  const { handleChange, fee, index, handleDelete, errors } = props;
  return (
    <>
      <RemoveButton
        style={{ marginBottom: 20, marginTop: 20 }}
        onClick={handleDelete}
      />
      <Spacer size={10} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Input
          name={`fee_price_${index}`}
          type="number"
          label={
            process.env.REACT_APP_PLATFORM === 'tickethoss'
              ? 'Per Ticket Fee ($)'
              : 'Per Pass Fee ($)'
          }
          value={fee.fee_price}
          onChange={handleChange}
        />
        {errors?.fee_price && (
          <ErrorText fontSize={16} style={{ marginBottom: 20 }}>
            {errors.fee_price}
          </ErrorText>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Input
          name={`fee_amount_${index}`}
          type="number"
          label={
            process.env.REACT_APP_PLATFORM === 'tickethoss'
              ? 'Per Ticket Fee (%)'
              : 'Per Pass Fee (%)'
          }
          value={fee.fee_amount}
          onChange={handleChange}
        />
        {errors?.fee_amount && (
          <ErrorText fontSize={16} style={{ marginBottom: 20 }}>
            {errors.fee_amount}
          </ErrorText>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Input
          name={`minimum_${index}`}
          type="number"
          label={
            process.env.REACT_APP_PLATFORM === 'tickethoss'
              ? 'Ticket Price Range (MIN)'
              : 'Pass Price Range (MIN)'
          }
          value={fee.minimum}
          onChange={handleChange}
        />
        {errors?.minimum && (
          <ErrorText fontSize={16} style={{ marginBottom: 20 }}>
            {errors.minimum}
          </ErrorText>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Input
          name={`maximum_${index}`}
          type="number"
          label={
            process.env.REACT_APP_PLATFORM === 'tickethoss'
              ? 'Ticket Price Range (MAX)'
              : 'Pass Price Range (MAX)'
          }
          value={fee.maximum}
          onChange={handleChange}
        />
        {errors?.maximum && (
          <ErrorText fontSize={16} style={{ marginBottom: 20 }}>
            {errors.maximum}
          </ErrorText>
        )}
      </div>
      <Spacer size={10} />
    </>
  );
};

export const FeeSectionReg = (props) => {
  const { handleChange, fee, index, handleDelete, errors } = props;
  return (
    <>
      <RemoveButton
        style={{ marginBottom: 20, marginTop: 20 }}
        onClick={handleDelete}
      />
      <Spacer size={10} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Input
          name={`fee_price_${index}`}
          type="number"
          label={'Per Reg Fee ($)'}
          value={fee.fee_price}
          onChange={handleChange}
        />
        {errors?.fee_price && (
          <ErrorText fontSize={16} style={{ marginBottom: 20 }}>
            {errors.fee_price}
          </ErrorText>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Input
          name={`fee_amount_${index}`}
          type="number"
          label={'Per Reg Fee (%)'}
          value={fee.fee_amount}
          onChange={handleChange}
        />
        {errors?.fee_amount && (
          <ErrorText fontSize={16} style={{ marginBottom: 20 }}>
            {errors.fee_amount}
          </ErrorText>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Input
          name={`minimum_${index}`}
          type="number"
          label={'Reg Price Range (MIN)'}
          value={fee.minimum}
          onChange={handleChange}
        />
        {errors?.minimum && (
          <ErrorText fontSize={16} style={{ marginBottom: 20 }}>
            {errors.minimum}
          </ErrorText>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Input
          name={`maximum_${index}`}
          type="number"
          label={'Reg Price Range (MAX)'}
          value={fee.maximum}
          onChange={handleChange}
        />
        {errors?.maximum && (
          <ErrorText fontSize={16} style={{ marginBottom: 20 }}>
            {errors.maximum}
          </ErrorText>
        )}
      </div>
      <Spacer size={10} />
    </>
  );
};

export const FeesRepeater = ({ fees, onChange, errors, feeType }) => {
  const theme = useTheme();
  return (
    <div>
      <Text type="label" color={theme.colors.black}>
        {feeType.slice(0, 1).toUpperCase().concat(feeType.slice(1))}
      </Text>
      <Spacer size={5} />
      {feeType !== 'Registrations'
        ? fees.map((fee, index) => (
            <FeeSection
              fee={fee}
              index={index}
              key={index}
              handleDelete={() => {
                const updatedFees = fees.filter(
                  (_, currentIndex) => currentIndex !== index
                );
                onChange(updatedFees);
              }}
              handleChange={({ target }) => {
                const fieldName = target.name.split('_').slice(0, -1).join('_');
                const updatedFees = fees.map((fee, currentIndex) =>
                  currentIndex === index
                    ? { ...fee, [fieldName]: target.value }
                    : fee
                );
                onChange(updatedFees);
              }}
              errors={errors?.[index]}
            />
          ))
        : fees.map((fee, index) => (
            <FeeSectionReg
              fee={fee}
              feeType={feeType}
              index={index}
              key={index}
              handleDelete={() => {
                const updatedFees = fees.filter(
                  (_, currentIndex) => currentIndex !== index
                );
                onChange(updatedFees);
              }}
              handleChange={({ target }) => {
                const fieldName = target.name.split('_').slice(0, -1).join('_');
                const updatedFees = fees.map((fee, currentIndex) =>
                  currentIndex === index
                    ? { ...fee, [fieldName]: target.value }
                    : fee
                );
                onChange(updatedFees);
              }}
              errors={errors?.[index]}
            />
          ))}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-content',
        }}
      >
        <Button
          type="button"
          style={{ marginRight: 20 }}
          onClick={() => {
            onChange([
              ...fees,
              { fee_price: '', fee_amount: '', minimum: '', maximum: '' },
            ]);
          }}
        >
          {feeType}
        </Button>
      </div>
    </div>
  );
};
