import React from "react";
import { Grid, Typography } from "@mui/material";
import { ResetPassword } from "./ResetPassword";
export const ConfirmPassword = () => {
  return (
    <>
      <body style={{ backgroundColor: "white" }}>
        <Grid container margin={-3} sx={{ height: "830px" }}>
          <Grid
            item
            container
            sx={{
              backgroundColor: "#1C1D1F",
              //cut the right bottom border with an angle 45
              clipPath: "polygon(0 0, 100% 0, 90% 100%, 0 100%)",

              //cut the left bottom border

              height: "800px",
            }}
            justifyContent="center"
            alignItems="center"
            xs={6}
          >
            <div
              style={{
                //Create a border that wraps the whole grid item with border size small
                border: "solid 1px",
                borderColor: "#C62828",
                borderRadius: 2,
                padding: 30,
              }}
            >
              <Grid item>
                <Typography
                  color="white"
                  variant="h2"
                  fontSize={93}
                  fontWeight="bold"
                >
                  Start <br /> learning
                </Typography>
                <Typography color="white" variant="h2" fontWeight="1000">
                  with aSyad
                </Typography>
              </Grid>
            </div>
          </Grid>
          <Grid marginTop={13} justifyContent="center" xs={6} item container>
            <Grid item>
              <ResetPassword></ResetPassword>
            </Grid>
          </Grid>
        </Grid>
      </body>
    </>
  );
};
