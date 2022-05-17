import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const IndicatorWrapper = styled.div`
  border-radius: 12px;
  box-sizing: border-box;
  color: rgba(18, 18, 18, 0.15);
  display: inline-block;
  line-height: 0;
  margin: 15px 0;
  padding: 7px 12px;
  text-align: center;
  width: 100%;
`;

const Dot = styled.div`
  display: inline-block;
  cursor: pointer;
  background-color: ${(props) =>
    props.isActive ? props.theme.colors.primary : `#e0dfdf`};
  height: 8px;
  width: 32px;
  border-radius: 6px;
  margin-left: 18px;

  &:first-child {
    margin-left: 0;
  }
`;

export const IndicatorDots = (props) => {
  const { currentSlide, slideCount, slidesToScroll, goToSlide } = props;

  const numberOfDots = Math.ceil(slideCount / slidesToScroll);
  const activeDotIndex = Math.floor(currentSlide / slidesToScroll);

  return (
    <IndicatorWrapper>
      {Array(numberOfDots)
        .fill(null)
        .map((_, index) => (
          <Dot
            key={index}
            onClick={() => goToSlide(index * slidesToScroll)}
            isActive={index === activeDotIndex}
          />
        ))}
    </IndicatorWrapper>
  );
};
IndicatorDots.propTypes = {
  currentSlide: PropTypes.number.isRequired,
  slideCount: PropTypes.number.isRequired,
  slidesToScroll: PropTypes.number.isRequired,
  goToSlide: PropTypes.func.isRequired,
};
