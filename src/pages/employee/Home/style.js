import styled from 'styled-components';

export const Title = styled.h3`
  display: inline;
  color: #ffffff;
  font-size: 6.8vw;
  line-height: 28px;
  font-weight: 600;
  font-family: Barlow Condensed;
  text-align: center;
  margin: 0;
  @media (min-width: 500px) {
    font-size: 26px;
  }
`;

export const TrackName = styled.span`
  display: inline;
  color: #9595a0;
  font-size: 5.5vw;
  line-height: 18px;
  font-weight: 400;
  text-align: left;
  @media (min-width: 500px) {
    font-size: 20px;
  }
`;

export const PitGate = styled.span`
  display: inline;
  color: #fa4616;
  font-size: 6vw;
  line-height: 28px;
  font-weight: 800;
  font-family: Roboto;
  text-align: left;
  padding-right: 6px;
  @media (min-width: 500px) {
    font-size: 22px;
  }
`;

export const PitGateTime = styled.span`
  display: inline;
  color: #ffffff;
  font-size: 6vw;
  line-height: 28px;
  font-weight: 800;
  font-family: Roboto;
  text-align: left;
  @media (min-width: 500px) {
    font-size: 22px;
  }
`;
