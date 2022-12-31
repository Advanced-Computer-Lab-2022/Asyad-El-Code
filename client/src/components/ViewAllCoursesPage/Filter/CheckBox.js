import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useSelector } from "react-redux";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags({ testawyy, name, handleChange }) {
  return (
    <Autocomplete
      multiple
      onChange={handleChange}
      id="checkboxes-tags-demo"
      options={testawyy}
      disableCloseOnSelect
      color="white"
      getOptionLabel={(option) => option}
      name={name}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
            name={name}
          />
          {option}
        </li>
      )}
      style={{ width: 250 }}
      renderInput={(params) => (
        <TextField {...params} label={name} placeholder={name} name={name} />
      )}
    />
  );
}
