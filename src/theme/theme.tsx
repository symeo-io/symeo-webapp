import { createTheme } from "@mui/material";
import { colors } from "./colors";
import ClearIcon from "@mui/icons-material/Clear";

export const SIDE_BAR_WIDTH = 260;

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      contrastText: "#FFFFFF",
      ...colors.primary,
    },
    secondary: {
      contrastText: "#FFFFFF",
      ...colors.secondary,
    },
    error: {
      ...colors.error,
    },
  },
  typography: {
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.125rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "0.875rem",
    },
    body2: {
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "4px",
          padding: "8px 12px",
          fontSize: "0.875rem",
          lineHeight: "100%",
          fontWeight: 600,
        },
        containedPrimary: {
          background: colors.primary.main,

          "&:hover": {
            background: colors.primary[700],
          },

          "&:active": {
            background: colors.primary[750],
            outline: `4px solid rgba(15, 111, 201, 0.3)`,
          },

          "&.Mui-disabled": {
            background: colors.secondary.surface,
            color: colors.secondary.light,
          },
        },
        containedSecondary: {
          background: colors.primary.surface,
          color: colors.primary.main,

          "&:hover": {
            background: colors.primary.surfaceHover,
            color: colors.primary.textHover,
          },

          "&:active": {
            background: colors.primary.surface,
            color: colors.primary.textHover,
            outline: `4px solid rgba(15, 111, 201, 0.3)`,
          },

          "&.Mui-disabled": {
            background: colors.secondary.surface,
            color: colors.secondary.light,
          },
        },
        outlined: {
          background: "white",
          border: `1px solid ${colors.secondary.borders}`,
          color: colors.secondary.main,

          "&:hover": {
            background: colors.secondary.surfaceHover,
            border: `1px solid ${colors.secondary.borders}`,
            color: colors.secondary.main,
          },

          "&:active": {
            background: "white",
            border: `1px solid ${colors.secondary.borders}`,
            color: colors.secondary.main,
            outline: `4px solid rgba(15, 111, 201, 0.3)`,
          },

          "&.Mui-disabled": {
            background: colors.secondary.surface,
            color: colors.secondary.light,
          },
        },
      },
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
        variant: "contained",
        disableFocusRipple: true,
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: colors.secondary.text,
          border: `1px solid ${colors.secondary.borders}`,
          borderRadius: "4px",
          padding: "7px",

          "& .MuiSvgIcon-root": {
            fontSize: "1rem",
          },
        },
      },
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: colors.secondary.borders,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          transform: "unset",
          position: "unset",
          fontSize: "0.75rem",
          fontWeight: 700,
          color: colors.secondary.text,

          "&.Mui-focused": {
            color: colors.secondary.shapeActive,
          },
          "&.Mui-error": {
            color: colors.secondary.text,
          },
          "&.Mui-disabled": {
            color: colors.secondary.shapeActive,
          },
        },
        asterisk: {
          color: colors.secondary.shapeHover,
          "&.Mui-error": {
            color: colors.secondary.text,
          },
          "&.Mui-disabled": {
            color: colors.secondary.text,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInput-root": {
            background: "white",
            marginTop: "4px",
            padding: "10px 16px",

            "&.MuiInputBase-sizeSmall": {
              padding: "6px 12px",
            },

            "&.MuiInputBase-adornedStart": {
              paddingLeft: "12px",
            },

            "&:before, &:after": {
              border: `1px solid ${colors.secondary.borders}`,
              top: 0,
              borderRadius: "4px",
              transform: "unset",
            },

            "&:after": {
              border: `2px solid ${colors.primary.main}`,
              opacity: 0,
              transition: "opacity 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
            },

            "&:hover": {
              "&:not(.Mui-disabled):before": {
                border: `1px solid ${colors.secondary.borders}`,
              },

              "&.Mui-error:before": {
                border: `1px solid ${colors.error.borders}`,
              },
            },

            "&.Mui-focused:after": {
              opacity: 1,
            },

            "&.Mui-error": {
              "&:before": {
                border: `1px solid ${colors.error.borders}`,
              },
              "&:after": {
                border: `2px solid ${colors.error.borders}`,
              },
            },

            "&.Mui-disabled": {
              background: colors.secondary.surfaceHover,
              "&:before": {
                border: `1px solid ${colors.secondary.surfaceHover}`,
              },
              "&:after": {
                border: `2px solid ${colors.secondary.surfaceHover}`,
              },
            },

            "& .MuiInput-input": {
              color: colors.secondary.text,
              padding: 0,

              "&::placeholder": {
                color: colors.secondary.bordersHover,
                opacity: 1,
              },
              "&.Mui-disabled": {
                color: colors.secondary.text,
              },
            },
          },
          "& .MuiFormHelperText-root": {
            fontSize: "12px",
            color: colors.secondary.text,

            "&.Mui-error": {
              color: colors.error.text,
            },

            "&.Mui-disabled": {
              color: colors.secondary.text,
            },
          },
          "& .MuiInputAdornment-root": {
            "& .MuiSvgIcon-root": {
              fontSize: "1rem",
            },
          },
        },
      },
      defaultProps: {
        variant: "standard",
        InputLabelProps: {
          shrink: true,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          background: colors.primary.surface,
          border: `1px solid ${colors.primary.surfaceHover}`,
          color: colors.primary.main,
          fontWeight: 700,

          "&:hover": {
            color: colors.primary[300],
          },

          "& .MuiChip-icon": {
            fontSize: "20px",
            marginLeft: "8px",
          },

          "& .MuiChip-deleteIcon": {
            fontSize: "14px",
            color: colors.secondary.textActive,
            borderLeft: `1px solid ${colors.primary.surfaceHover}`,
            margin: 0,
            paddingLeft: "5px",
            paddingRight: "8px",

            "&:hover": {
              color: colors.secondary.textHover,
            },
          },
        },
      },
      defaultProps: {
        variant: "outlined",
        deleteIcon: <ClearIcon />,
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "& .MuiListItemIcon-root": {
            color: colors.secondary.bordersHover,
          },

          "& .MuiListItemText-root .MuiTypography-root": {
            color: colors.secondary.text,
          },

          "&:hover": {
            backgroundColor: colors.primary.surfaceHover,

            "& .MuiListItemIcon-root": {
              color: colors.primary.bordersHover,
            },

            "& .MuiListItemText-root .MuiTypography-root": {
              color: colors.primary.shapeActive,
            },
          },

          "&.Mui-selected, .Mui-selected.Mui-focusVisible": {
            backgroundColor: colors.primary[50],

            "&:hover": {
              background: colors.primary[50],
            },

            "& .MuiListItemIcon-root": {
              color: colors.primary.bordersHover,
            },

            "& .MuiListItemText-root .MuiTypography-root": {
              fontWeight: 600,
              color: colors.primary.main,
            },
          },
        },
      },
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          lineHeight: "32px",
          textTransform: "uppercase",
          fontWeight: 400,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          outline: "none",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 700,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        thumb: {
          height: 24,
          width: 24,
          backgroundColor: "#fff",
          border: "2px solid currentColor",
          "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
            boxShadow: "inherit",
          },
          "&:before": {
            display: "none",
          },
        },
        valueLabel: {
          backgroundColor: "transparent",
          color: colors.secondary.text,
          fontWeight: 400,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "0.875rem",
          color: colors.secondary.text,
          fontWeight: 400,

          "&.Mui-selected": {
            fontWeight: 600,
            color: colors.secondary.text,
          },
        },
      },
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          border: `1px solid #CCCCCC`,
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          "& .MuiTableBody-root .MuiTableRow-root:hover": {
            background: "#F2F2F4",
          },
          "& .MuiTableCell-root": {
            padding: "16px",
          },
          "& .MuiTableCell-head": {
            borderBottom: `1px solid #CCCCCC`,
            fontWeight: 400,
            color: "#242426",
          },
          "& .MuiTableCell-body": {
            borderBottom: `1px solid #F0F0F0`,
            color: "#545456",
          },
          "& .MuiTablePagination-root:last-child": {
            padding: "0 16px",

            "& .MuiTablePagination-actions .MuiButtonBase-root:first-of-type": {
              marginRight: "8px",
            },
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: "white",
          color: colors.secondary.text,
          border: `1px solid ${colors.secondary.borders}`,
          fontWeight: 300,
          fontSize: "0.9rem",
          lineHeight: "1.2rem",
          boxShadow: "0px 0px 12px -4px rgba(0,0,0,0.75)",
        },
      },
    },
  },
});
