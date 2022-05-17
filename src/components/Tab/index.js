import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { TabGroupContainer, TabWrapper, TabItem, TabLine } from './StyledTab';
import Text from '../Text';

const Tab = ({
  labels,
  currentTab,
  color,
  padding,
  textProps,
  onChange,
  ...props
}) => {
  const [bounds, setBounds] = useState({ width: 0, left: 0 });
  const tabRefs = Array.from({ length: labels.length }, a => React.createRef());
  const tabGroupRef = useRef();

  useEffect(() => {
    const tabRect = tabRefs[currentTab].current.getBoundingClientRect();
    const groupRect = tabGroupRef.current.getBoundingClientRect();
    setBounds({ width: tabRect.width, left: tabRect.left - groupRect.left });
  }, [currentTab, tabRefs]);

  return (
    <TabWrapper>
      <TabGroupContainer ref={tabGroupRef}>
        {labels.map((item, index) => (
          <TabItem
            active={index === currentTab}
            onClick={() => onChange(index)}
            ref={tabRefs[index]}
            key={`${item}-${index}`}
            padding={padding}
          >
            <Text
              hoverColor={
                index === currentTab
                  ? props.theme.primaryColor
                  : 'rgba(0, 0, 0, 0.5)'
              }
              fontSize={14}
              lineHeight={20}
              fontWeight="500"
              inlineStyle={{ cursor: 'pointer' }}
              color={
                index === currentTab
                  ? props.theme.colors.primary
                  : props.theme.colors.text.black
              }
              {...textProps}
            >
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </Text>
          </TabItem>
        ))}
        <TabLine bounds={bounds} />
      </TabGroupContainer>
    </TabWrapper>
  );
};

Tab.propTypes = {
  labels: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  currentTab: PropTypes.number,
  color: PropTypes.string,
  textProps: PropTypes.object
};

Tab.defaultProps = {
  currentTab: 0,
  color: null,
  textProps: null
};

export default withTheme(Tab);
