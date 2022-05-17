import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'components/Carousel';
import Loading from 'components/Loading';
import MobileContainer from 'components/MobileContainer';
import Spacer from 'components/Spacer';
import Text from 'components/Text';
import useTheme from 'hooks/useTheme';
import { useGetVideos } from './useGetVideos';
import { VimeoVideo } from './VimeoVideo';

const VideoSliderContainer = styled(MobileContainer)`
  background: ${props => props.theme.colors.secondary};
  overflow: hidden;
`;

export const VideoResourcesCarousel = ({ userType }) => {
  const theme = useTheme();
  const { data, loading } = useGetVideos(userType);
  const dataKey = userType === 'track' ? 'getTrackVideos' : 'getEmployeeVideos';

  if (loading) return <Loading />;

  const videos =
    data &&
    data[dataKey] &&
    data[dataKey].results &&
    Array.isArray(data[dataKey].results)
      ? data[dataKey].results
      : [];

  if (videos.length === 0) return null;

  return (
    <VideoSliderContainer>
      <Text
        color={theme.colors.text.white}
        type="heading"
        inlineStyle={{ padding: 10, display: 'block' }}
      >
        Video Resources
      </Text>

      <Carousel slidesToShow={3} indicators="arrows" alwaysShowNext>
        {videos.map((video, index) => {
          const { id, title, description, runtime, vimeoId } = video;
          return (
            <div key={id ?? index}>
              <VimeoVideo vimeoId={vimeoId} />
              <Spacer size={14} />
              <Text fontSize={18} lineHeight={28} color="#fff">
                {title}
              </Text>
              <Spacer size={8} />
              <Text fontSize={18} lineHeight={28} color="#B7B7BB">
                {description}
              </Text>
              <Spacer size={8} />
              <Text fontSize={14} lineHeight={28} color="#B7B7BB">
                Runtime: {runtime}
              </Text>
            </div>
          );
        })}
      </Carousel>
    </VideoSliderContainer>
  );
};
VideoResourcesCarousel.propTypes = {
  userType: PropTypes.oneOf(['track', 'employee'])
};
