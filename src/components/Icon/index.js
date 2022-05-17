import React from "react";
import PropTypes from "prop-types";
import IcomoonReact from "icomoon-react";
import iconSet from "./selection.json";

import styled from "styled-components";

const IconLink = styled.a`
  cursor: pointer;
`;

const Icon = props => {
  const { color, size, icon, className, onClick, padding } = props;

  if (onClick)
    return (
      <div style={{ padding, display: "inline-block" }}>
        <IconLink onClick={onClick}>
          <IcomoonReact
            className={className}
            iconSet={iconSet}
            color={color}
            size={size}
            icon={icon}
          />
        </IconLink>
      </div>
    );

  return (
    <div style={{ padding, display: "inline-block" }}>
      <IcomoonReact
        className={className}
        iconSet={iconSet}
        color={color}
        size={size}
        icon={icon}
      />
    </div>
  );
};

Icon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  padding: PropTypes.string
};

Icon.defaultProps = {
  className: "",
  color: "",
  size: "100%",
  onClick: null,
  padding: "0px"
};

export default Icon;
