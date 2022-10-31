import {
    Tab, Fab, Tabs, Box, AppBar, Grid, Container, Typography, Stack,
    Paper, Modal, FormControl, form, OutlinedInput, Input, InputLabel,
    FormGroup, Button, IconButton, Divider
} from '@mui/material'
import { getInstructors } from '../../actions/instructor';
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PropTypes from 'prop-types';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
const InstructorTabPanel = (props) => {
    const instructors = useSelector((i) => i.instructors);
    console.log(instructors)
    console.log(" tab panel")
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInstructors());
    }, [])  

    return (
        <TabPanel value={props.value} index={props.index}>
            <Grid container>
                {instructors.map((instructor, index) => {
                    return (
                        <Grid container key={index} sx={{ backgroundColor: 'lavender', padding: '15px' }}>
                            <Grid item xs={1}>
                                <AccountCircleIcon />
                            </Grid>
                            <Grid item xs={4}>
                                <Typography sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{instructor?.userName}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography sx={{ fontWeight: 'bold' }}>{instructor?.email}</Typography>
                            </Grid>
                            <Divider></Divider>
                        </Grid>
                    )
                })}
                <Grid item xs={10}>
                </Grid>
                <Grid item xs={2} mt={4}>
                    <Fab color="secondary" aria-label="add" onClick={props.modalOpen}>
                        <PersonAddIcon />
                    </Fab>
                </Grid>
            </Grid>
        </TabPanel>
    )
}

export default InstructorTabPanel