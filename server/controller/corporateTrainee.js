import mongoose from "mongoose";
import CorporateTrainee from "../models/corporateTrainee.js";
import Course from "../models/course.js";
import { validate } from "../models/corporateTrainee.js";

export const createCorporateTrainee = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const {
    firstName,
    lastName,
    email,
    password,
    country,
    dateOfBirth,
    //certificate,
    phoneNumber,
    //courses,
    //problem,
    //grade,
    //percentageCompleted,
    address,
    //accessRequest
  } = req.body;

  try {
    const corporatetrainee = await new CorporateTrainee({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      country: country,
      dateOfBirth: dateOfBirth,
      //certificate: certificate,
      phoneNumber: phoneNumber,
      //grade:grade,
      //problem:problem,
      //percentageCompleted:percentageCompleted,
      address:address,
      //acessRequest: acessRequest,

    });
    await corporatetrainee.save();
    res.status(200).json(corporatetrainee);
  } catch (error) {
    res.send(error.message);
  }
};


export const getAllCorporateTrainees = async (req, res) => {
    const corpTrainees = await CorporateTrainee.find();
    res.send(corpTrainees);
}

export const getCorporateTrainee = async (req, res) => {
    
    try {
        const corpTrainee = await CorporateTrainee.findById(req.params.id);
        if(!corpTrainee) return res.status(404).send('This ID doesnt exist');
        res.send(corpTrainee);
    } catch (error) {
        res.send(error.message + " This ID doesnt exist");
    }
    
}

export const deleteCorporateTrainee = async (req, res) => {

    try {
        const corpTrainee = await CorporateTrainee.findById(req.params.id);
        if(!corpTrainee) return res.status(404).send('This ID doesnt exist');
        await CorporateTrainee.deleteOne({_id:req.params.id})
            res.status(200).send(corpTrainee);
    } catch (error) {
        res.send(error.message + " This ID doesnt exist");
    }

}

export const updateCorporateTrainee = async (req, res) => {

    try {
        const corpTrainee = await CorporateTrainee.findById(req.params.id);
        if(!corpTrainee) return res.status(404).send('This ID doesnt exist');
    
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        
        const newCorpTrainee = await CorporateTrainee.findByIdAndUpdate(req.params.id, {
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            country: req.body.country,
            address: req.body.address,

        }, {new: true});

        res.send(newCorpTrainee);

    } catch (error) {
        res.send("This ID doesnt exist");
    }
}

export const selectCountry = async (req, res) => {
    try {
      const id = req.params.id;
      const country = req.body.country;
      const updated = await CorporateTrainee.findByIdAndUpdate(id, { country: country }, { new: true })
      if (!updated) {
        res.status(401).send("Couldn't select country")
      } else
        res.status(200).send(updated);
  
    } catch (err) {
      res.status(401).send(err)
    }
  };
