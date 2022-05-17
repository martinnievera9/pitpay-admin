import styled from 'styled-components';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ButtonContainer = styled.button.attrs(props => ({
  style: props.inlineStyle
}))`
  border-radius: 5px;
  background-color: ${props => props.buttonColor || props.theme.colors.primary};
  ${'' /* height: ${props => (props.small ? "38px" : "50px")}; */}
  display: flex;
  padding: 0 16px;
  justify-content: center;
  align-items: center;
  border: 0;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  z-index: 0;

  ${props => (props.block ? `width: 100%;` : '')}

  &:disabled {
    background-color: #ccc;
  }

  &:hover:enabled {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))
      ${props => props.buttonColor || props.theme.colors.primary};
  }

  &:focus {
    outline: 0;
  }
`;

export const OutlineButtonContainer = styled(ButtonContainer)`
  background-color: transparent !important;
  border-width: 3px;
  border-style: solid;
  border-color: ${props => props.buttonColor || props.theme.colors.primary};
  ${props => (props.disabled ? `border-color: #ccc!important;` : '')}
  &:hover:enabled {
    background: ${props =>
      `${props.buttonColor || props.theme.colors.primary}1A` ||
      `${
        props.theme.colors.primary || props.theme.colors.primary
      }1A`}!important;
  }

  ${props =>
    props.disabled
      ? `border-color: #ccc!important;
  background-color: #ccc;`
      : ''}
`;

export const ButtonText = styled.span`
  color: ${props => props.textColor || '#ffffff'};
  font-family: 'Barlow Condensed';
  font-size: ${props =>
    props.fontSize ? `${props.fontSize}px` : props.small ? '10px' : '16px'};
  font-weight: 600;
  line-height: ${props => (props.small ? '10px' : '19px')};
  text-align: center;
  text-transform: uppercase;
  padding: 10px;

  @media (max-width: 768px) {
    font-size: ${props =>
      props.fontSize ? `${props.fontSize}px` : props.small ? '10px' : '20px'};
  }
`;

export const OutlineButtonText = styled(ButtonText)`
  color: ${props => props.textColor || props.theme.colors.primary};
  ${props => (props.disabled ? `color: #ccc;` : '')}
  ${props => (props.disabled ? `pointer-events: none;` : '')}
  ${props => props.textProps};
`;

export const StyledFontAwesomeIcon = styled.div`
  color: ${props => props.textColor || '#ffffff'};
  font-size: 18px;
  line-height: 16px;
  text-align: center;
`;

export const OutlineFontAwesomeIcon = styled.div`
  color: ${props => props.textColor || props.theme.colors.primary};
`;

export const ButtonLeftIcon = styled.div`
  color: ${props => props.textColor || '#ffffff'};
  font-size: ${props => (props.iconSize ? `${props.iconSize}px` : '14px')};
  ${props => (props.small ? 'font-size: 11px;' : '')};
  line-height: ${props => (props.small ? '10px' : '14px')};
  margin-right: 8px;
`;

export const OutlineButtonLeftIcon = styled(ButtonLeftIcon)`
  color: ${props => props.textColor || props.theme.colors.primary};
  ${props => (props.disabled ? `color: #ccc` : '')}
`;
