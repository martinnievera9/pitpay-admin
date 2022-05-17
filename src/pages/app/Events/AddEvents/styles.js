import styled from 'styled-components';

export const TabContent = styled.div`
  width: 100%;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const Tabs = styled.div`
  overflow: hidden;
  background: #fff;
  font-family: Barlow Condensed;
  font-weight: 600;
  height: 3.5em;

  @media (max-width: 600px) {
    height: 2.8em;
  }
`;

export const SectionTitle = styled.p`
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 40px;

  @media (max-width: 600px) {
    color: #ffffff;
  }
`;

export const TicketSectionTitle = styled.p`
  font-weight: 500;
  font-size: 20px;
  margin-right: 60px;

  @media (max-width: 600px) {
    color: #ffffff;
  }
`;

export const Tab = styled.button.attrs({ type: 'button' })`
  border: none;
  color: ${(props) => (props.active ? '#FE5000' : '#000000')};
  outline: none;
  cursor: pointer;
  width: 12%;
  position: relative;
  margin-right: 0.1em;
  font-size: 1em;
  font-weight: bold;
  border-bottom: ${(props) => (props.active ? '3px solid #FE5000' : '')};
  background-color: ${(props) => (props.active ? 'white' : 'white')};
  height: ${(props) => (props.active ? '3em' : '2.6em; top:.4em')};
  transition: background-color 0.5s ease-in-out;
  font-family: Barlow Condensed;
  :hover {
    background-color: white;
  }

  @media (max-width: 600px) {
    width: 12%;
    font-size: 0.8em;
  }
`;

export const AddUpdateBtn = styled.button.attrs({ type: 'submit' })`
  border: none;
  margin-bottom:5px;
  color: #fff;
  outline: none;
  cursor: pointer;
  width: 14%;
  position: relative;
  margin-right: 0.1em;
  font-size: 1em;
  font-weight: bold;
  border-bottom: ${(props) => (props.active ? '3px solid #FE5000' : '')};
  background-color: #FE5000;
  border-radius:5px
  height: ${(props) => (props.active ? '3em' : '2.6em; top:.4em')};
  transition: background-color 0.5s ease-in-out;
  font-family: Barlow Condensed;


  @media (max-width: 600px) {
    width: 16%;
    font-size: 0.8em;
  }
`;

export const Content = styled.div`
  ${(props) => (props.active ? '' : 'display:none')}
  margin: 20px;
  padding-block: 20px;
`;

export const HeaderMain = styled.div`
  padding: 20px;
  background-color: #f4f4f4;
`;

export const MainRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  @media only screen and (min-width: 768px) {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  @media (max-width: 600px) {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }
`;

export const StyledText = styled.div`
  font-size: 20px;
  color: #000000;
  text-align: center;
  padding-block: 4px;
  margin: 4px;
  font-family: Barlow Condensed;
  font-weight: 600;
  font-size: 1.8vw;
`;

export const Title = styled.p`
  color: #000000;
  font-family: Barlow Condensed;
  font-weight: 600;
  font-size: 1vw;
  margin-block: 10px;
`;

export const PriceText = styled.p`
  color: #a5a5a5;
  font-family: Barlow Condensed;
  font-weight: 600;
  font-size: 1vw;
  margin-block: 10px;
`;

export const AmountRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-block: 20px;
`;

export const Line = styled.hr`
  color: rgba(169, 169, 169, 0.65);
`;

export const Header = styled.div`
  @media (max-width: 600px) {
    height: 39vh;
  }
`;

export const EventBody = styled.div`
  height: 73.8vh;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex: 1;

  @media (max-width: 600px) {
    height: 60vh;
    flex-direction: column;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;

export const SideBarMain = styled.div`
  background-color: #ffffff;
  height: fit-content;
  width: 20%;
  alignitems: center;
  justifycontent: center;

  @media (max-width: 600px) {
    width: 94%;
    padding: 16px;
    alignitems: center;
    justifycontent: center;
  }
`;

export const SideBarBody = styled.div`
  background-color: #ffffff;
  margin-top: 50px;
  height: auto;
  padding: 30px;
`;
export const CardText = styled.p`
  margin-bottom: 20px;
  display: flex;
  text-align: end;
  width: 20%;

  svg {
    margin-left: 10px;
  }

  @media (max-width: 600px) {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }
`;

export const EventHeaderSection = styled.div`
${(props) => (props.styles ? props.styles : 'width: 30%')}
  padding: 40px;
  alignitems: center;
  justifycontent: center;

  @media (max-width: 600px) {
    width: 94%;
    padding: 16px;
    alignitems: center;
    justifycontent: center;
  }
`;
