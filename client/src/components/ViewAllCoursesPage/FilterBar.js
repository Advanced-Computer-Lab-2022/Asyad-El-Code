import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import {
  Button,
  Container,
  createTheme,
  Grid,
  Typography,
} from "@mui/material";
import { maxWidth, ThemeProvider } from "@mui/system";
import React from "react";
const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#0971f1",
      darker: "#053e85",
    },
    neutral: {
      main: "#d3302f",
      contrastText: "#fff",
    },
  },
});
export const FilterBar = () => {
  return (
    <Container sx={{ backgroundColor: "#00262B" }} maxWidth="xl">
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
          <Typography variant="h4" color="white">
            Filter By:
          </Typography>
        </Grid>
        <Grid container marginLeft="40px" spacing={2} marginBottom="20px">
          <ThemeProvider theme={theme}>
            <Grid item>
              <Button
                endIcon={<KeyboardArrowDown />}
                variant="contained"
                color="neutral"
              >
                Subject
              </Button>
            </Grid>
            <Grid item>
              <Button
                endIcon={<KeyboardArrowDown />}
                variant="contained"
                color="neutral"
              >
                Rating
              </Button>
            </Grid>
            <Grid item>
              <Button
                endIcon={<KeyboardArrowDown />}
                variant="contained"
                color="neutral"
              >
                Subject
              </Button>
            </Grid>
            <Grid item>
              <Button
                endIcon={<KeyboardArrowDown />}
                variant="contained"
                color="neutral"
              >
                Price
              </Button>
            </Grid>
          </ThemeProvider>
        </Grid>
      </Grid>
    </Container>
  );
};
