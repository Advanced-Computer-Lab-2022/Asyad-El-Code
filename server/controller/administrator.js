import Administrator from "../models/administrator.js";
import { validate } from "../models/administrator.js"
import CorporateTrainee from "../models/corporateTrainee.js";
import Instructor from "../models/instructor.js";

// export const createAdministrator = async (req, res) => {
//     const { error } = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const {
//         firstName,
//         lastName,
//         email,
//         password,
//         userName,
//     } = req.body;

//     try {
//         const administrator = new Administrator({
//             firstName: firstName,
//             lastName: lastName,
//             email: email,
//             password: password,
//             userName: userName
//         });

//         await administrator.save();
//         res.status(200).json(administrator)
//     } catch (err) {
//         res.send(err.message)
//     }

// }

export const createAdministrator = async (req,res)=>{
    const {
        userName,
        password,
        email
      } = req.body;
    
      try {
        const administrator = await new Administrator({
          userName,
          password,
          email
        });
        await administrator.save();
        console.log(administrator)
        res.status(200).send(administrator);
      } catch (error) {
        res.status(401).send(error.message); 
      }
}

export const getAdministrators = async (_req, res) => {
    console.log("I am in the admin controller")
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

// Admin create instructors with username and password
export const createInstructor = async (req, res) => {
    const {
      userName,
      password,
    } = req.body;
  
    try {
      const instructor = await new Instructor({
        userName: userName,
        password: password
      });
      await instructor.save();
      res.status(200).json(instructor);
    } catch (error) {
      res.send(error.message); 
    }
  };

//Admin create corperateTrainee with userName and passsword
// export const createCorporateTrainee = async (req, res) => {
//     const {
//       userName,
//       password,
//     } = req.body;
  
//     try {
//       const corporateTrainee = await new CorporateTrainee({
//         userName: userName,
//         password: password
//       });
//       await corporateTrainee.save();
//       res.status(200).json(corporateTrainee);
//     } catch (error) {
//       res.send(error.message); 
//     }
//   };