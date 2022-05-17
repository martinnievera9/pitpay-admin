import React from 'react';
import Container from 'components/Container';
import ContainerHeader from 'components/ContainerHeader';
import Text from 'components/Text';
import GetTrackVideos from './gql/get-track-videos';
import styled from 'styled-components';
import { VimeoVideo } from 'components/Video';
import { Row, Col } from 'react-grid-system';
import Spacer from 'components/Spacer';

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  background-color: #00001f;

  .video-item {
    width: calc(25% - 20px);
    margin: 0 10px 10px 10px;
  }
`;

const Videos = props => {
  let { data } = props;

  if (!data.getTrackVideos) return false;

  return (
    <Container style={{ borderRadius: 8 }}>
      <ContainerHeader
        style={{
          backgroundColor: '#00001f',
          borderBottomWidth: 0,
          height: 60,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5
        }}
      >
        <TitleContainer>
          <Text type="heading" color="#fff" inlineStyle={{ marginRight: 25 }}>
            Resources
          </Text>
        </TitleContainer>
      </ContainerHeader>
      <Wrapper
        style={{
          paddingTop: 0,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5
        }}
      >
        {data.getTrackVideos.results.map((item, index) => (
          <div className="video-item" index={index}>
            <VimeoVideo vimeoId={item.vimeoId} />
            <Spacer size={14} />
            <Row>
              <Col>
                <Text fontSize={18} lineHeight={28} color="#fff">
                  {item.title}
                </Text>
              </Col>
            </Row>
            <Spacer size={8} />
            <Row>
              <Col>
                <Text fontSize={18} lineHeight={28} color="#B7B7BB">
                  {item.description}
                </Text>
              </Col>
            </Row>
            <Spacer size={8} />
            <Row>
              <Col>
                <Text fontSize={14} lineHeight={28} color="#B7B7BB">
                  Runtime: {item.runtime}
                </Text>
              </Col>
            </Row>
          </div>
        ))}
      </Wrapper>
    </Container>
  );
};

export default GetTrackVideos(Videos);
