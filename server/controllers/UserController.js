const {User} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController{
    static register(req, res){
        var userobj = {
            email: req.body.email,
            password : req.body.password
        }

        User.create(userobj)
        .then(data => {
            res.status(201).json({id:data.id, email: data.email})
        })
        .catch(err => {
            res.status(500).json({message : err.message})
        })
    }

    static login(req, res){
        var user = {
            email: req.body.email,
            password : req.body.password
        }
        User.findOne({where : {email: user.email}})
        .then(data => {
            if(data && bcrypt.compareSync(user.password, data.password)){
                var access_token = jwt.sign({id : data.id, email:data.email}, process.env.SECRET)
                res.status(200).json({access_token})
            } else {
                res.status(400).json({message : 'Invalid email or password'})
            }
        })
        .catch(err => {
            res.status(500).json({message : err.message})
        })
    }
}
module.exports = UserController