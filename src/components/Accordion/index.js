import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from '../Icon';

const Row = styled.div`
  border-top: ${(props) => (props.noBorder ? '0' : `1px solid #393939`)};
  cursor: pointer;
  transition: box-shadow 0.5s;
  box-shadow: ${(props) =>
    props.isActive ? '0 8px 8px 0 rgba(0,0,0,0.15)' : 'none'};

  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
`;

const StatWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: 'row';
  justify-content: space-between;
`;

const StatName = styled.div`
  padding: 20px 5px 20px 10px;
  color: #ffffff;

  font-size: 6vw;
  font-weight: 400;
  line-height: 28px;
  margin-right: 10px;

  @media (min-width: 700px) {
    font-size: 22px;
  }
`;

const IconCell = styled.div`
  display: flex;
  color: #ffffff;
  flex: 0.25;
  align-items: center;
  justify-content: flex-end;
  padding-right: 24px;
`;

const IconRotate = styled.span`
  transition-duration: 0.15s;
  transition-property: transform;
  transform: ${(props) => (props.isActive ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const DescriptionWrapper = styled.p`
  margin: 13px 0 30px 0;
`;

const StatFullDescription = styled.div`
  color: #b7b7bb;
  padding: 0 10px;
  transition: max-height 0.5s;
  overflow: hidden;
  max-height: 0px;
  font-weight: 400;
  text-align: left;
  font-size: 5.4vw;
  line-height: 28px;

  ${(props) => (props.isActive ? `max-height: 1500px;` : ``)}

  @media (min-width: 700px) {
    font-size: 20px;
  }
`;

const Accordion = ({
  id,
  title,
  description,
  noBorder,
  isActive,
  toggleHandler,
}) => (
  <Row
    onClick={() => toggleHandler(id)}
    isActive={isActive}
    noBorder={noBorder}
  >
    <StatWrapper>
      <StatName>{title}</StatName>
      <IconCell>
        <IconRotate isActive={isActive}>
          <Icon size={22} icon="chevron" color="#fa4616" />
        </IconRotate>
      </IconCell>
    </StatWrapper>

    <StatFullDescription isActive={isActive}>
      {description.split('\n').map((i, key) => {
        return <DescriptionWrapper key={key}>{i}</DescriptionWrapper>;
      })}
    </StatFullDescription>
  </Row>
);

export default Accordion;

Accordion.propTypes = {
  id: PropTypes.number.isRequired,
  noBorder: PropTypes.bool,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  longDescription: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  toggleHandler: PropTypes.func.isRequired,
};

Accordion.defaultProps = {
  noBorder: false,
  isActive: false,
};
