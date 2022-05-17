import NukaCarousel from 'nuka-carousel';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { IconButton } from 'components/Button';
import useTheme from 'hooks/useTheme';
import useWindowSize from 'hooks/useWindowSize';
import { IndicatorDots } from './IndicatorDots';
import { NavigationArrows } from './NavigationArrows';

const CarouselContainer = styled.div`
  // Making space for the indicator dots, if any
  ${(props) => (props.indicators === 'dots' ? `padding-bottom: 52px;` : '')}
  ${(props) => (props.indicators === 'arrows' ? `padding: 0 26px;` : '')}
  & .slider:focus,
  .slider-frame:focus {
    outline: none;
  }
  & .previous-button {
    transform: rotate(-90deg) scaleY(-1) translateY(88%);
  }
  & .next-button {
    transform: rotate(-90deg) translateY(88%);
  }
  & .slider-control-bottomcenter {
    width: 100%;
  }
`;
CarouselContainer.propTypes = {
  indicators: PropTypes.oneOf(['dots', 'mini-arrows', 'arrows']),
};

export const Carousel = (props) => {
  const {
    children,
    slidesToShow: slidesToShowProp,
    indicators,
    alwaysShowNext,
    spacing,
  } = props;
  const theme = useTheme();
  const [width] = useWindowSize();
  const isDesktop = width > 860;
  const slidesToShow =
    typeof slidesToShowProp === 'number'
      ? { desktop: slidesToShowProp, mobile: 1 }
      : slidesToShowProp ?? { desktop: 3, mobile: 1 };

  const carouselProps = {
    cellAlign: 'left',
    cellSpacing: spacing ?? width > 1280 ? 40 : 20,
    defaultControlsConfig: {
      containerClassName: 'carousel-container',
    },
    getControlsContainerStyles: (key) => {
      switch (key) {
        case 'BottomCenter':
          return {
            bottom: 'unset',
            top: '100%',
          };
        case 'TopRight':
          return {
            width: '100%',
          };
        default: {
          return;
        }
      }
    },
    disableEdgeSwiping: true,
    enableKeyboardControls: true,
    frameOverflow: 'hidden',
    slidesToScroll: isDesktop ? slidesToShow.desktop : slidesToShow.mobile,
    slidesToShow:
      (isDesktop ? slidesToShow.desktop : slidesToShow.mobile) +
      (alwaysShowNext ? 0.15 : 0),
    speed: 500,
    renderBottomCenterControls:
      !indicators || indicators === 'dots'
        ? ({ currentSlide, slideCount, slidesToScroll, goToSlide }) => (
            <IndicatorDots
              currentSlide={currentSlide}
              slideCount={slideCount}
              slidesToScroll={slidesToScroll}
              goToSlide={goToSlide}
            />
          )
        : null,
    renderTopRightControls:
      indicators === 'mini-arrows'
        ? ({ nextSlide, previousSlide }) => (
            <NavigationArrows
              nextSlide={nextSlide}
              previousSlide={previousSlide}
            />
          )
        : null,
    renderCenterLeftControls:
      indicators !== 'arrows' || !isDesktop
        ? null
        : ({ previousSlide }) => (
            <IconButton
              color={theme.colors.white}
              hoverColor={theme.colors.primary}
              size="large"
              variant="icon"
              onClick={previousSlide}
              icon="chevron"
              className="previous-button"
              aria-label="previous button"
            />
          ),
    renderCenterRightControls:
      indicators !== 'arrows' || !isDesktop
        ? null
        : ({ nextSlide }) => (
            <IconButton
              color={theme.colors.white}
              hoverColor={theme.colors.primary}
              size="large"
              variant="icon"
              onClick={nextSlide}
              icon="chevron"
              className="next-button"
              aria-label="next button"
            />
          ),
  };

  return (
    <CarouselContainer className="carousel-container" indicators={indicators}>
      <NukaCarousel {...carouselProps}>{children}</NukaCarousel>
    </CarouselContainer>
  );
};
Carousel.propTypes = {
  children: PropTypes.node.isRequired,
  indicators: PropTypes.oneOf(['dots', 'mini-arrows', 'arrows']),
  slidesToShow: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      desktop: PropTypes.number.isRequired,
      mobile: PropTypes.number.isRequired,
    }),
  ]),
  spacing: PropTypes.number,
  alwaysShowNext: PropTypes.bool,
};

Carousel.defaultProps = {
  indicators: 'dots',
  slidesToShow: 1,
};
