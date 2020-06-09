const router = require ('express').Router()
const todoController = require('../controllers/TodoController')
const jwt = require('jsonwebtoken')
const {User, Todo} = require('../models')

//http methods di rest api POST, PUT/PATCH, GET, DELETE
//middleware function
//access_token berisi data user
const authentication = (req, res, next) => {
    const {access_token} = req.headers
    //console.log(access_token)
    if(!access_token){
        res.status(404).json({message: 'Token not found'})
    }
    else {
        
        var decode = jwt.verify(access_token, process.env.SECRET)
        //assign lagi ke req supaya authorization bisa menerima data user nya
        //req adalah object req = {userData: 'lalalla', body:'ini biasa dari client', headers: 'client'}
        req.userData = decode
        //verifikasi user tersebut adalah benar
        User.findByPk(req.userData.id)
        .then(data => {
            if(data)
            {
                next()
            }
            else {
                res.status(404).json({message: 'Invalid user'})
            }
        })
        .catch(err => {
            res.status(401).json({message: err.message})
        })
    }
}

const authorization = (req, res, next) =>{
    const {id} = req.params
    console.log(id, '>>>>')
    Todo.findByPk(id)
    .then(data => {
        if(!data){
            res.status(404).json({message: 'Todo not found'})
        } else if(data.userId !== req.userData.id){
            res.status(403).json({message : 'You are not authorized to do this'})
        } else {
            next() //continue
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Internal server error'})
    })
}

//proses start dari sini
router.use(authentication) // semua endpoint selalu melewati line ini dulu
router.post('/', todoController.addTodo)
router.get('/', todoController.getTodo)
router.delete('/:id',authorization, todoController.deleteTodo)

module.exports = router