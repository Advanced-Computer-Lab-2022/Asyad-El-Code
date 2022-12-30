import {
  Chip,
  Divider,
  Grid,
  Paper,
  Button,
  Typography,
  Card,
  Stack,
  Rating,
} from "@mui/material";
import React from "react";
import image from "../../images/coding.jpeg";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
export const UdacityCard = () => {
  return (
    <Card style={{ width: "600px", height: "500px" }}>
      <Grid
        padding={5}
        height="100%"
        width="100%"
        style={{ backgroundColor: "wheat" }}
        container
        direction="row"
      >
        <Grid xs={4} item container direction="column">
          <Grid item>
            <img
              style={{
                height: "100%",
                width: "90%",
                objectFit: "cover",
                //I want you to cut frrom the top right using ellipse and clippath
                //   clipPath: "ellipse(150% 80% at 0% 90%)",
                clipPath: "circle(100% at 100% 90%)",
              }}
              src={image}
            ></img>
          </Grid>
          <Grid xs={1} item container>
            <Button
              size="medium"
              variant="contained"
              style={{ backgroundColor: "blue", textTransform: "none" }}
            >
              Program Details
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};
