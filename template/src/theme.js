import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1DA57A',
    },
    background: {
      default: '#f0f2f5',
    },
  },
  typography: {
    htmlFontSize: 10,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 450,
    fontWeightBold: 600,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      '"Noto Sans"',
      '"Droid Sans"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      '"Noto Color Emoji"',
    ].join(','),
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        button: {
          color: 'inherit',
        },
      },
    },
    MuiButton: {
      root: {
        fontWeight: 400,
      },
    },
    MuiInputBase: {
      root: {
        // color: 'rgb(0,0,0,0.65)',
      },
    },
  },
});

export default theme;
