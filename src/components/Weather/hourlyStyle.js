import styled from 'styled-components';

export const Container = styled.div`
  padding-top: 20px;
  margin-top: 20px;
  border-top: 1px solid #fff;
`;

export const Wrapper = styled.div`
  position: relative;
  margin-top: 20px;

  .carousel-arrows {
    position: absolute;
    top: -60px;
    right: 0px;
    display: none;

    @media (min-width: 769px) {
      display: block;
    }

    button {
      background-color: transparent;
      border: none;
      padding: 0;
      margin: 0 5px;
      height: 50px;
      width: 50px;
      cursor: pointer;

      &:focus {
        outline: none;
      }
    }

    .prev {
      transform: rotate(-270deg);
    }

    .next {
      transform: rotate(-90deg);
    }
  }
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Time = styled.p`
  font-family: 'Barlow Condensed';
  font-size: 22px;
  font-weight: 600;
  color: #fff;
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  span {
    font-size: 13px;
    margin-left: 2px;
  }
`;

export const Temp = styled.p`
  font-family: 'Barlow Condensed';
  font-size: 32px;
  font-weight: 600;
  color: #fff;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
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

export const Precipitation = styled.p`
  font-family: 'Barlow Condensed';
  font-size: 22px;
  font-weight: 600;
  color: #fff;
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;

  .percip {
    width: 10px;
    height: 10px;
    display: block;
    margin-right: 5px;

    img {
      display: block;
      width: 100%;
    }
  }
  span {
    font-size: 13px;
    margin-left: 2px;
  }
`;
