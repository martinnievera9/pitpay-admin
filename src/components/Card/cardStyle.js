import styled from 'styled-components';

export const Card = styled.div`
  /* padding: 20px 0; */
  /* border-bottom: 1px solid rgb(233, 233, 233); */

  &:first-child {
    padding-top: 0;
  }
`;

export const CardText = styled.p`
  margin-bottom: 20px;
  display: flex;
  text-align: end;

  svg {
    margin-left: 10px;
  }
`;

export const CardLabel = styled.p`
  font-size: 5vw;
  line-height: 20px;
  font-weight: 500;
  color: #727279;
  margin-right: 5px;

  @media (min-width: 700px) {
    font-size: 18px;
  }
`;

export const CardContent = styled.p`
  font-size: 5vw;
  line-height: 20px;
  font-weight: 600;
  color: #00001f;
  margin-left: 15px;
  width: 50%;
  overflow-wrap: break-word;

  @media (min-width: 700px) {
    font-size: 18px;
  }
`;

export const HideOnMobile = styled.div`
  display: none;

  @media (min-width: 860px) {
    display: block;
  }
`;

export const HideOnDesktop = styled.div`
  display: block;

  @media (min-width: 860px) {
    display: none;
  }
`;

export const ContainerWrapper = styled.div`
  height: 100%;

  @media (min-width: 860px) {
    width: 100%;
    flex-direction: row;
    display: flex;
    align-items: center;
  }
`;
