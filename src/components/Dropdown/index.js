import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Text from '../Text';

const DropdownWrapper = styled.div`
  display: ${props => (props.active ? 'block' : 'none')};
  position: absolute;
  white-space: nowrap;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 12px 12px 0 rgba(0, 0, 0, 0.18);
  z-index: 901;
  top: 40px;
  right: 20px;
  width: ${props => `${props.width}px` || 'auto'};
  overflow: hidden;
  cursor: pointer;
`;

export const DropdownItem = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Dropdown = ({ children, items, width }) => {
  const [active, setActive] = useState(false);
  const showActive = () =>
    active
      ? () => {
          return;
        }
      : setActive(true);
  useEffect(() => {
    const hideActive = () => (active ? setActive(false) : null);

    document.addEventListener('click', hideActive, true);
  }, [active]);

  return (
    <div
      style={{ position: 'relative', cursor: 'pointer' }}
      onClick={showActive}
    >
      {children}
      <DropdownWrapper width={width} active={active}>
        {items.map(item => (
          <DropdownItem key={item.id} onClick={item.onClick}>
            <Text>{item.text}</Text>
          </DropdownItem>
        ))}
      </DropdownWrapper>
    </div>
  );
};

Dropdown.propTypes = {
  width: PropTypes.number
};

Dropdown.defaultProps = {
  width: 140
};

export default Dropdown;
