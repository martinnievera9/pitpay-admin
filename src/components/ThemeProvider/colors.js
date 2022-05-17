const PRIMARY = '#fa4616';
const SECONDARY = '#00001f';

const colors = {
  primary: PRIMARY,
  primaryRgb: 'rgb(250, 70, 22)',
  primaryOpacity: opacity =>
    typeof opacity === 'number'
      ? `rgb(250, 70, 22, ${opacity})`
      : 'rgb(250, 70, 22)',
  secondary: SECONDARY,
  black: '#000',
  white: '#fff',
  border: '#e6e6e6',
  'border-light': '#e9e9e9',
  'border-input': '#dcdcdc',
  errorBackground: '#FF9494',
  error: '#ED4337',
  gray: {
    // Stole these straight from `material-ui`, with some modifications
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
    A100: '#d8d8d8',
    A200: '#aaaaaa',
    A400: '#303030',
    A700: '#616161'
  },

  text: {
    dark: '#283339',
    light: '#727279',
    black: SECONDARY,
    link: PRIMARY,
    white: '#ffffff',
    gray: '#707273',
    header: '#3c4144'
  },

  background: {
    light: '#F4F4F4',
    dark: SECONDARY,
    mobile: SECONDARY
  }
};

export default colors;
