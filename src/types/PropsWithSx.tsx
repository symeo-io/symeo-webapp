import { SxProps } from "@mui/material";
import { theme } from "theme/theme";

export type PropsWithSx = {
  sx?: SxProps<typeof theme>;
};
