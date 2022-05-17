import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';
import useTheme from 'hooks/useTheme';

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  & > div {
    // Fix for bad design of icomoon-react wrapper
    line-height: 14px;
  }
`;

const Button = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;

  & > div {
    margin-top: 1.55px;
  }
`;

const ButtonText = styled.span`
  font-family: Roboto, sans-serif;
  font-size: ${(props) => props.theme.fonts.label.fontSize}px;
  margin-right: 3px;
`;

export const RemoveButton = (props) => {
  const {
    className,
    containerStyle,
    iconColor,
    label = 'Remove',
    onClick = () => {
      return;
    },
  } = props;
  const theme = useTheme();
  return (
    <Container className={className} style={containerStyle}>
      <Button type="button" onClick={onClick}>
        <ButtonText>{label}</ButtonText>
        <Icon
          icon="close"
          size={14}
          color={iconColor ?? theme.colors.primary}
        />
      </Button>
    </Container>
  );
};
RemoveButton.propTypes = {
  className: PropTypes.string,
  containerStyle: PropTypes.object,
  iconColor: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
};
