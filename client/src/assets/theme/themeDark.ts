import { createTheme } from "@mui/material";
import { COLORS } from "./colors";
import { getColorVariations } from "./config";

const themeDark = createTheme({
  palette: {
    mode: "dark",
    background: {
      paper: COLORS.text.secondary,
      default: COLORS.white,
    },
    text: {
      primary: COLORS.text.primary,
      secondary: COLORS.text.secondary,
      disabled: COLORS.disabled,
    },
    primary: {
      ...getColorVariations(COLORS.primary),
      contrastText: COLORS.text.secondary,
    },
    secondary: {
      ...getColorVariations(COLORS.secondary),
      contrastText: COLORS.text.secondary,
    },
    info: {
      ...getColorVariations(COLORS.info),
      contrastText: COLORS.text.secondary,
    },
    success: {
      ...getColorVariations(COLORS.success),
      contrastText: COLORS.text.secondary,
    },
    warning: {
      ...getColorVariations(COLORS.warning),
      contrastText: COLORS.text.secondary,
    },
    error: {
      ...getColorVariations(COLORS.error),
      contrastText: COLORS.text.secondary,
    },
    common: {
      black: COLORS.black,
      white: COLORS.white,
    },
    grey: getColorVariations(COLORS.grey),

    ...COLORS.custom,
  },
});
export default themeDark;
