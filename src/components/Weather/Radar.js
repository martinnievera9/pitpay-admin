import React from 'react';
import useWindowSize from 'hooks/useWindowSize';
import {
  AlertLegend,
  AlertLegendColor,
  Container,
  Heading,
  Title,
  RadarInfo,
  RadarRow,
  RadarLabel,
  RadarTypeWrapper,
  RadarGradient,
  RadarGradientWrapper,
} from './style';
import { useRadarMap } from './useRadarMap';

export const WEATHER_ALERTS = [
  {
    label: 'Tornado Warning',
    code: 'TO.W',
    color: '#ff0000',
  },
  {
    label: 'Tornado Watch',
    code: 'TO.A',
    color: '#ffff00',
  },
  {
    label: 'Severe T-Storm Warning',
    code: 'SV.W',
    color: '#ffa500',
  },
  {
    label: 'Severe T-Storm Watch',
    code: 'SV.A',
    color: '#db7093',
  },
  {
    label: 'Severe Weather Statement',
    code: 'SV.S',
    color: '#00ffff',
  },
  {
    label: 'Special Weather Statement',
    code: 'SPS',
    color: '#ffe4b5',
  },
  {
    label: 'Coastal Flood Advisory',
    code: 'CF.Y',
    color: '#7cfc00',
  },
  {
    label: 'Coastal Flood Statement',
    code: 'CF.S',
    color: '#6b8e23',
  },
  {
    label: 'Coastal Flood Warning',
    code: 'CF.W',
    color: '#228b22',
  },
  {
    label: 'Coastal Flood Watch',
    code: 'CF.A',
    color: '#66cdaa',
  },
  {
    label: 'Lakeshore Flood Advisory',
    code: 'LS.Y',
    color: '#7cfc00',
  },
  {
    label: 'Lakeshore Flood Statement',
    code: 'LS.S',
    color: '#6b8e23',
  },
  {
    label: 'Lakeshore Flood Warning',
    code: 'LS.W',
    color: '#228b22',
  },
  {
    label: 'Lakeshore Flood Watch',
    code: 'LS.A',
    color: '#66cdaa',
  },
  {
    label: 'Flash Flood Statement',
    code: 'FF.S',
    color: '#8b0000',
  },
  {
    label: 'Flash Flood Warning',
    code: 'FF.W',
    color: '#8b0000',
  },
  {
    label: 'Flash Flood Watch',
    code: 'FF.A',
    color: '#2e8b57',
  },
  {
    label: 'Flood Statement',
    code: 'FL.S',
    color: '#00ff00',
  },
  {
    label: 'Flood Warning',
    code: 'FL.W',
    color: '#00ff00',
  },
  {
    label: 'Flood Watch',
    code: 'FL.A',
    color: '#2e8b57',
  },
  {
    label: 'Excessive Heat Warning',
    code: 'EH.W',
    color: '#c71585',
  },
  {
    label: 'Excessive Heat Watch',
    code: 'EH.A',
    color: '#800000',
  },
  {
    label: 'Heat Advisory',
    code: 'HT.Y',
    color: '#ff7f50',
  },
  {
    label: 'Heat Warning',
    code: 'HT.W',
    color: '#ff4811',
  },
  {
    label: 'Weather Advisory',
    code: 'WX.Y',
    color: '#e8e172',
  },
];

function getLat(data) {
  const firstEvent =
    data?.getUpcomingEvent && Array.isArray(data.getUpcomingEvent)
      ? data.getUpcomingEvent[0]
      : undefined;
  const me = data?.me;
  const lat = firstEvent?.track?.lat ?? me?.track?.lat;
  return lat;
}

function getLng(data) {
  const firstEvent =
    data?.getUpcomingEvent && Array.isArray(data.getUpcomingEvent)
      ? data.getUpcomingEvent[0]
      : undefined;
  const me = data?.me;
  const lng = firstEvent?.track?.lng ?? me?.track?.lng;
  return lng;
}

export const Radar = (props) => {
  const { Width, data } = props;
  const [width] = useWindowSize();
  const lat = getLat(data);
  const lng = getLng(data);

  useRadarMap({
    lat,
    lng,
  });

  if (!lat && !lng) return null;

  const weatherAlerts = WEATHER_ALERTS.sort((a, b) =>
    a.label > b.label ? 1 : a.label < b.label ? -1 : 0
  );

  return (
    <Container Width={Width}>
      <Heading>
        <Title>Radar</Title>
      </Heading>
      <div>
        <div
          id="radarmap"
          style={{
            width: '100%',
            height: width > 800 ? 295 : 480,
            backgroundColor: 'grey',
            marginTop: 12,
          }}
        />
      </div>
      <RadarInfo>
        <RadarRow>
          <RadarLabel>Radar</RadarLabel>
          <RadarGradientWrapper>
            <RadarGradient>
              <h4>Rain</h4>
              <img
                alt="Radar Rain"
                src={'https://d3294qt0f4hbwl.cloudfront.net/radar3.png'}
              />
            </RadarGradient>
            <RadarGradient>
              <h4>Ice</h4>
              <img
                alt="Radar Ice"
                src={'https://d3294qt0f4hbwl.cloudfront.net/radar-ice4.png'}
              />
            </RadarGradient>
            <RadarGradient>
              <h4>Snow</h4>
              <img
                alt="Radar Snow"
                src={'https://d3294qt0f4hbwl.cloudfront.net/radar-snow3.png'}
              />
            </RadarGradient>
          </RadarGradientWrapper>
        </RadarRow>
        <RadarRow>
          <RadarLabel>Storm Cells</RadarLabel>
          <RadarTypeWrapper>
            <img
              alt="Radar Snow"
              src={'https://d3294qt0f4hbwl.cloudfront.net/stormcells.png'}
            />
          </RadarTypeWrapper>
        </RadarRow>
        <RadarRow>
          <RadarLabel>Weather Alerts</RadarLabel>
          <RadarTypeWrapper style={{ display: 'flex', flexWrap: 'wrap' }}>
            {weatherAlerts.map((alert) => {
              const { label, color } = alert;
              return (
                <AlertLegend>
                  <AlertLegendColor color={color} />
                  <span>{label}</span>
                </AlertLegend>
              );
            })}
          </RadarTypeWrapper>
        </RadarRow>
      </RadarInfo>
    </Container>
  );
};
