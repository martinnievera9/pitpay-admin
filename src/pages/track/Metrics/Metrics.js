import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'components/Carousel';
import Icon from 'components/Icon';
import Text from 'components/Text';
import useTheme from 'hooks/useTheme';
import { useGetPromoterMetrics } from './useGetPromoterMetrics';

const Container = styled.div`
  background: ${(props) => props.theme.colors.secondary};
  border-radius: 5px;
  box-sizing: border-box;
  margin: 10px;
  overflow: hidden;
  padding: 15px;
  width: 100%;
  max-width: 377px;

  @media screen and (max-width: 860px) {
    max-height: 377px;
    width: calc(100% - 20px);
    max-width: unset;
  }
`;

const MetricsSet = styled.ul`
  margin-top: 20px;
`;

const MetricRow = styled.li`
  border-bottom: 1px solid ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.25rem;
  letter-spacing: 0.6px;
  padding: 16px 8px;
`;

const Count = styled.span`
  color: ${(props) => props.theme.colors.white};
  font-size: 24px;
`;

export const Metrics = () => {
  const theme = useTheme();
  const { data } = useGetPromoterMetrics();
  const metrics = data?.getPromoterMetrics ?? [];

  function renderMetrics(metrics, multiple = false) {
    return metrics.map((metric, index) => {
      const { venue, favorites, passes } = metric;
      return (
        <MetricsSet key={index}>
          {multiple && (
            <Text
              type="heading"
              color={theme.colors.white}
              fontSize={18}
              inlineStyle={{ display: 'block' }}
            >
              {venue ? venue : `Venue ${index + 1}`}
            </Text>
          )}
          <MetricRow>
            <Icon icon="star-outlined" size={30} color={theme.colors.primary} />
            Your Favorites<Count>{favorites}</Count>
          </MetricRow>
          <MetricRow>
            <Icon icon="ticket" size={30} color={theme.colors.primary} />
            Pit Passes Sold<Count>{passes}</Count>
          </MetricRow>
        </MetricsSet>
      );
    });
  }

  return (
    <Container>
      <Text type="heading" color={theme.colors.white}>
        Key Metrics (YTD)
      </Text>
      {metrics.length <= 1 ? (
        renderMetrics(metrics)
      ) : (
        <Carousel indicators="dots" slidesToShow={1}>
          {renderMetrics(metrics, true)}
        </Carousel>
      )}
    </Container>
  );
};
