import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, CardActionArea, Grid, Stack } from "@mui/material";
import image from "../../../images/img1.jpeg";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function ReviewCard() {
  return (
    <Card elevation={4} sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography letterSpacing={1} padding={3} fontSize={19}>
          She was bouncing away, when a cry from the two women, who had turned
          towards the bed, caused her to look round.
          <br />
        </Typography>
      </CardContent>
      <CardActions style={{ marginTop: 0, margin: 0 }}>
        <Stack spacing={5} direction="row">
          <Avatar
            style={{ marginLeft: 35, marginRight: -20, marginBottom: 30 }}
            src={image}
          ></Avatar>
          <Typography
            fontWeight="500"
            variant="body2"
            style={{ color: "#205295" }}
            fontSize={18}
          >
            Angel Mark
            <br />
            <Typography color="text.secondary" variant="body2">
              Instructor
            </Typography>
          </Typography>
        </Stack>
      </CardActions>
    </Card>
  );
}
