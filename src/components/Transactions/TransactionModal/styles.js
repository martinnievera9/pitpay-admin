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

export const Heading = styled.div`
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #d8d8d8;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eeeeee;
`;

export const TransferButton = styled.div`
  border-radius: 5px;
  background-color: #fa4616;
  display: flex;

  justify-content: center;
  align-items: center;
  border: 0;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))
      rgb(250, 70, 22);
  }

  ${(props) =>
    props.disabled
      ? `background-color: #ccc;
  &:hover {
    background: #eee;
  }`
      : ''};

  a {
    color: #ffffff;
    font-family: 'Barlow Condensed';
    font-size: 22px;
    font-weight: 600;
    line-height: 19px;
    text-align: center;
    text-transform: uppercase;
    text-decoration: none;
    width: 100%;
    height: 40px;
    line-height: 40px;

    ${(props) => (props.disabled ? `pointer-events: none;` : '')};
  }
`;

export const RefundButton = styled.button`
  border-width: 3px;
  border-style: solid;
  border-color: #fa4616;
  font-weight: 600;
  line-height: 19px;
  text-align: center;
  text-transform: uppercase;
  padding: 10px;
  color: #fa4616;
  font-size: 22px;
  font-family: 'Barlow Condensed';
  background-color: #fff;
  width: 100%;
  display: block;
  margin-top: 20px;
  border-radius: 5px;
  cursor: pointer;
  ${(props) =>
    props.disabled
      ? `border-width: 3px;
  border-style: solid;
  border-color: #ccc; color: #ccc; pointer-events: none`
      : ''};

  &:hover {
    background: rgba(250, 70, 22, 0.1) !important;
  }
`;

export const PassRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
`;

export const PassItem = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  justify-content: space-between;
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
