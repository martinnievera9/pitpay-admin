import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex: 1;
  width: calc(100% - 80px);
  ${props => (props.margin ? props.margin : 'margin: 30px 40px 0 40px;')};
`;

export const Column = styled.div`
  border-right: ${props => (props.noBorder ? 'none' : '1px solid #d8d8d8')};
  display: flex;
  flex-direction: row;
  /align-items: flex-start;
  justify-content: center;
  align-items: center;
  flex: 0.33;
`;

export const ColumnIcon = styled.div`
  width: 20px;
  height: 20px;
  margin: 0 18px 0 0;
  display: flex;
  flex: 0.2;
  justify-content: flex-end;
  /* margin-top: 9px; */
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
