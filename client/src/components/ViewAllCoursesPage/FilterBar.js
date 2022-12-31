import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import {
  Box,
  Button,
  Container,
  createTheme,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Rating,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { maxWidth } from "@mui/system";
import React, { useEffect, useState } from "react";
import CheckboxesTags from "./CheckBox";
import PriceSlider from "./PriceSlider";
import RatingSlider from "./RatingSlider";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const initialFilterData = {
  Subject: [
    "Computer Science",
    "Business",
    "Management",
    "Medicine",
    "Pharmacy",
  ],
  Price: [0, 10000],
  Rating: [0, 5],
};

export const FilterBar = ({ handleClick }) => {
  const [filterData, setFilterData] = useState(initialFilterData);
  const dispatch = useDispatch();
  const courses = useSelector((c) => c.courses);
  const [rating, setRating] = useState(0);
  const handlePriceChange = (e, newValue) => {
    setFilterData({ ...filterData, Price: newValue });
  };
  const handleRatingChange = (e) => {
    setRating(e.target.value);
    setFilterData({ ...filterData, Rating: [e.target.value, 5] });
  };
  const handleChange = (e, newValue) => {
    if (newValue.length === 0) {
      newValue = [
        "Computer Science",
        "Business",
        "Management",
        "Medicine",
        "Pharmacy",
      ];
    }

    setFilterData({ ...filterData, Subject: newValue });
  };

  // useEffect(() => {}, [courses]);

  return (
    <Container
      sx={{ backgroundColor: "#FFFFFF", height: "130px", maxHeight: "130px" }}
    >
      <Box marginBottom={2}>
        <Stack direction="row" spacing={4} alignItems="center">
          <Typography fontSize={15} fontWeight="bold" color="black">
            Filter By:
          </Typography>
          <Button>Search</Button>
        </Stack>
      </Box>

      <Divider />
      <Box margin={2}>
        <Grid container>
          <Grid item xs={3}>
            <CheckboxesTags
              subjectOptions={[
                "Computer Science",
                "Business",
                "Management",
                "Medicine",
                "Pharmacy",
              ]}
              name={"Subject"}
              handleChange={handleChange}
              filterData={filterData}
            ></CheckboxesTags>
          </Grid>
          <Grid item xs={5}>
            <Stack direction="row" spacing={4} alignItems="center">
              <Divider orientation="vertical" flexItem />

              <Stack direction="row" spacing={3}>
                {/* <Typography variant="p">Rating</Typography>
                <RatingSlider form={handleRatingChange}></RatingSlider> */}

                <Rating
                  value={rating}
                  onChange={handleRatingChange}
                  sx={{ color: "black" }}
                ></Rating>
              </Stack>
              <Divider orientation="vertical" flexItem />
              <Stack direction="row" spacing={3}>
                <Typography variant="p">Price</Typography>
                <PriceSlider form={handlePriceChange}></PriceSlider>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={4}>
            <Stack direction="row-reverse" spacing={2} alignItems="center">
              <Button
                startIcon={<ClearAllIcon />}
                size="small"
                style={{ color: "#205294" }}
              >
                Clear all
              </Button>
              <Button
                startIcon={<FilterAltIcon />}
                size="small"
                style={{ color: "#205294" }}
                onClick={(e) => handleClick(e, filterData)}
              >
                Filter
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
