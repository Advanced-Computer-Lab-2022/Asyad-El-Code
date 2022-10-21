import mongoose from "mongoose";

import Joi from "joi";


const individualTraineeSchema = mongoose.Schema ({
    firstName:{
        type: String,
        required: true,
        minLength: 3
    },

    lastName:{
        type: String,
        required: true,
        minLength: 3
    },

    password:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true,
        unique: true,
    },

    country:{
        type: String,
        required: true
    },

    billingDetails:{
        masterCardNumber:String,
        expiryDate: Date,
        cvv: String,
        cardOwner: String,
       
    },

    // certificate:{
    //     type: [String]
    // },

    
    // problems:{
    //     type:[String]  //problem related to specific course 
    // },

    // grades:[{
    //     grade:Number  //excercises:
    // }],

    // percentageCompleted:{
    //     type: Number,
    //     default:0
    // },

    dateOfBirth:{
        type:Date,
        required: true
    },

    phoneNumber:{
        type:String,
        required:true
    },

    university:{
        type:String,
        required: true
        
    },

    address:{
        city: String,
        streetName: String,
        streetNumber: String
    },
    

    // COURSES
});


export function validate(individualTrainee) {
    const schema = Joi.object({
      firstName: Joi.string().min(3).required(),
      lastName: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      phoneNumber: Joi.number().required().min(10),
      dateOfBirth: Joi.date().required(),
      password: Joi.string().required(),
      address: Joi.object().required(),
      country: Joi.string().required(),
      university: Joi.string().required(),
      //problems: Joi.array().required(),
      //certificate: Joi.array().required(),
      billingDetails: Joi.object({
        masterCardNumber: Joi.string().required(),
        expiryDate: Joi.date().required(),
        cvv: Joi.string().required(),
        cardOwner: Joi.string().required(),
      })
    });
    return schema.validate(individualTrainee);
  }
  
  const IndividualTrainee = mongoose.model("IndividualTrainee", individualTraineeSchema);
  export default IndividualTrainee;