import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  Button,
  Container,
  createTheme,
  Grid,
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
  Price: [0, 100],
  Rating: [0, 5],
};

export const FilterBar = ({ handleClick }) => {
  const [filterData, setFilterData] = useState(initialFilterData);
  const dispatch = useDispatch();
  const courses = useSelector((c) => c.courses);

  const handlePriceChange = (e, newValue) => {
    setFilterData({ ...filterData, Price: newValue });
  };
  const handleRatingChange = (e, newValue) => {
    setFilterData({ ...filterData, Rating: newValue });
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
    <Container sx={{ backgroundColor: "#F2F0EF" }} maxWidth="xl">
      <Grid
        container
        columnSpacing={1}
        rowSpacing={0}
        justifyContent={"normal"}
      >
        <Grid
          item
          xs={12}
          marginLeft="10px"
          marginTop="20px"
          marginBottom="10px"
        >
          <Typography variant="h4" color="black">
            Filter By:
          </Typography>
        </Grid>
        <Grid container marginLeft="40px" spacing={2} marginBottom="20px">
          <Grid item xs={3}>
            <CheckboxesTags
              testawyy={[
                "Computer Science",
                "Business",
                "Management",
                "Medicine",
                "Pharmacy",
              ]}
              name={"Subject"}
              handleChange={handleChange}
            ></CheckboxesTags>
          </Grid>

          <Grid item xs={2}>
            <Typography variant="p">Price</Typography>
            <PriceSlider form={handlePriceChange}></PriceSlider>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="p">Rating</Typography>
            <RatingSlider form={handleRatingChange}></RatingSlider>
          </Grid>
          <Grid item xs={2}>
            <Button
              startIcon={<FilterAltIcon></FilterAltIcon>}
              size="large"
              onClick={(e) => handleClick(e, filterData)}
            >
              Filter
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
