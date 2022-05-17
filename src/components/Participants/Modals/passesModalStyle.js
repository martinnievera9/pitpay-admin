import styled from 'styled-components';

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
`;

export const ModalContainer = styled.div`
  width: 95%;
  max-width: 600px;
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
  max-height: 90vh;
  margin-top: 20px;
  z-index: 99999999999;
  ${(props) => (props.showModal ? 'overflow: auto; height: 80%;' : '')};

  @media (min-width: 768ox) {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const Wrapper = styled.div`
  padding: 20px;
  ${(props) => (props.showModal ? 'overflow: auto; height: 100%;' : '')};

  @media (min-width: 768px) {
    padding: 40px;
  }
`;

export const Heading = styled.span`
  font-family: Barlow Condensed;
  font-weight: 600;
  font-size: 24px;
  color: #00001f;
  display: block;
  padding: 0 10px;

  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

// export const Label = styled.span`
//   font-family: Roboto;
//   font-size: 15px;
//   font-weight: 600;
//   color: #00001f;
//   display: block;
//   margin-bottom: 10px;
// `;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const Item = styled.li`
  margin: 20px 0 20px;
  display: flex;

  &:before {
    content: '';
    width: 25px;
    margin-right: 10px;
    border-radius: 4px;
    ${(props) => (props.color ? `background-color: ${props.color}` : '')};
    display: inline-block;
  }
`;

export const Label = styled.span`
  color: #000;
  margin-right: 10px;
  font-size: 22px;
  font-family: 'Roboto';
  font-weight: 400;
`;

export const Info = styled.span`
  color: #00001f;
  flex: 1;
  font-family: Barlow Condensed;
  font-weight: 600;
  font-size: 25px;
  text-align: left;
`;

export const PassColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: ${(props) => props.color};
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
