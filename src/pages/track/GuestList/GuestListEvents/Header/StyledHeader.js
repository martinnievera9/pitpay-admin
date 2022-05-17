import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 30px 20px 0 20px;
  background-color: #fff;
  border-bottom-width: 1px;
  border-color: #e6e6e6;
  border-style: solid;
  border-radius: 5px;
  padding: 20px;

  @media (min-width: 860px) {
    width: calc(100% - 80px);
    border: none;
    justify-content: space-between;
    flex-direction: row;
    padding: 0;
    flex: 1;
    background-color: transparent;
    margin: 30px 40px 0 40px;
  }
`;

export const Column = styled.div`
  display: ${props => (props.hideMobile ? 'none' : 'flex')};
  flex-direction: row;
  align-items: center;
  width: 100%;

  @media (min-width: 860px) {
    display: flex;
    flex: 0.33;
    width: auto;
    justify-content: center;
    border-right: ${props => (props.noBorder ? 'none' : '1px solid #d8d8d8')};
  }
`;

export const ColumnIcon = styled.div`
  width: 20px;
  height: 20px;
  margin: 0 18px 0 0;
  display: flex;

  justify-content: flex-end;

  @media (min-width: 860px) {
    flex: 0.2;
  }
`;

export const ColumnText = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.8;
  justify-content: center;
`;

export const TrackLogo = styled.div`
  width: 150px;
`;
