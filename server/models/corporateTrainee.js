import mongoose from "mongoose";

import Joi from "joi";


const corporateTraineeSchema = mongoose.Schema({
    userName:{
        type: String,
        required: true
    },

    

});