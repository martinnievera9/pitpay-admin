import React from 'react';
import { Carousel } from 'components/Carousel';
import { formatTimestamp } from 'shared/formatters';
import { HourlyImage } from './HourlyImage';
import {
  Container,
  Wrapper,
  Item,
  Time,
  Temp,
  Precipitation,
} from './hourlyStyle';
import { Title } from './style';

export const HourlyForecast = (props) => {
  const { hours } = props;

  return (
    <Container>
      <Title>Hourly Forecast</Title>

      <Wrapper>
        <Carousel
          indicators="mini-arrows"
          slidesToShow={{ desktop: 4, mobile: 4 }}
          spacing={2}
        >
          {hours.map((hour) => (
            <Item key={hour.timestamp}>
              <Time>
                {formatTimestamp(hour.timestamp, 'h')}
                <span>{formatTimestamp(hour.timestamp, 'A')}</span>
              </Time>
              <HourlyImage altText={hour.image} iconFile={hour.icon} />
              <Temp>{hour.temp}</Temp>
              {hour.precipitation ? (
                <Precipitation>
                  <span className="percip">
                    <img
                      src="https://d3294qt0f4hbwl.cloudfront.net/raindrop.png"
                      alt="Rain Icon"
                    />
                  </span>
                  {hour.precipitation}
                  <span>%</span>
                </Precipitation>
              ) : null}
            </Item>
          ))}
        </Carousel>
      </Wrapper>
    </Container>
  );
};
