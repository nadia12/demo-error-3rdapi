const router = require ('express').Router()
const todoController = require('../controllers/TodoController')
const { authentication, authorization } = require('../middlewares/auth')

//proses start dari sini
router.use(authentication) // semua endpoint selalu melewati line ini dulu
router.post('/', todoController.addTodo)
router.get('/', todoController.getTodo)

// next({name: 'err'}) => ke errorHandler
router.delete('/:id', authorization, todoController.deleteTodo)

module.exports = router