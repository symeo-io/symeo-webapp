import { PropsWithSx } from "types/PropsWithSx";
import { ConfigurationProperty } from "redux/api/configurations/configurations.types";
import { Box, InputBase, MenuItem, Select, styled } from "@mui/material";
import React, { useCallback } from "react";
import { colors } from "theme/colors";

const StyledInput = styled(InputBase)(({ theme }) => ({
  background: "transparent",
  fontFamily: "Fira Mono",

  "& .MuiInputBase-input": {
    border: `1.5px solid transparent`,
    borderRadius: "6px",
    transition: "border 0.3s",
    padding: theme.spacing(0.5),

    "&:hover": {
      border: `1.5px solid ${colors.secondary.shapeHover}`,
    },

    "&:focus": {
      border: `1.5px solid ${colors.secondary.shapeHover}`,
    },
  },

  "& .MuiSelect-icon": {
    color: "transparent",
    transition: "color 0.3s",
  },

  "&:hover .MuiSelect-icon": {
    color: colors.secondary.shapeHover,
  },
}));

const INTEGER_REGEX = /^\d*$/;
const FLOAT_REGEX = /^\d+\.\d+$/;

function shouldUpdateValue(
  property: ConfigurationProperty,
  value: string
): boolean {
  if (property.type === "integer") {
    return !!value.match(INTEGER_REGEX);
  }

  if (property.type === "float") {
    return !!value.match(INTEGER_REGEX) || !!value.match(FLOAT_REGEX);
  }

  return true;
}

function parsePropertyValue(property: ConfigurationProperty, value: string) {
  if (property.type === "integer") {
    return value ? parseInt(value) : undefined;
  }

  if (property.type === "float") {
    return value ? parseFloat(value) : undefined;
  }

  if (property.type === "boolean") {
    switch (value) {
      case "true":
        return true;
      case "false":
        return true;
      default:
        return undefined;
    }
  }

  return value;
}

function getInputColorForProperty(property: ConfigurationProperty) {
  switch (property.type) {
    case "boolean":
      return "#f3c364";
    case "integer":
    case "float":
      return "#6470F3";
    case "string":
      return "#69D3A7";
  }
}

export type ConfigurationEditorInputProps = PropsWithSx & {
  property: ConfigurationProperty;
  onChange: (value: unknown) => void;
  value: unknown;
};

function ConfigurationEditorInput({
  property,
  value,
  onChange,
  sx,
}: ConfigurationEditorInputProps) {
  const onChangeWithFormatValidation = useCallback(
    (e: { target: { value: unknown } }) => {
      const value = e.target.value as string;
      if (shouldUpdateValue(property, value)) {
        onChange(parsePropertyValue(property, value));
      }
    },
    [onChange, property]
  );

  return property.type !== "boolean" ? (
    <StyledInput
      fullWidth
      placeholder={property.type}
      sx={{
        color: getInputColorForProperty(property),
        ...sx,
      }}
      value={value ?? ""}
      onChange={onChangeWithFormatValidation}
    />
  ) : (
    <Select
      placeholder={property.type}
      input={<StyledInput />}
      MenuProps={{
        sx: {
          "& .MuiPaper-root": {
            background: "#131626",
            boxShadow: "none",
            border: `1.5px solid #2E3247`,

            "& .MuiList-root": {
              padding: 0,
            },

            "& .MuiMenuItem-root": {
              paddingY: (theme) => theme.spacing(0.5),
              paddingX: (theme) => theme.spacing(1.5),

              "&:hover": {
                background: "rgba(255,255,255,0.05)",
              },

              "&.Mui-selected": {
                background: "rgba(255,255,255,0.1)",
              },
            },
          },
        },
      }}
      displayEmpty
      renderValue={(value: any) =>
        value === "" ? <Box sx={{ opacity: 0.5 }}>boolean</Box> : value
      }
      value={value ?? ""}
      onChange={onChangeWithFormatValidation}
      sx={{
        color: getInputColorForProperty(property),
        ...sx,
      }}
    >
      <MenuItem value="" sx={{ color: "#9095AD" }}>
        none
      </MenuItem>
      <MenuItem value="true" sx={{ color: "#f3c364" }}>
        true
      </MenuItem>
      <MenuItem value="false" sx={{ color: "#f3c364" }}>
        false
      </MenuItem>
    </Select>
  );
}

export default ConfigurationEditorInput;
