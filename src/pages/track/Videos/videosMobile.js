import React from 'react';
import { Row, Col } from 'react-grid-system';
import MobileContainer from 'components/MobileContainer';
import Spacer from 'components/Spacer';
import Text from 'components/Text';
import { VimeoVideo } from 'components/Video';
import GetTrackVideos from './gql/get-track-videos';

const VideosMobile = props => {
  let { data } = props;

  if (!data.getTrackVideos) return false;

  return (
    <div>
      <Spacer size={10} />
      <MobileContainer padding="20px">
        <Text type="heading" color="#fff" inlineStyle={{ marginRight: 25 }}>
          Resources
        </Text>
      </MobileContainer>

      {data.getTrackVideos.results.map(item => (
        <MobileContainer key={item.id}>
          <VimeoVideo vimeoId={item.vimeoId} />
          <Spacer size={14} />
          <Row>
            <Col>
              <Text fontSize={22} lineHeight={28} color="#fff">
                {item.title}
              </Text>
            </Col>
          </Row>
          <Spacer size={8} />
          <Row>
            <Col>
              <Text fontSize={20} lineHeight={28} color="#B7B7BB">
                {item.description}
              </Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text fontSize={20} lineHeight={28} color="#B7B7BB">
                Runtime: {item.runtime}
              </Text>
            </Col>
          </Row>
        </MobileContainer>
      ))}
    </div>
  );
};

export default GetTrackVideos(VideosMobile);
