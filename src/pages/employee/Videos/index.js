import React from 'react';
import { Row, Col } from 'react-grid-system';
import { H3 } from 'components/Heading';
import MobileContainer from 'components/MobileContainer';
import Spacer from 'components/Spacer';
import Text from 'components/Text';
import { VimeoVideo } from 'components/Video';
import GetVideos from './gql/queries/get-videos';

const VideosMobile = props => {
  let { data } = props;

  if (!data.getEmployeeVideos) return false;

  return (
    <div>
      <Spacer size={10} />
      <MobileContainer padding="20px">
        <H3>Resources</H3>
      </MobileContainer>

      {data.getEmployeeVideos.results.map(item => (
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
          <Spacer size={8} />
          <Row>
            <Col>
              <Text fontSize={20} lineHeight={28} color="#B7B7BB">
                March, 14 2019
              </Text>
            </Col>
          </Row>
        </MobileContainer>
      ))}
    </div>
  );
};

export default GetVideos(VideosMobile);
