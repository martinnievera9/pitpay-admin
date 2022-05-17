import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';

const Button = styled.button`
  box-sizing: border-box;
  background-color: transparent;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 0;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const IconWrapper = styled.div`
  color: ${props => props.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  text-align: left;

  & > div {
    margin-right: 10px;
  }

  & svg {
    fill: ${props => props.theme.colors.primary};
  }

  @media (min-width: 860px) {
    color: ${props => props.theme.colors.black};
  }
`;

export const MinimalButton = props => {
  const { children, icon, ...rest } = props;
  return (
    <Button {...rest}>
      <IconWrapper>
        {icon && <Icon icon={icon} size={22} />}
        {children}
      </IconWrapper>
    </Button>
  );
};
MinimalButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object
};
