import PropTypes from 'prop-types';
import React from 'react';
import {
  ButtonContainer,
  OutlineButtonContainer,
  ButtonText,
  OutlineButtonText,
} from './StyledButton';

export const Button = ({
  children,
  textColor,
  outlined,
  disabled,
  small,
  fontSize,
  style,
  buttonStyle,
  ...props
}) => {
  let ButtonComponent = ButtonContainer;
  let TextComponent = ButtonText;
  let textColorToRender = textColor;

  if (outlined) {
    ButtonComponent = OutlineButtonContainer;
    TextComponent = OutlineButtonText;
    textColorToRender = props.buttonColor;
  }

  return (
    <ButtonComponent
      small={small}
      disabled={disabled}
      {...props}
      inlineStyle={buttonStyle}
    >
      {/* {renderIcon()} */}
      <TextComponent
        textColor={textColorToRender}
        disabled={disabled}
        small={small}
        fontSize={fontSize}
        style={style}
      >
        {children}
      </TextComponent>
    </ButtonComponent>
//     <div style={{ display: 'flex', justifyContent: 'center', ...buttonStyle }}>
//       <ButtonComponent small={small} disabled={disabled} {...props}>
//         {/* {renderIcon()} */}
//         <TextComponent
//           textColor={textColorToRender}
//           disabled={disabled}
//           small={small}
//           fontSize={fontSize}
//           style={style}
//         >
//           {children}
//         </TextComponent>
//       </ButtonComponent>
//     </div>
  );
};

Button.propTypes = {
  children: PropTypes.any.isRequired,
  leftIcon: PropTypes.any,
  iconSize: PropTypes.number,
  buttonColor: PropTypes.string,
  textColor: PropTypes.string,
  loading: PropTypes.bool,
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  outlined: PropTypes.bool,
  small: PropTypes.bool,
  inlineStyle: PropTypes.object,
};

Button.defaultProps = {
  leftIcon: null,
  iconSize: 13,
  buttonColor: null,
  textColor: null,
  loading: false,
  block: false,
  disabled: false,
  outlined: false,
  small: false,
  inlineStyle: null,
};
