import React from "react";
import { Autocomplete, InputAdornment } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import { Branch } from "redux/api/repositories/repositories.types";
import TextField from "components/molecules/TextField/TextField";
import GitBranchIcon from "components/atoms/icons/GitBranchIcon";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export type BranchSelectorProps = PropsWithSx & {
  value: string;
  onChange: (branchName: string) => void;
  branches: Branch[];
};

function BranchSelector({
  value,
  onChange,
  branches,
  sx,
}: BranchSelectorProps) {
  return (
    <Autocomplete
      value={value}
      onChange={(event: any, newValue: string | null) => {
        newValue && onChange(newValue);
      }}
      options={branches.map((branch) => branch.name)}
      sx={{
        width: 300,
        "& .MuiInputBase-root.MuiInput-root.MuiInputBase-root": {
          marginTop: 0,
          height: "42px",
          paddingY: 0,
        },
        "& .MuiAutocomplete-popupIndicator": { border: 0 },
        "& .MuiAutocomplete-endAdornment": {
          right: "4px",
          "& .MuiSvgIcon-root": { fontSize: "1.5rem" },
        },
        ...sx,
      }}
      disableClearable
      popupIcon={<KeyboardArrowDownIcon />}
      renderInput={({ InputProps, ...params }) => (
        <TextField
          InputProps={{
            ...InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <GitBranchIcon />
              </InputAdornment>
            ),
          }}
          {...params}
        />
      )}
    />
  );
}

export default BranchSelector;
