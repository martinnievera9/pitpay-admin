import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";

import defaultColors from "./colors";
import defaultFonts from "./fonts";

const PitPayThemeProvider = ({ children, theme, primaryColor }) => (
  <ThemeProvider
    theme={{
      colors: {
        ...defaultColors,
        ...theme.colors
      },
      fonts: {
        ...defaultFonts,
        ...theme.fonts
      }
    }}
  >
    {children}
  </ThemeProvider>
);

PitPayThemeProvider.propTypes = {
  children: PropTypes.any.isRequired,
  theme: PropTypes.shape({
    colors: PropTypes.object,
    fonts: PropTypes.object
  }),
  primaryColor: PropTypes.string
};

PitPayThemeProvider.defaultProps = {
  theme: {
    colors: {},
    fonts: {}
  },
  primaryColor: null
};

export default PitPayThemeProvider;
