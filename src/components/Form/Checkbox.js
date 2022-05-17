import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import {
  Description as DescriptionComponent,
  ErrorText,
} from 'components/Form/styles';
import Icon from 'components/Icon';
import useTheme from 'hooks/useTheme';
import Text from '../Text';

const Description = styled(DescriptionComponent)`
  padding-left: 41px;
`;

export const CheckboxContainer = styled.div`
  vertical-align: middle;
  display: flex;
  align-items: center;
  pointer-events: ${(props) => props.pointerEvents || 'auto'};
`;

const backgroundColor = (props) => {
  let background = '#fff';
  if (props.checked)
    background = props.inversed ? '#fff' : props.theme.colors.primary;
  return background;
};

const borderColor = (props) => {
  let border = props.inversed
    ? `solid 2px ${props.theme.colors.secondary}`
    : 'solid 1px #dcdcdc';
  if (props.checked)
    border = props.inversed
      ? `solid 2px ${props.theme.colors.secondary}`
      : `solid 1px ${props.theme.colors.primary}`;
  return border;
};

export const StyledCheckbox = styled.div`
  display: flex;
  width: ${(props) => props.size[0]}px;
  height: ${(props) => props.size[0]}px;
  background: ${(props) => backgroundColor(props)};
  border-radius: ${(props) => props.size[2]}px;
  transition: all 150ms;
  border: ${(props) => borderColor(props)};
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const TextSpacing = styled.span`
  padding-left: ${(props) => props.spacing}px;
`;

export const LeftTextSpacing = styled.span`
  padding-right: ${(props) => props.spacing}px;
`;

export const LabelRow = styled.label`
  display: flex;
  flex: 1;
  align-items: center;
`;

export const Checkbox = ({
  checked,
  myStyle,
  leftText,
  rightText,
  textProps,
  textSpacing,
  size,
  inversed,
  check = true,
  description,
  error,
  pointerEvents,
  ...props
}) => {
  const theme = useTheme();
  return (
    <>
      <CheckboxContainer style={myStyle} pointerEvents={pointerEvents}>
        <LabelRow checked={checked}>
          <HiddenCheckbox checked={checked} {...props} />
          {leftText && (
            <LeftTextSpacing spacing={textSpacing}>
              <Text type="label" {...textProps}>
                {leftText}
              </Text>
            </LeftTextSpacing>
          )}
          <StyledCheckbox checked={checked} size={size} inversed={inversed}>
            {checked && (
              <Icon
                icon={check ? 'check' : 'close'}
                size={size[1]}
                color={inversed ? theme.colors.primary : '#fff'}
              />
            )}
          </StyledCheckbox>
          {rightText && (
            <TextSpacing spacing={textSpacing}>
              <Text type="label" {...textProps}>
                {rightText}
              </Text>
            </TextSpacing>
          )}
        </LabelRow>
      </CheckboxContainer>
      {error && <ErrorText fontSize={props.fontSize}>{error}</ErrorText>}
      {description && <Description>{description}</Description>}
    </>
  );
};

Checkbox.propTypes = {
  inversed: PropTypes.bool,
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  leftText: PropTypes.string,
  rightText: PropTypes.string,
  color: PropTypes.string,
  borderColor: PropTypes.string,
  textProps: PropTypes.object,
  textSpacing: PropTypes.number,
  size: PropTypes.array,
  description: PropTypes.string,
  pointerEvents: PropTypes.string,
};
Checkbox.defaultProps = {
  inversed: false,
  leftText: null,
  rightText: null,
  color: null,
  borderColor: null,
  textProps: null,
  textSpacing: 15,
  size: [26, 15, 2],
  pointerEvents: 'auto',
};
