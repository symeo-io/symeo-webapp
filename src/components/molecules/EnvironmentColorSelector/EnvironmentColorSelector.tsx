import { PropsWithSx } from "types/PropsWithSx";
import { Box, InputLabel } from "@mui/material";
import { EnvironmentColor } from "redux/api/environments/environments.types";
import { colors, environmentsColorPalettes } from "theme/colors";

export type EnvironmentColorSelectorProps = PropsWithSx & {
  label: string;
  value: EnvironmentColor;
  onChange: (value: EnvironmentColor) => void;
  required?: boolean;
};

function EnvironmentColorSelector({
  label,
  value,
  onChange,
  required = false,
  sx,
}: EnvironmentColorSelectorProps) {
  return (
    <Box sx={{ ...sx }}>
      <InputLabel required={required}>{label}</InputLabel>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          paddingY: (theme) => theme.spacing(1),
        }}
      >
        {Object.keys(environmentsColorPalettes).map((paletteName) => (
          <Box
            onClick={() => onChange(paletteName as EnvironmentColor)}
            sx={{
              height: "32px",
              width: "52px",
              boxSizing: "border-box",
              border: `2px solid ${
                paletteName === value ? colors.primary.borders : "transparent"
              }`,
              borderRadius: "3px",
              position: "relative",
              margin: (theme) => theme.spacing(0.5),
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: "100%",
                borderRadius: "3px",
                backgroundColor:
                  environmentsColorPalettes[
                    paletteName as keyof typeof environmentsColorPalettes
                  ][700],
                cursor: "pointer",

                "&:hover": {
                  backgroundColor:
                    environmentsColorPalettes[
                      paletteName as keyof typeof environmentsColorPalettes
                    ][900],
                },

                "&:after":
                  paletteName === value
                    ? {
                        content: '""',
                        position: "absolute",
                        inset: "0",
                        border: "2px white solid",
                        pointerEvents: "none",
                      }
                    : undefined,
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default EnvironmentColorSelector;
