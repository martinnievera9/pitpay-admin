import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import useTheme from 'hooks/useTheme';

import Icon from 'components/Icon';

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 28px;
  box-sizing: border-box;
  cursor: pointer;

  @media (min-width: 860px) {
    border-left-width: 1px;
    border-color: ${props => props.theme.colors.border};
    border-style: solid;
  }
`;

const ContainerIcon = ({ className, onClick, style }) => {
  const theme = useTheme();
  return (
    <IconWrapper onClick={onClick} className={className} style={style}>
      <Icon icon="plus" color={theme.colors.primary} size={25} />
    </IconWrapper>
  );
};
ContainerIcon.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object
};

export default ContainerIcon;
