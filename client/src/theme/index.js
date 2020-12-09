import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    background: {
      default: "#F5F6F2",
    },
    primary: {
      main: "#EB9F77",
    },
    secondary: {
      main: "#9E8680",
    },
  },
});

export const muiTheme = responsiveFontSizes(theme);
