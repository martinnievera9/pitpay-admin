import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Container = styled.div`
  background: #00001f;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px;
  overflow: hidden;
  padding: 15px;
  width: calc(100% - 20px);

  @media (min-width: 860px) {
    width: 100%;
    max-width: ${(props) => (props.Width ? `${props.Width}` : '380px')};
  }
`;

export const Title = styled.h2`
  font-family: 'Barlow Condensed';
  font-size: 22px;
  color: #ffffff;
  font-weight: 600;
`;

export const Range = styled.div`
  display: flex;
`;

export const HighLow = styled.h2`
  font-family: 'Barlow Condensed';
  font-size: 38px;
  color: #ffffff;
  font-weight: 600;
  position: relative;
  padding-right: 10px;

  :after {
    content: '';
    width: 5px;
    height: 5px;
    color: #fff;
    display: block;
    border: 3px solid #fff;
    border-radius: 50%;
    margin-top: 5px;
    position: absolute;
    right: 0;
    top: 0;
  }
`;

export const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

export const CurrentWrapper = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Barlow Condensed';
  color: #ffffff;

  margin: 40px 20px 20px 20px;
`;

export const CurrentTemp = styled.h2`
  font-size: 80px;
  font-weight: 600;
  display: flex;

  span {
    content: '';
    width: 10px;
    height: 10px;
    color: #fff;
    display: block;
    border: 5px solid #fff;
    border-radius: 50%;
    margin-top: 5px;
  }
`;

export const CurrentText = styled.p`
  font-size: 24px;
  font-weight: 500;
`;

export const CurrentWeather = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
`;

export const WeatherButtonWrapper = styled.span`
  display: flex;
  align-items: center;
`;

export const WeatherButtonText = styled.span`
  width: 50%;
  display: inline-block;
  text-align: center;
`;

export const WeatherButtonLogo = styled.img`
  width: 50px;
  display: block;
  margin-right: 5px;
`;

export const RadarWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

export const RadarInfo = styled.div`
  width: 100%;
`;

export const RadarRow = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
  align-items: flex-start;
`;

export const RadarLabel = styled.span`
  width: 30%;
  color: #fff;
  font-family: 'Roboto';
  font-size: 14px;
`;

export const RadarGradientWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 70%;
`;

export const RadarGradient = styled.div`
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fonts.default.fontSize}px;

  h4 {
    margin-bottom: 2px;
    text-align: center;
  }
  img {
    display: block;
    margin: 0 5px;
    height: 35px;
    width: 45%;
    margin-bottom: 10px;

    @media (min-width: 864px) {
      width: auto;
    }
  }
`;

export const RadarTypeWrapper = styled.div`
  width: 70%;
  margin-bottom: 10px;

  img {
    width: 100%;
    display: block;

    @media (min-width: 864px) {
      width: 50%;
    }
  }
`;

export const RadarTypeGradientContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const RadarType = styled.p`
  font-size: 12px;
  font-family: 'Roboto';
  color: #fff;
  margin-right: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  &:before {
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: ${(props) => (props.color ? props.color : 'transparent')};
    content: '';
    display: inline-block;
    margin-right: 5px;
  }
`;

export const AlertLegend = styled.div`
  color: ${(props) => props.theme.colors.white};
  display: flex;
  align-items: center;
  margin-right: 12px;
  margin-bottom: 12px;
`;

export const AlertLegendColor = styled.div`
  background-color: ${(props) => props.color};
  border: none;
  border-radius: 100%;
  margin-right: 4px;
  width: 11px;
  height: 11px;
`;
AlertLegendColor.propTypes = {
  color: PropTypes.string.isRequired,
};
