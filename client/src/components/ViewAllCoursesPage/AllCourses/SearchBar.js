import styled from "@emotion/styled";
import { alpha, InputBase, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
export const SearchBar = ({ courses }) => {
  const [search, setSearch] = useState("");

  // When the user types in the search bar, the courses are filtered
  // based on the search term
  const filteredCourses = courses.filter((course) => {
    return course.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <TextField
      onChange={(e) => setSearch(e.target.value)}
      variant="outlined"
      size="small"
      label="search cours"
    ></TextField>
  );
};
