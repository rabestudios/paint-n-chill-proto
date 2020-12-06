import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    background: {
      default: "#F5F6F2",
    },
    primary: {
      main: "#9E8680",
    },
    secondary: {
      main: "#9B9BA7",
    },
  },
});

export const muiTheme = responsiveFontSizes(theme);
