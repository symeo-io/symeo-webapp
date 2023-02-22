import { Color } from "./color.type";

const primary: Color = {
  0: "#FFFFFF",
  25: "#F2F6FF",
  50: "#E6EDFF",
  75: "#D9E3FE",
  100: "#CCD9FE",
  150: "#B3C4FD",
  200: "#9BAEFC",
  250: "#8499FB",
  300: "#6F84FA",
  350: "#5D70F8",
  400: "#4C5EF5",
  450: "#3E4DF2",
  500: "#313EEF",
  550: "#2631E9",
  600: "#1D25E2",
  650: "#151BD7",
  700: "#0E12C5",
  750: "#080BAA",
  800: "#040584",
  850: "#02025D",
  900: "#000139",
  950: "#000019",
};

primary.main = primary[450];
primary.light = primary[300];
primary.dark = primary[550];
primary.surface = primary[25];
primary.surfaceHover = primary[75];
primary.borders = primary[300];
primary.shape = primary[400];
primary.bordersHover = primary[400];
primary.shapeHover = primary[550];
primary.text = primary[550];
primary.shapeActive = primary[700];
primary.textHover = primary[700];
primary.textActive = primary[750];

export default primary;
