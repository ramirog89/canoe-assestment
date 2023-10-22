import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface ThemeOptions {
    colors?: any;
  }
}

export const STYLE = {
  COLOR: {
    PRIMARY: "#002869",
    WHITE: "#FFFFFF",
    WHITE1: "#FAFAFA",
    black: "#000000",
    ERROR: "#f44336",
    GREEN: "#0E7C34",
    DISABLED: "#E0E0E0",
    STATUS_INFO: "#FEFCCE",
    STATUS_SUCCESS: "#D2ECCD",
    STATUS_WARNING: "#FCDA9A",
    STATUS_ERROR: "#FECECE",
  },
};

export const theme = createTheme({
  palette: {
    primary: {
      main: STYLE.COLOR.PRIMARY,
    },
  },
  colors: STYLE.COLOR,
});
