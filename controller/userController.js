const userModel = require("../models/userModel")
const { hashSync, compareSync } = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require("../config/env")


class UserController{

    signUp = async (req, res)=>{
        const user = await userModel.findOne({email: req.body.email})
        if(user){
            res.send("User already existed!")
        }else{
        const hashedPassword = hashSync(req.body.password, 4)
        const newUser =  await userModel.create({email:req.body.email, password: hashedPassword})
        res.send(newUser)
    }
}

    signIn = async (req, res) => {
        const user = await userModel.findOne({email: req.body.email})
        if(!user){
            res.status(404).json("User doesn't exist")
        }
        else{
            const hashedPassword = user.password
            console.log(hashedPassword)
            const isValid = compareSync(req.body.password, hashedPassword)
            if(!isValid){
                res.status(401).json({message: "incorrect password"})
            }
            else{
                const token = jwt.sign({id: user._id}, SECRET_KEY)
                res.status(200).json({token})
            }
        }
    }

    signOut = async () => {

    }

}

module.exports = new UserController()