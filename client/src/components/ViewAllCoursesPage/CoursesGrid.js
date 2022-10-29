import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Rating,
  Typography,
  Grid,
} from "@mui/material";
import { Container, Stack } from "@mui/system";
import useStyles from "../../css/slider.js";
import course from "../../images/course.jpeg";

export const CoursesGrid = () => {
  const handleClick = () => {
    console.log("CLICKED");
  };
  const { classes } = useStyles();
  return (
    <Container maxWidth="md" sx={{ backgroundColor: "#F2F0EF" }}>
      <Grid container spacing={2} marginTop="20px" justifyContent={"center"}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
          return (
            <Grid item xs={4}>
              <Card
                onClick={handleClick}
                elevation={0}
                className={classes.cardGrid}
                key={index}
              >
                <CardMedia
                  component="img"
                  image={course}
                  className={classes.cardMedia}
                ></CardMedia>
                <CardContent>
                  <Typography
                    className={classes.cardHeader}
                    gutterBottom
                    variant="h6"
                    component="div"
                  >
                    Compelete tutorial by javaScript mastery toruel
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Roberto Joseph
                  </Typography>
                  <Stack spacing={1} direction="row">
                    <p>4.5</p>
                    <Rating readOnly sx={{ alignItems: "center" }}>
                      jgdsjdjhs
                    </Rating>
                    <p style={{ alignSelf: "center" }}>n5332</p>
                  </Stack>
                  <Typography variant="body1" fontWeight="bold">
                    $70203
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button>Hello world</Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
