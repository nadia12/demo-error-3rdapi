const {Todo} = require('../models')

class TodoController{
    //method add
    static addTodo(req, res, next){
        var obj = {
            title : req.body.title,
            description : req.body.description,
            userId : req.userData.id
        }
        Todo.create(obj)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            console.log(err, "<<< error di ADD TODO")
            // res.status(500).json({message: err.message})
            next(err)
        })
    }
   // method get 
    static getTodo(req, res, next){
        Todo.findAll({where : {userId : req.userData.id}}) 
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
            // res.status(500).json({message: err.message})
        })
    }

    // method delete 
    static deleteTodo(req, res, next){
        const {id} = req.params
        Todo.destroy({where : {id : id}})
        .then(data => {
            res.status(200).json({message : "Todo has been deleted"})
        })
        .catch(err => {
            next(err)
            // res.status(500).json({message: err.message})
        })
    }
}
module.exports = TodoController