import {
  IconButton,
  InputAdornment,
  TextField,
  Grid,
  createMuiTheme,
  createTheme,
} from "@mui/material";
import React from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Input = ({
  autoFocus,
  type,
  handleChangeValues,
  name,
  label,
  handleShowPassword,
  value,
  error,
}) => {
  return (
    <Grid item xs={12}>
      <TextField
        name={name}
        onChange={handleChangeValues}
        fullWidth
        size="medium"
        label={label}
        autoFocus={autoFocus}
        color="primary"
        type={type}
        value={value}
        error={error}
        helperText={error ? "This field is required" : ""}
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};
export default Input;
