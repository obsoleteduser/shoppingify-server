const userModel = require("../models/userModel")
const { hashSync, compareSync } = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require("../config/env")
const genCode = require("../helpers/codeGenerator")
const { sendMail } = require("../services")


class UserController{

    signUp = async (req, res)=>{
        const {email, password} = req.body
        const user = await userModel.findOne({email})
        const code = genCode(6)
        if(user){
            res.status(409).json({message: "User already existed"})
        }else{
        const hashedPassword = hashSync(password, 4)
        await sendMail(email, 'Activation code', code)
        const newUser =  await userModel.create({email, password: hashedPassword, status: 'passive', code})
        res.status(200).json(newUser)
    }
}

    signIn = async (req, res) => {
        const user = await userModel.findOne({email: req.body.email})
        if(!user){
            res.status(404).json({message: "User doesn't exist"})
        }
        else{
            const hashedPassword = user.password
            console.log(hashedPassword)
            const isValid = compareSync(req.body.password, hashedPassword)
            if(!isValid){
                res.status(401).json({message: "Incorrect password"})
            }
            else{
                const token = jwt.sign({id: user._id}, SECRET_KEY)
                res.status(200).json({token})
            }
        }
    }

    deleteUser = async (req, res)=>{
       const deletedOne = await userModel.deleteOne({email: req.body.email})
        res.status(200).send("User has been removed")
    }

}

module.exports = new UserController()