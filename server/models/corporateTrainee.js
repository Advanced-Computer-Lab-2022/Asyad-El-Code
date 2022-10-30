import mongoose from "mongoose";

import Joi from "joi";


const corporateTraineeSchema = mongoose.Schema({
    firstName:{
        type: String,
        minLength: 3
    },

    lastName:{
        type: String,
        minLength: 3
    },

    password:{
        type: String,
        required: true
    },

    userName:{
        type:String,
        required:true
    },

    email:{
        type: String,
        required: true,
        unique: true,
    },

    country:{
        type: String,
    },

    
    // certificate:{
    //     type: String
    // },

    
    // problems:{
    //     type: String  //problem related to specific course 
    // },

    // grades:[{
    //     grade: Number  //excercises:
    // }],

    // percentageCompleted:{
    //     type: Number,
    //     default: 0
    // },

    dateOfBirth:{
        type: Date,
    },

    phoneNumber:{
        type: String,
    },

    address:{
        city: String,
        streetName: String,
        streetNumber: String
    },
    
    // COURSES WITH ACCESS TO
    
    // accessRequest:{
    //     type: String,  //requesting a course that I don't have access to 
    //     courseName: String,   //or ID 
    //     default: null
    // },

});

export function validate(corporateTrainee) {
    const schema = Joi.object({
      firstName: Joi.string().min(3),
      lastName: Joi.string().min(3),
      email: Joi.string().email().required(),
      phoneNumber: Joi.number().min(10),
      dateOfBirth: Joi.date(),
      password: Joi.string().required(),
      address: Joi.object(),
      country: Joi.string(),
      userName: Joi.string().required(),
      //problems: Joi.array().required(),
      //certificate: Joi.array().required(),

    });
    return schema.validate(corporateTrainee);
  }

  const CorporateTrainee = mongoose.model("CorporateTrainee", corporateTraineeSchema);
  export default CorporateTrainee;