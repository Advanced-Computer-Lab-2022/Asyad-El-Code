import React, { useState } from 'react';
import { Container, Grid, Typography,Modal } from "@mui/material";


export default function FirstTimeInstructor({ instructorModal, handleClose }) {

    return (
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={instructorModal}
            onClose={handleClose}
        >
            {/* <div className={classes.paper}>
                <h2 id="simple-modal-title">Registration Form</h2>
                <p id="simple-modal-description">
                    Please enter your first name, last name, new password, and confirm password.
                </p>
                <form noValidate>
                    <FormControl>
                        <TextField
                            label="First Name"
                            id="first-name"
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            label="Last Name"
                            id="last-name"
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            label="New Password"
                            id="new-password"
                            type="password"
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            label="Confirm Password"
                            id="confirm-password"
                            type="password"
                            variant="outlined"
                            fullWidth
                        />
                    </FormControl>
                </form>
                <Button variant="contained" color="primary" >
                    Submit
                </Button>
            </div> */}
            <Grid container maxWidth={400}>
                <Grid
                    item
                    container
                    sx={{
                        backgroundColor: "#1C1D1F",
                        //cut the right bottom border with an angle 45
                        clipPath: "polygon(0 0, 100% 0, 90% 100%, 0 100%)",

                        //cut the left bottom border

                        height: "100%",
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
                    </Grid>
                </Grid>
            </Grid>
        </Modal>
    );
}
