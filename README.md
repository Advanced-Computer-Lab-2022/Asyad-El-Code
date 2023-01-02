

# [Asyad El Code](https://gucair.netlify.app/)
<img width="1440" alt="Screenshot 2023-01-01 at 12 48 17 PM" src="https://user-images.githubusercontent.com/67745591/210168622-ba7c70c8-aedd-4b7a-a533-d3a1dec6b7a4.png">



## Table of Contents
- [Project Description](#project-description)
- [Tools and Frameworks](#tools-and-frameworks)
- [Features](#features)
  * [Admin Functionalities](#administrator)
  * [Trainee/Instructor Functionalities](#user)
- [API References](#api-references)
  * [Admin Router](#admin-router)
  * [Trainee/Instructor Router](#user-router)



## Project Description

### Course 
Advanced Computer Lab (CSEN 704/ DMET 706), Winter 2022

### Theme
Our project is an online learning platform that allows both individual and corporate trainees to enroll in a variety of courses and track their progress as they work towards earning a certificate of completion. The platform features a range of courses taught by experienced instructors who have created engaging lectures and quizzes to help students master the material. In addition to providing a convenient and flexible way for learners to gain new skills and knowledge, the platform also offers tools for instructors to manage their courses and for admins to track and address any issues that may arise, such as requests for refunds or reports of problems. Whether you're looking to advance your career, learn a new hobby, or simply expand your horizons, our platform is a great resource for anyone looking to learn and grow.

### Overview 
Our project was developed using the Agile Methodology, which involves breaking the project into shorter time periods called "Sprints." Each Sprint has a specific set of goals, and at the end of each Sprint, a fully functional version of the project is delivered and evaluated based on the specified system requirements. This approach allows for a more flexible and responsive development process, as it allows for ongoing adjustments and improvements to be made based on feedback and changing needs.

### Objectives
- Gain an understanding of how to effectively utilize the Agile Methodology for project planning and software development
- Learn the process of following a given set of System Requirements to develop a
software.
- Learn to research and master the use of the MERN Stack.
- Learn how to work together as a team on GitHub.


## Tools and Frameworks
![Features-of-Mern-stack-development-services-You-Should-Know](https://user-images.githubusercontent.com/67745591/210168593-cf028e59-623e-418e-8dfb-3e2ac711ba2e.png)

### What is the MERN Stack?
MERN stands for MongoDB, Express, React, Node, after the four key technologies that make up the stack.

- MongoDB - document database
- Express(.js) - Node.js web framework
- React(.js) - a client-side JavaScript framework
- Node(.js) - the premier JavaScript web server

Express and Node make up the middle (application) tier. Express.js is a server-side web framework, and Node.js the popular and powerful JavaScript server platform. Regardless of which variant you choose, ME(RVA)N is the ideal approach to working with JavaScript and JSON, all the way through.

### How does the MERN stack work?
The MERN architecture allows you to easily construct a 3-tier architecture (frontend, backend, database) entirely using JavaScript and JSON.

![MERN_ARCH](https://webimages.mongodb.com/_com_assets/cms/mern-stack-b9q1kbudz0.png?auto=format%2Ccompress)

#### - React.js Front End
The top tier of the MERN stack is React.js, the declarative JavaScript framework for creating dynamic client-side applications in HTML. React lets you build up complex interfaces through simple Components, connect them to data on your backend server, and render them as HTML.

React’s strong suit is handling stateful, data-driven interfaces with minimal code and minimal pain, and it has all the bells and whistles you’d expect from a modern web framework: great support for forms, error handling, events, lists, and more.

#### - Express.js and Node.js Server Tier
The next level down is the Express.js server-side framework, running inside a Node.js server. Express.js bills itself as a “fast, unopinionated, minimalist web framework for Node.js,” and that is indeed exactly what it is. Express.js has powerful models for URL routing (matching an incoming URL with a server function), and handling HTTP requests and responses.

By making XML HTTP Requests (XHRs) or GETs or POSTs from your React.js front-end, you can connect to Express.js functions that power your application. Those functions in turn use MongoDB’s Node.js drivers, either via callbacks for using Promises, to access and update data in your MongoDB database.

#### - MongoDB Database Tier
If your application stores any data (user profiles, content, comments, uploads, events, etc.), then you’re going to want a database that’s just as easy to work with as React, Express, and Node.

That’s where MongoDB comes in: JSON documents created in your React.js front end can be sent to the Express.js server, where they can be processed and (assuming they’re valid) stored directly in MongoDB for later retrieval. Again, if you’re building in the cloud, you’ll want to look at Atlas. If you’re looking to set up your own MERN stack, read on!


## Features 

We have three main users in our website:

### Individual Trainee 

- Sign up and enter their details in a form including first name, last name, email, password and gender.
<img width="1438" alt="Screenshot 2023-01-01 at 5 08 57 PM" src="https://user-images.githubusercontent.com/67745591/210189926-bb31cefb-613f-4544-8132-9af0fbdf9351.png">


- Sign in using his email and password.
<img width="1440" alt="Screenshot 2023-01-02 at 3 39 15 AM" src="https://user-images.githubusercontent.com/67745591/210189949-7c9be920-2fd1-4ce2-8e66-0f18efff523e.png">


- Send email in case of forgetting password.
<img width="1439" alt="Screenshot 2023-01-02 at 3 41 42 AM" src="https://user-images.githubusercontent.com/67745591/210190007-f73f8a83-f6d6-42c7-8976-12f1b423c7ad.png">


- Change password
<img width="1440" alt="Screenshot 2023-01-02 at 3 42 41 AM" src="https://user-images.githubusercontent.com/67745591/210190061-e793165b-7f9e-4ea3-930f-90c43914c4cc.png">


- View your profile
<img width="1440" alt="Screenshot 2023-01-02 at 3 43 24 AM" src="https://user-images.githubusercontent.com/67745591/210190086-ac556786-61bf-4ece-acdf-ad01bd9db408.png">


### Admin
- Admin View Promotions
![iamge2](https://user-images.githubusercontent.com/67745591/210193663-77a8e865-465d-40af-89ea-65d516791c6e.png)

- Refund Request 
![iamge2](https://user-images.githubusercontent.com/67745591/210193639-47643945-aeba-4a55-a5a1-94cab8eefb6c.png)



### Instructor
- Instructor create course
![oo](https://user-images.githubusercontent.com/67745591/210193775-f6d47f0b-11f9-47f4-92dc-d0c537d81690.jpg)

- Steps for creating course
![o1](https://user-images.githubusercontent.com/67745591/210193866-25db0c40-36cd-4bff-813d-5393b65c7e1a.jpg)

- Adding Lecture 
![firstle](https://user-images.githubusercontent.com/67745591/210193947-fe9f1fcd-514e-423a-9099-5d226f01d762.jpg)

- Preview Course Content 
![preview](https://user-images.githubusercontent.com/67745591/210193894-3ba55683-c4a7-44ea-ab28-c7fbb0bdfccd.jpg)



### Configuration and Setup

In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.
 * Open the project in your prefered code editor.
 * Go to terminal -> New terminal (If you are using VS code)
 * Split your terminal into two (run the client on one terminal and the server on the other terminal) 

In the first terminal
 * cd server and create a .env file in the root of your client directory.
 * Supply the following credentials

```javascript
PORT= 8000
CONNECTION_URL=mongodb+srv://username:password@cluster0.tmwp1g9.mongodb.net/?retryWrites=true&w=majority
```

In the second terminal
* cd client from the root of your project
* Supply the following credentials

```javascript
$ npm install
$ npm start
```

## Schema Design
---
- Course Schema
```javascript
import mongoose, { mongo } from "mongoose";
import Joi from "joi";

export const courseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0.0,
  },
  previewVideo: {
    type: String,
    required: true,
  },
  outlines: {
    type: [
      {
        outline: String,
        totalHours: Number,
        subtitles: [
          {
            subtitle: String,
            minutes: Number,
            videoUrl: String,
          },
        ],
        exercises: [
          {
            question: String,
            answers: [{ answer: String, correct: Boolean }],
          },
        ],
      },
    ],
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  instructor: {
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
    },
    name: String,
  },
  promotion: {
    discount: { type: Number, default: 0.0 },
    startDate: Date,
    endDate: Date,
  },
  // add instructor
  discount: [{ country: String, percent: Number }],
  ratings: [
    {
      corporateTraineeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CorporateTrainee",
      },
      individualTraineeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "IndividualTrainee",
      },
      rating: Number,
    },
  ],
  reviews: [
    {
      corporateTraineeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CorporateTrainee",
      },
      individualTraineeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "IndividualTrainee",
      },
      review: String,
    },
  ],
  numberOfTraineesEnrolled: { type: Number, default: 0 },
});

export function validateCourse(course) {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    summary: Joi.string().min(3).required(),
    subject: Joi.string().min(3).required(),
    duration: Joi.number().required(),
    releaseDate: Joi.date().required(),
    language: Joi.string().required(),
    image: Joi.string().required(),
    rating: Joi.number(),
    outlines: Joi.array().required(),
    previewVideo: Joi.string().required(),
    price: Joi.number().required(),
    discount: Joi.array(),
  });
  return schema.validate(course, { allowUnknown: true });
}

const Course = mongoose.model("Course", courseSchema);

export default Course;

```

- Instructor
```javascript
import mongoose from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";

const instructorSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minlength: 5,
    unique: true,
  },
  firstName: {
    type: String,
    minlength: 3,
  },
  lastName: {
    type: String,
    minlength: 3,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  wallet: {
    type: Number,
    default: 0,
  },

  country: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Prefer not to say"],
  },
  dateOfBirth: {
    type: Date,
  },
  phoneNumber: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
  },
  biography: {
    type: String,
    default: "No biography",
  },
  firstLogin: {
    type: Boolean,
    default: true,
  },
});

instructorSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { email: this.email, id: this._id, role: "instructor" },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );
  return token;
};

export function validateInstructor(user) {
  const schema = Joi.object({
    userName: Joi.string().min(5),
    password: Joi.string().required(),
    firstName: Joi.string().min(3),
    lastName: Joi.string().min(3),
    email: Joi.string().email().required(),
    phoneNumber: Joi.number().min(10),
    dateOfBirth: Joi.date(),
    gender: Joi.string(),
    country: Joi.string(),
    wallet: Joi.number(),
  });
  return schema.validate(user);
}

const Instructor = mongoose.model("Instructor", instructorSchema);
export default Instructor;

```

- IndividualTrainee/Coorporate Trainee
```javascript
import mongoose from "mongoose";

import Joi from "joi";
import "dotenv/config";
import jwt from "jsonwebtoken";

const individualTraineeSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
  },
  gender: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
    minLength: 3,
  },

  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  country: {
    type: String,
  },

  billingDetails: {
    masterCardNumber: String,
    expiryDate: Date,
    cvv: String,
    cardOwner: String,
  },

  dateOfBirth: {
    type: Date,
  },

  phoneNumber: {
    type: String,
  },

  university: {
    type: String,
  },

  address: {
    city: String,
    streetName: String,
    streetNumber: String,
  },
  courses: [
    {
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      title: {
        type: String,
        required: true,
      },
      summary: {
        type: String,
        required: true,
      },
      duration: {
        type: Number,
        required: true,
      },
      releaseDate: {
        type: Date,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        default: 0.0,
      },
      instructor: {
        instructorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Instructor",
        },
        name: String,
      },
      grades: [
        {
          score: Number,
          total: Number,
          exerciseId: mongoose.Schema.Types.ObjectId,
        },
      ],
      notes: [
        {
          subtitleId: mongoose.Schema.Types.ObjectId,
          note: [{ value: String, time: Number }],
        },
      ],
      seenContent: [
        { duration: Number, contentId: mongoose.Schema.Types.ObjectId },
      ],
    },
  ],
});

individualTraineeSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { email: this.email, id: this._id, role: "individualTrainee" },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );
  return token;
};

export function validate(individualTrainee) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.number().min(10),
    dateOfBirth: Joi.date().required(),
    password: Joi.string().required(),
    address: Joi.object(),
    country: Joi.string(),
    university: Joi.string(),
    billingDetails: Joi.object({
      masterCardNumber: Joi.string().required(),
      expiryDate: Joi.date().required(),
      cvv: Joi.string().required(),
    }),
  });
  return schema.validate(individualTrainee);
}

const IndividualTrainee = mongoose.model(
  "IndividualTrainee",
  individualTraineeSchema
);
export default IndividualTrainee;

```


## END POINTS
---

Our Api is divided into 6 parts

### Users Router 
#### Route : `/users`


#### Add User
- Route : `/signup`
- Request Type : `post`
- Request Body : 
 ```javascript
  {
  firstName: 'Roberto',
  lastName: 'Joseph',
  email: 'robertojoseph@gmail.com',
  password: 'pass12345',
  gender:"Male",
  
 }
 ```
 
- Response Body:
 ```javascript
  {
  result: {firstName:"Roberto", lastName:"Joseph",email:"robertojoseph@gmail.com",password:"hashedPassword",gender:"Male"}, 
  token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJz
  dWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  type:"individualTrainee"
  }
  ```
#### Login User
- Route: `/signin`
- Request Type: `post`
- Request Body :
 ```javascript
 {
 email: "robertojoseph@gmail.com",
 password:"pass123"
 }
```
- Response Body:
 ```javascript
 {
 result: {
 firstName:"Roberto",
 lastName:"Joseph",
 email:"robertojoseph@gmail.com",
 password:"hashedPassword",
 gender:"Male"
          },
 token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJz
  dWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
 type:"individualTrainee"
 }
 ```

#### Forgot Password
- Route: `/sendEmail`
- Request Type: `post`
- Request Body :
 ```javascript
 {
 email: "robertojoseph@gmail.com",

 }
```


### Trainee Router 
#### Route : `/individualTrainee`


#### PayCourse 
- Route: `/payCoyrse`
- Request Type: `post`
- Request Body: 
```javascript 
       {courses, instructorId:"232325455626177171", traineeId:"232325455626177171"}
```
- Respond Body: 
```javascript
  {url: "sessionURL"}
```

#### Enroll Course
- Route: `/enrollCourse`
- Request Type: `post`
- Request Body:
```javascript
{id:"63b19f456422dcc9bbca8c35", courseId:"63b19f456422dcc9bbca8c35"}
```

#### Add Grade
- Route: `/addGrade`
- Request Type: `post`
- Request Query:
```javascript
{individualTraineeId, courseId, outlineId, score"40", total:"30"}
```

#### Get Notes
- Route: `/getNotes`
- Request Type: `get`
- Request Query:
```javascript
{ userId, courseId, lectureId }
```


#### Create PDF
- Route: `/createPdf`
- Request Type: `post`
- Request Body: 
```javascript
{notes: "Array of notes"}
```

### Instructor Router 
#### Route : `/instructor`

#### Add Course
- Route: `/addNewCourse/:id`
- Request Type: `post`
- Request Param: `id`
- Request Body:
```javascript
  {
    title,
    summary,
    subject,
    duration,
    releaseDate,
    language,
    image,
    rating,
    previewVideo,
    outline: []
    excercises:[]
    price,
}
```

#### Filter by subject and price
- Route: `filterBySubjectAndPrice/:id`
- Request Type: `get`
- Request param:
```javascript
{ subject: "ComputerScience", minPriceL: 40, maxPrice: 80 }
```

#### Update Information
- Route :`/updateInformation/:id`
- Request Type: `post`
- Request param:
```javascript
{ firstName, lastName, country, phoneNumber, biography }
```


#### Get all instructor courses
- Route: `getAllInstructorCourses/:id`
- Request Type: `get`
- Request param:
```javascript
{id:"63b19f456422dcc9bbca8c35"}
```

#### Define Promotion
- Route: `/definePromotion`
- Request Type: `post`
- Request Body:
```javascript
 { courseId, discount, startDate: "Date Value" , endDate: "Date Value" }
```


### Course Router 
#### Route : `/course`

#### Get Course
- Route: `/getCourse`
- Request Type: `get`
- Request body: 
```javsscript
{courseId:"63b19f456422dcc9bbca8c35"}
```

#### Filter All Courses
- Route: `/filterAllCourses`
- Request Type: `get`
- Request Query:
```javascript
{ subject: "ComputerScience", price: 40, rating: 80 }
```

#### Add Rating 
- Route: `/addRating`
- Request Type: `post`
- Request Query:
```javascript
{courseId, corporateTraineeId, individualTraineeId, rating}
```

#### Request Refund
- Route: `/requestRefund`
- Request Type: `post`
- Request Query:
```javascript
 {
    course,
    type,
    individualTraineeId,
    coorporateTraineeId,
    firstName,
    lastName,
    email,
    refundReason,
    refundType,
  }
```


