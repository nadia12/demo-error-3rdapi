const {Todo} = require('../models')

class TodoController{
    //method add
    static addTodo(req, res){
        console.log(req, 'request >>>')
        // req => request (body, params)
        //res => response (kembalian dari server ke client)
        var obj = {
            title : req.body.title,
            description : req.body.description,
            userId : req.userData.id
        }
        Todo.create(obj)
        .then(data => {
            //mengirimkan response ke client
            //Http status 201 jika berhasil
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
    }
   // method get 
    static getTodo(req, res){
        Todo.findAll({where : {userId : req.userData.id}}) // get todo current user
        //Todo.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
    }

    // method delete 
    static deleteTodo(req, res){
        const {id} = req.params
        Todo.destroy({where : {id : id}})
        .then(data => {
            res.status(200).json({message : "Todo has been deleted"})
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
    }
}
module.exports = TodoController