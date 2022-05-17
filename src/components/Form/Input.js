import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Icon from 'components/Icon';
import EmojiElement from './Emoji';
import { IconContainer, InputText, Wrapper } from './inputStyles';
import { Description, ErrorText, LabelWrapper, Label } from './styles';

export const InputPropTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  error: PropTypes.string,
  icon: PropTypes.string,
  labelRight: PropTypes.node,
  inputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  style: PropTypes.object,
  readonly: PropTypes.bool,
};

export const Input = ({
  label,
  description,
  labelRight,
  error,
  icon,
  inputStyle,
  disabled,
  style = {},
  onChange,
  onUpdate,
  errorColor,
  emojiSupport = false,
  value,
  readonly,
  type,
  ...props
}) => {
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value, setText]);

  return (
    <Wrapper inlineStyle={style}>
      {label && (
        <LabelWrapper>
          <Label>{label}</Label>
          {labelRight && labelRight}
        </LabelWrapper>
      )}
      <div>
        {icon && (
          <IconContainer>
            <Icon icon={icon} size={15} color={'#A2A2A2'} />
          </IconContainer>
        )}
        <InputText
          error={error}
          icon={icon}
          disabled={disabled}
          inputStyle={inputStyle}
          type={type}
          value={text}
          onChange={(e) => {
            if (!readonly) {
              setText(e.target.value);
              return onChange(e);
            }
          }}
          {...props}
        />
      </div>
      {emojiSupport ? (
        <EmojiElement setText={setText} text={text} onUpdate={onUpdate} />
      ) : null}
      {error && (
        <ErrorText
          style={{ color: errorColor ? errorColor : 'red' }}
          fontSize={props.fontSize}
        >
          {error}
        </ErrorText>
      )}
      {description && <Description>{description}</Description>}
    </Wrapper>
  );
};
Input.propTypes = InputPropTypes;
Input.defualtProps = {
  readonly: false,
};
