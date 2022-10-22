import Administrator from "../models/administrator.js";
import { validate } from "../models/administrator.js"

export const createAdministrator = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const {
        firstName,
        lastName,
        email,
        password,
        userName,
    } = req.body;

    try {
        const administrator = new Administrator({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            userName: userName
        });

        await administrator.save();
        res.status(200).json(administrator)
    } catch (err) {
        res.send(err.message)
    }

}

export const getAdministrators = async (_req,res)=>{
    try{
        const administrators = await Administrator.find()
        res.status(200).send(administrators);
    }catch(err){
        res.send(err.message)
    }
}

export const getAdministrator = async (req,res)=>{
    try{
        const userName = req.params.userName;
        const administrator = await Administrator.find({userName:userName})
        res.status(200).send(administrator);
    }catch(err){
        res.send(err.message)
    }
}

export const deleteAdministrator = async (req,res)=>{
    try{
        const userName = req.body.userName;
        const response = await Administrator.deleteOne({userName:userName}) 
        const isDeleted = response.deletedCount===1?`User ${userName} was deleted successfully`:`Couldn't delete user: ${userName}`;
        res.status(200).send(isDeleted)
    }catch(err){
        console.log(err)
        res.send(err.message)
    }
}