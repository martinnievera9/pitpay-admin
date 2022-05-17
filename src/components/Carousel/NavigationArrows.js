import PropTypes from 'prop-types';
import React from 'react';
import Icon from 'components/Icon';
import useTheme from 'hooks/useTheme';

export const NavigationArrows = props => {
  const { nextSlide, previousSlide } = props;
  const theme = useTheme();
  return (
    <div className="carousel-arrows">
      <button className="prev" onClick={previousSlide}>
        <Icon icon={'chevron'} size={22} color={theme.colors.primary} />
      </button>
      <button className="next" onClick={nextSlide}>
        <Icon icon={'chevron'} size={22} color={theme.colors.primary} />
      </button>
    </div>
  );
};
NavigationArrows.propTypes = {
  nextSlide: PropTypes.func.isRequired,
  previousSlide: PropTypes.func.isRequired
};
