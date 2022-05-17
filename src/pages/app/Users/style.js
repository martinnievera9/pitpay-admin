import styled from 'styled-components';

export const ModalContainer = styled.div`
  max-width: 600px;
  height: 100%;
  padding: 20px;
`;

export const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PassRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const Passitem = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  justify-content: space-between;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eeeeee;
`;

export const TicketsWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
`;

export const Ticket = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

export const Wrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  text-align: left;

  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;
