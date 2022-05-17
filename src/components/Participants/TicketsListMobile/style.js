import PropTypes from 'prop-types';
import styled from 'styled-components';

export const ButtonAction = styled.button`
  padding: 0;
  margin: 0;
  border: none;
  display: flex;
  align-items: center;
  background-color: transparent;
`;

export const Text = styled.span`
  display: inline;
  color: #fff;
  font-size: 4.3vw;
  line-height: 19px;
  font-weight: 500;
  font-family: Roboto;
  text-align: left;
  @media (min-width: 500px) {
    font-size: 16px;
  }
`;

export const ParticipantName = styled.p`
  font-weight: 500;
  margin-left: 20px;
  display: inline;
  font-size: 5.3vw;
  line-height: 1.25;
  text-align: left;

  @media (min-width: 500px) {
    font-size: 20px;
  }
`;
ParticipantName.propTypes = {
  faded: PropTypes.bool,
};

export const ParticipantList = styled.div`
  background-color: #fff;
  border-radius: 5px;
  height: 100%;
  width: calc(100% - 20px);
  margin: 0 10px 0 10px;
  padding: 10px 0;
  box-sizing: border-box;
`;

export const ParticipantRow = styled.div`
  color: ${(props) =>
    props.highlighted ? props.theme.colors.text.gray : 'inherit'};
  cursor: pointer;
  display: flex;
  padding: 15px 10px;
  justify-content: space-between;
  position: relative;
`;
ParticipantRow.propTypes = {
  highlighted: PropTypes.bool,
};
