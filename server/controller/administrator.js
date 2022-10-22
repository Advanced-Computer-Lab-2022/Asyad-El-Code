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

export const getAdministrators = async (_req, res) => {
    try {
        const administrators = await Administrator.find()
        res.status(200).send(administrators);
    } catch (err) {
        res.send(err.message)
    }
}

export const getAdministratorById = async (req, res) => {
    try {
        const id = req.params.id;
        const administrator = await Administrator.findById(id);
        if(!administrator)
            res.status(200).send(administrator);
        else
            res.status(400).send(`Could not find Administrator with id: ${id}`)
    } catch (err) {
        res.send(err.message)
    }
}

export const getAdministratorByUserName = async (req, res) => {
    try {
        const userName = req.params.userName;
        const administrator = await Administrator.find({ userName: userName })
        res.status(200).send(administrator);
    } catch (err) {
        res.send(err.message)
    }
}

export const deleteAdministrator = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedAdministrator = await Administrator.findByIdAndDelete(id);
        if (!deletedAdministrator) {
            res.status(400).send("Couldn't delete administrator")
        } else {
            res.status(200).send(deletedAdministrator)

        }
    } catch (err) {
        console.log(err)
        res.send(err.message)
    }
}

export const updateAdministrator = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedAdministrator = await Administrator.findByIdAndUpdate(
            id,
            req.body,
            {new:true}
            )
        if (!updateAdministrator) {
            res.status(400).send("Couldn't update administrator")
        } else {
            res.status(200).send(updatedAdministrator)
        }
    } catch (err) {
        console.log(err)
        res.send(err.message)
    }
}