const router = require('express').Router()
const todo = require('./todoRoutes')
const user = require('./userRoutes')
const thirdPartyApiRoutes = require('./thirdPartyApiRoutes')

router.use('/', user)
router.use('/todos', todo)
router.use('/third-apis', thirdPartyApiRoutes)

module.exports = router