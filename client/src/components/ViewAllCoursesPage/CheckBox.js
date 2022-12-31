import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useSelector } from "react-redux";
import { Chip, Paper } from "@mui/material";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags({
  subjectOptions,
  name,
  handleChange,
  filterData,
}) {
  return (
    <div style={{ position: "relative" }}>
      <Autocomplete
        size="small"
        multiple
        onChange={handleChange}
        id="checkboxes-tags-demo"
        options={subjectOptions}
        disableCloseOnSelect
        color="white"
        getOptionLabel={(option) => option}
        name={name}
        renderOption={(props, option, { selected }) => (
          <li {...props} style={{ fontSize: "12px" }}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 2 }}
              checked={selected}
              name={name}
              size="small"
            />
            {option}
          </li>
        )}
        style={{ minWidth: 150, maxWidth: 180 }}
        chip={true}
        renderChip={(chipProps, { selected }) => (
          <Chip
            label={chipProps.label}
            style={{ margin: "8px 8px 0 0" }}
            size="small"
            variant="outlined"
          />
        )}
        renderInput={(params) => (
          <TextField {...params} label={name} placeholder={name} name={name} />
        )}
        ListboxProps={{
          style: { width: "auto", maxHeight: "200px", overflow: "auto" },
        }}
      />
    </div>
  );
}
