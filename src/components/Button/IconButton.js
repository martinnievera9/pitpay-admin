import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';
import Icon from 'components/Icon';

const sizingStyles = {
  small: {
    width: 32,
    padding: 16
  },
  normal: {
    width: 40,
    padding: 20
  },
  large: {
    width: 48,
    padding: 24
  }
};

const iconUnderline = css`
  &::after {
    background-color: ${props =>
      props.backgroundColor ?? props.theme.colors.primary};
    content: '';
    position: absolute;
    bottom: 50%;
    left: -5px;
    height: 60%;
    width: 3px;
    transform: translateY(40%);
    transition: background-color 0.25s linear;
  }
`;

const ButtonContainer = styled.button`
  background-color: ${props =>
    props.variant === 'primary'
      ? props.backgroundColor ?? props.theme.colors.white
      : 'transparent'};
  box-shadow: ${props =>
    props.variant === 'icon'
      ? 'none'
      : `0px 0px 2px 2px ${props.theme.colors.primary}`};
  border: none;
  border-radius: 100%;
  color: ${props => props.color ?? props.theme.colors.primary};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${props => sizingStyles[props.size].padding}px;
  width: ${props => sizingStyles[props.size].width}px;
  height: ${props => sizingStyles[props.size].width}px;
  transition: background-color 0.25s linear, color 0.25s linear;
  &:hover {
    background-color: ${props =>
      props.variant === 'icon'
        ? 'transparent'
        : props.color ?? props.theme.colors.primary};
    color: ${props =>
      props.variant === 'icon'
        ? props.hoverColor ?? props.theme.colors.white
        : props.backgroundColor ?? props.theme.colors.white};
    &:focus {
      &::after {
        ${props =>
          props.variant === 'icon' &&
          `background-color: ${props.color ?? props.theme.colors.white};`}
      }
    }
  }
  &:focus {
    box-shadow: ${props =>
      props.variant === 'icon'
        ? 'none'
        : `0px 0px 2px 2px ${props.theme.colors.primary}, 0px 0px 4px 4px ${props.theme.colors.white}`};
    outline: none;
    position: relative;
    ${props => props.variant === 'icon' && iconUnderline}
  }

  & svg {
    fill: currentColor;
  }
`;

const iconSizes = {
  icon: {
    small: 32,
    normal: 40,
    large: 48
  },
  primary: {
    small: 12,
    normal: 18,
    large: 24
  }
};

export const IconButton = props => {
  const {
    backgroundColor,
    className,
    color,
    hoverColor,
    icon,
    onClick,
    size = 'normal',
    variant = 'primary',
    ...rest
  } = props;

  return (
    <ButtonContainer
      onClick={onClick}
      className={className}
      backgroundColor={backgroundColor}
      color={color}
      hoverColor={variant === 'icon' ? hoverColor : undefined}
      size={size}
      variant={variant}
      {...rest}
    >
      <Icon
        icon={icon}
        size={
          variant === 'icon'
            ? iconSizes[variant][size]
            : iconSizes.primary[size]
        }
      />
    </ButtonContainer>
  );
};
IconButton.propTypes = {
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['small', 'normal', 'large']),
  variant: PropTypes.oneOf(['outline', 'primary', 'icon'])
};
