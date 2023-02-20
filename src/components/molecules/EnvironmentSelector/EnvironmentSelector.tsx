import React, { useCallback, useState } from "react";
import { Box, MenuItem, Select } from "@mui/material";
import { Environment } from "redux/api/environments/environments.types";
import { PropsWithSx } from "types/PropsWithSx";
import NewEnvironmentDialog from "components/organisms/NewEnvironmentDialog/NewEnvironmentDialog";
import { useIntl } from "react-intl";
import EnvironmentTab from "components/molecules/EnvironmentTab/EnvironmentTab";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { colors } from "theme/colors";
import AddIcon from "@mui/icons-material/Add";
import Button from "components/atoms/Button/Button";

export type EnvironmentSelectorProps = PropsWithSx & {
  repositoryVcsId: number;
  configurationId: string;
  configurationName: string;
  value: Environment;
  onChange: (environment: Environment) => void;
  environments: Environment[];
};

function EnvironmentSelector({
  repositoryVcsId,
  configurationId,
  configurationName,
  value,
  onChange,
  environments,
  sx,
}: EnvironmentSelectorProps) {
  const { formatMessage } = useIntl();
  const [selectOpen, setSelectOpen] = React.useState(false);
  const handleOpenSelect = useCallback(() => setSelectOpen(true), []);
  const handleCloseSelect = useCallback(() => setSelectOpen(false), []);

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const handleOpenDialog = useCallback(() => {
    handleCloseSelect();
    setDialogOpen(true);
  }, []);
  const handleCloseDialog = useCallback(() => setDialogOpen(false), []);

  return (
    <>
      <Select
        value={value.id}
        open={selectOpen}
        onOpen={handleOpenSelect}
        onClose={handleCloseSelect}
        IconComponent={KeyboardArrowDownIcon}
        onChange={(e) => {
          const selectedEnvironment = environments.find(
            (environment) => environment.id === e.target.value
          );

          if (selectedEnvironment) {
            onChange(selectedEnvironment);
          }
        }}
        renderValue={(environmentId) => {
          const selectedEnvironment = environments.find(
            (environment) => environment.id === environmentId
          ) as Environment;

          return <EnvironmentTab environment={selectedEnvironment} />;
        }}
        sx={{
          minWidth: "230px",
          height: "42px",
          "& .MuiSelect-select": { padding: "11px 14px" },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: colors.secondary.borders,
          },

          "&:hover": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.secondary.borders,
            },
          },

          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.secondary.borders,
              borderWidth: 1,
            },
          },
          ...sx,
        }}
        MenuProps={{
          sx: {
            "& .MuiList-root": {
              paddingY: 0,
            },
          },
        }}
      >
        {environments.map((environment) => (
          <MenuItem
            key={environment.id}
            value={environment.id}
            sx={{
              paddingX: (theme) => theme.spacing(2),
              paddingY: (theme) => theme.spacing(1.5),
            }}
          >
            <EnvironmentTab
              environment={environment}
              selected={value.id === environment.id}
            />
          </MenuItem>
        ))}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            borderTop: `1px solid ${colors.secondary.borders}`,
            padding: (theme) => theme.spacing(1),
            cursor: "pointer",
            color: colors.primary.text,
            fontWeight: 700,

            "&:hover": {
              backgroundColor: colors.primary.surfaceHover,
            },
          }}
          onClick={handleOpenDialog}
        >
          <AddIcon sx={{ marginRight: (theme) => theme.spacing(1) }} />
          {formatMessage({ id: "new-environment.button-label" })}
        </Box>
      </Select>
      <NewEnvironmentDialog
        repositoryVcsId={repositoryVcsId}
        configurationName={configurationName}
        configurationId={configurationId}
        open={dialogOpen}
        handleClose={handleCloseDialog}
        onCreate={onChange}
      />
    </>
  );
}

export default EnvironmentSelector;
