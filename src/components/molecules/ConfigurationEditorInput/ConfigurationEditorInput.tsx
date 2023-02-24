import { PropsWithSx } from "types/PropsWithSx";
import { ConfigurationProperty } from "redux/api/configurations/configurations.types";
import { Box, InputBase, MenuItem, Select, styled } from "@mui/material";
import React, { useCallback } from "react";
import { colors } from "theme/colors";
import {
  getInputColorForProperty,
  parsePropertyValue,
  shouldUpdateValue,
} from "components/molecules/ConfigurationEditorInput/utils";
import ConfigurationEditorInputPlaceHolder from "components/molecules/ConfigurationEditorInput/ConfigurationEditorInputPlaceHolder";

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

export type ConfigurationEditorInputProps = PropsWithSx & {
  property: ConfigurationProperty;
  onChange: (value: unknown) => void;
  value: unknown;
  showSecrets?: boolean;
};

function ConfigurationEditorInput({
  property,
  value,
  onChange,
  showSecrets,
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
    <Box sx={{ width: "100%", position: "relative" }}>
      <ConfigurationEditorInputPlaceHolder
        property={property}
        value={value ?? ""}
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          padding: (theme) => theme.spacing(0.5),
          border: `1.5px solid transparent`,
        }}
      />
      <StyledInput
        type={property.secret && !showSecrets ? "password" : "text"}
        fullWidth
        sx={{
          color: getInputColorForProperty(property),
          ...sx,
        }}
        value={value ?? ""}
        onChange={onChangeWithFormatValidation}
      />
    </Box>
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
        value === "" ? (
          <ConfigurationEditorInputPlaceHolder
            property={property}
            value={value}
          />
        ) : (
          value.toString()
        )
      }
      value={value ?? ""}
      onChange={onChangeWithFormatValidation}
      sx={{
        color: getInputColorForProperty(property),
        marginTop: "1px",
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
