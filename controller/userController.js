const userModel = require("../models/userModel")


class UserController{

    signUp = async (req, res)=>{
        const user = await userModel.findOne({email: req.body.email})
        if(user){
            res.send("User already existed!")
        }else{
        const newUser =  await userModel.create(req.body)
        res.send(newUser)
    }
}

    signIn = async (req, res) => {
        console.log(req.body)
    }

    signOut = async () => {

    }

}

module.exports = new UserController()