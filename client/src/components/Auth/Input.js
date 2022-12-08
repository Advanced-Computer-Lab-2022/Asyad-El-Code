import { IconButton, InputAdornment, TextField, Grid } from "@mui/material";
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
}) => {
  return (
    <Grid item xs={12}>
      <TextField
        name={name}
        onChange={handleChangeValues}
        fullWidth
        required
        size="medium"
        label={label}
        autoFocus={autoFocus}
        type={type}
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
