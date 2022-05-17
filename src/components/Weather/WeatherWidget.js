import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';
import Images from 'images';
import { HourlyForecast } from './HourlyForecast';
import {
  Container,
  Title,
  HighLow,
  Heading,
  CurrentWrapper,
  CurrentWeather,
  CurrentTemp,
  CurrentText,
  WeatherButtonText,
  WeatherButtonLogo,
  WeatherButtonWrapper,
  Range,
} from './style';
import { useGetWeather } from './useGetWeather';

const calculateCurrentWeather = (hours) => {
  const currentTime = dayjs().unix();

  return hours.reduce(function (prev, curr) {
    return Math.abs(curr.timestamp - currentTime) < Math.abs(prev - currentTime)
      ? curr
      : prev;
  });
};

export const WeatherWidget = (props) => {
  const { data } = useGetWeather();
  const { Width, showHourly, showButton } = props;

  if (!data || !data.getWeather) return false;

  const weather = data.getWeather;
  const currentWeather = calculateCurrentWeather(weather.hours);

  return (
    <Container Width={Width}>
      <Heading>
        <Title>Weather</Title>
        <Range>
          <HighLow>{weather.dailyRange.high}</HighLow>
          <HighLow>/{weather.dailyRange.low}</HighLow>
        </Range>
      </Heading>
      <CurrentWrapper>
        <div style={{ width: '40%', margin: '0 20px' }}>
          <img
            alt={currentWeather.icon}
            style={{ width: '100%' }}
            src={`https://cdn.aerisapi.com/wxicons/v2/${currentWeather.icon}`}
          />
        </div>
        <CurrentWeather>
          <CurrentTemp style={{ fontSize: 80 }}>
            {currentWeather.temp}
            <span />
          </CurrentTemp>
          <CurrentText style={{ fontSize: 28 }}>
            {currentWeather.shortDescription}
          </CurrentText>
        </CurrentWeather>
      </CurrentWrapper>
      {showButton ? (
        <Link
          style={{
            borderRadius: 5,
            backgroundColor: '#fa4616',
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 8,
            paddingBottom: 8,
            textDecoration: 'none',
            color: '#fff',
            fontFamily: 'Barlow Condensed',
            fontSize: 20,
            fontWeight: 600,
            textAlign: 'center',
            lineHeight: 1.2,
            textTransform: 'uppercase',
            display: 'flex',
            justifyContent: 'space-between',
          }}
          to={`/admin-track/weather/`}
        >
          <WeatherButtonText>Hourly Forecast & Local Radar</WeatherButtonText>
          <WeatherButtonWrapper>
            <WeatherButtonLogo src={Images.logoVertical} alt="Logo" />
            <WeatherButtonText
              style={{ fontSize: 16, width: 50, textAlign: 'left' }}
            >
              Weather Center
            </WeatherButtonText>
          </WeatherButtonWrapper>
        </Link>
      ) : null}

      {showHourly ? (
        <HourlyForecast hours={weather.hours} Width={Width} />
      ) : null}
    </Container>
  );
};
