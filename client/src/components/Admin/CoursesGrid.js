import React, { useEffect, useState } from "react";
import { Grid, CircularProgress, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { UdacityCard } from "../ViewAllCoursesPage/AllCourses/UdacityCard/UdacityCard.js";
import PostAddIcon from '@mui/icons-material/PostAdd';
import PromotionModal from "./PromotionModal.js";
export const CoursesGrid = () => {
    const { isLoading, courses } = useSelector((c) => c.courses);
    const [courseList, setCourseList] = useState([]);
    const [open, setOpen] = useState(false);

    const onClick = (e, course) => {
        // e.preventDefault();
        // search for course in courseList
        if (courseList.find((c) => c._id === course._id)) {
            // if found, remove it
            setCourseList(courseList.filter((c) => c._id !== course._id));
        } else {
            // if not found, add it
            setCourseList([...courseList, course]);
        }
    };

    return isLoading ? (
        <CircularProgress></CircularProgress>
    ) : (
         <>
            <Grid container mt={2} justifyContent="center">
                <Grid item md={9} mt={2} mb={2}>
                    </Grid>
                <Grid item mb={3}>
                    <Button
                        variant="contained"
                        
                        onClick={() => {
                            setOpen(true);
                        }}
                        startIcon={<PostAddIcon />}
                        style={{ float: "right"}}
                        disabled={courseList.length === 0}
                    >
                        Add Promotion
                    </Button>
                </Grid>
                {courses?.map((course, index) => {
                    return (
                        <Grid item md={6} mt={2} mb={2} xs={12}>
                            <UdacityCard course={course} type="admin" courseList={courseList} handleSelect={onClick} />
                        </Grid>
                    );
                })}
            </Grid>
            <PromotionModal open={open} setOpen={setOpen} courseList={courseList} setCourseList={setCourseList} />
            </>
    );
};


{/* <Card
ref={cardRef}
elevation={0}
className={classes.cardGrid}
key={index}>
<CardMedia
    component="img"
    image={image}
    className={classes.cardMedia}
></CardMedia>
<CardContent>
    <Typography
        className={classes.cardHeader}
        gutterBottom
        variant="h6"
        component="div"
    >
        {course?.title}
    </Typography>
    <Typography variant="body2" color="text.secondary">
        {course?.title}
    </Typography>
    <Stack spacing={1} direction="row">
        <p>{course.rating}</p>
        <Rating
            readOnly
            value={course.rating}
            precision={0.1}
            sx={{ alignItems: "center" }}
        >
        </Rating>
    </Stack>
    {course?.price !== course?.discountedPrice && (
        <Typography>
            <span
                style={{
                    color: "grey",
                    textDecoration: "line-through",
                }}
            >
                {getRate(selectedCountry, course?.price, rates)}
            </span>
            <span style={{ color: "red" }}>
                {" "}
                Valid Until {course?.promotion?.endDate.substring(0, 10)}
            </span>
        </Typography>
    )}
    <Typography variant="body1" fontWeight="bold">
        {getRate(selectedCountry, course?.discountedPrice, rates)}
    </Typography>
</CardContent>
<CardActions>
    {courseList.find((c) => c._id === course?._id) ? (
        <Button
            variant="outlined"
            color="success"
            size="small"
            startIcon={<CheckBoxIcon />}
            onClick={(e) => onClick(e, course)}
        >
            Unselect Course
        </Button>) :
        (<Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<CheckBoxOutlineBlankIcon />}
            onClick={(e) => onClick(e, course)}
        >
            Select Course
        </Button>)
    }
</CardActions>
</Card> */}