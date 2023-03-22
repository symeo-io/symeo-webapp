import { PropsWithSx } from "types/PropsWithSx";
import { PropsWithChildren } from "react";
import { styled } from "@mui/material";
import { colors } from "theme/colors";

export type CodeProps = PropsWithSx & PropsWithChildren;

const CodeWithSx = styled("code")();
function Code({ children, sx }: CodeProps) {
  return (
    <CodeWithSx
      sx={{
        backgroundColor: colors.primary.surfaceHover,
        borderRadius: "2px",
        paddingX: "2px",
        color: colors.primary.text,
        ...sx,
      }}
    >
      {children}
    </CodeWithSx>
  );
}

export default Code;
