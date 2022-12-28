import { Grid, Typography, Button, Card, CardContent, CardActions, Chip, TextField } from '@mui/material'
import React from 'react';
import SplitButton from '../Admin/SplitButton';


const ResolvedProblems = (props) => {
    const [reportedProblems, setReportedProblems] = React.useState(props.resolvedProblems);
    console.log(reportedProblems);


    const onChange = (e) => {
        setReportedProblems(reportedProblems.map((problem) => {
            if (problem._id === e.target.id) {
                problem.response = e.target.value;
            }
            return problem;
        }));
        console.log(e.target.value);
        console.log(reportedProblems);
    }




    return (
        <Grid
            container
            direction="column"
            alignContent="center"
            color="#1C1D1F"
            minheight={700}

        >
            <Grid item borderBottom={1} borderColor="silver" width="100%" padding={3} bgcolor="#1C1D1F"
                color="white">
                <Typography fontWeight="bold" fontSize={35} textAlign="center">
                    Resolved Problems
                </Typography>
                <Typography fontSize={20} textAlign="center">
                    View your resolved problems
                </Typography>
            </Grid>
            <Grid item borderColor="silver" width="100%" padding={3} >
                {reportedProblems?.length === 0 ?
                    <Typography fontSize={20} textAlign="center" marginTop={5}>
                        No Resolved problems to show
                    </Typography> :
                    <Grid container spacing={5} padding={1} marginTop={1} marginBottom={4} paddingBottom={1} direction="row" justifyContent="center" alignItems="center" >
                        {reportedProblems?.map((problem) => (
                            <>
                                <Grid item xs={10} key={problem._id}>
                                    <Card sx={{ minWidth: 500, backgroundColor: "#EEEEEE" }}>
                                        <CardContent>
                                            <Typography variant="h6" component="div">
                                                {problem?.courseName}
                                            </Typography>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                {problem?.date?.substring(0, 10) + ",     " + problem?.date?.substring(11, 16) + " GMT    "}
                                                <Chip label={problem?.type} />
                                            </Typography>
                                            <Typography variant="body2">
                                                <span style={{ fontWeight: 'bold' }}>Details: </span> {problem?.details}
                                            </Typography>
                                            <Typography variant="body2">
                                                <span style={{ fontWeight: 'bold' }}>Response: </span> {problem?.response}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </>
                        ))}
                    </Grid>
                }
            </Grid>
        </Grid>


    )
}

export default ResolvedProblems;